/**
 * socketio的hybrid调试后台
 */
import DebugRoom from './debugroom';
import DebugClient from './debugclient';
import {
    log,
} from '../util/debug';

export default function ioserverMixmin(io) {
    // 在线的房间，key值为roomid，value为Room对象
    const debugRoomsOnline = {};
    // 所有的客户端，方便检索
    const debugClientsOnline = {};

    function encodeId(id) {
        return encodeURIComponent(id);
    }

    function decodeId(id) {
        return decodeURIComponent(id);
    }

    function broadcastInRoom(roomId, event, data) {
        if (!debugRoomsOnline[roomId]) {
            return;
        }
        const room = debugRoomsOnline[roomId];
        const clients = room.clients;

        Object.keys(clients).forEach((clientId) => {
            clients[clientId].socket.emit(event, data);
        });
    }

    io.on('connection', (socket) => {
        log('一个客户端或房间连接');

        // 通知客户端已经连接
        socket.emit('open', {
            time: (new Date()).toLocaleString(),
        });

        // 创建房间号
        socket.on('create room', (roomId, fn) => {
            const encodeRoomId = encodeId(roomId);
            let res;

            if (debugRoomsOnline[encodeRoomId]) {
                res = {
                    code: 0,
                    message: 'roomId重复',
                };

                fn(res);

                return;
            }

            const room = new DebugRoom(encodeRoomId, socket);
            const assignSocket = socket;

            assignSocket.connectId = encodeRoomId;
            debugRoomsOnline[encodeRoomId] = room;

            res = {
                code: 1,
                message: `${roomId}创建成功`,
            };

            fn(res);

            log(`房间${roomId}创建成功`);
        });

        // 创建客户端
        socket.on('create client', (data, fn) => {
            const clientId = data.clientId;
            const roomId = data.roomId;
            const encodeClientId = encodeId(clientId);
            const encodeRoomId = encodeId(roomId);
            const room = debugRoomsOnline[encodeRoomId];

            let res;

            if (debugClientsOnline[encodeClientId]) {
                res = {
                    code: 0,
                    message: 'clientId重复',
                };

                fn(res);

                return;
            } else if (!room) {
                res = {
                    code: 0,
                    message: 'client对应的room不存在',
                };

                fn(res);

                return;
            }

            const client = new DebugClient(encodeRoomId, encodeClientId, socket);
            const assignSocket = socket;

            assignSocket.connectId = encodeClientId;
            // 添加房间
            room.addClient(client);
            debugClientsOnline[encodeClientId] = client;

            res = {
                code: 1,
                message: `${roomId}:${clientId}创建成功`,
            };

            fn(res);

            // 通知房间
            room.socket.emit('client created', {
                time: (new Date()).toLocaleString(),
                clientId,
                roomId,
                clientCount: room.getClientsCount(),
            });

            log(`客户端${clientId}加入房间${roomId}成功`);
        });

        // 房间分发数据
        socket.on('dispatch data', (data, fn) => {
            const encodeRoomId = socket.connectId;
            const roomId = decodeId(encodeRoomId);

            log(`房间${roomId}分发一条数据:${JSON.stringify(data)}`);

            // 房间内部广播
            broadcastInRoom(encodeRoomId, 'receive dispatch data', data);

            fn({
                code: 1,
                message: `房间${roomId}分发数据成功`,
            });
        });

        socket.on('client excute notify', (data) => {
            const encodeClientId = socket.connectId;
            const client = debugClientsOnline[encodeClientId];
            const encodeRoomId = client.roomId;
            const room = debugRoomsOnline[encodeRoomId];

            if (room) {
                // 通知房间
                room.socket.emit('client excuted', data);
            }
        });

        socket.on('disconnect', () => {
            // connectId此时已经编码
            const connectId = socket.connectId;

            if (debugRoomsOnline[connectId]) {
                // 如果是房间失联-释放所有的客户端
                debugRoomsOnline[connectId].destroy();
                delete debugRoomsOnline[connectId];

                log(`${decodeId(connectId)}房间销毁`);
            } else if (debugClientsOnline[connectId]) {
                // 房间销毁后，里面的各个客户端接下来都会逐渐失联
                // 否则如果是某一个客户端失联
                // 首先检查对应的房间是否存在，如果房间已经不存在了代表已经被销毁了
                const client = debugClientsOnline[connectId];

                // 先检查客户端是否已经销毁，已经销毁了不会有id
                if (client.id) {
                    // 如果还没有销毁，代表可能只是客户端主动失联
                    const room = debugRoomsOnline[client.roomId];

                    if (room) {
                        // 如果对应的房间还存在，先从房间中移除客户端
                        // 当然，理论上来说这时候是肯定有房间的
                        room.removeClient(client);

                        // 通知房间
                        room.socket.emit('client destroy', {
                            time: (new Date()).toLocaleString(),
                            clientId: decodeId(connectId),
                            clientCount: room.getClientsCount(),
                        });
                    } else {
                        // 仅仅是防止没有房间的客户端存在
                        client.destroy();
                    }
                }
                // 否则可以肯定客户端已经被销毁了的，直接删除引用
                delete debugClientsOnline[connectId];

                log(`${decodeId(connectId)}客户端销毁`);
            }

            log('一个客户端或房间失联');
        });
    });
}