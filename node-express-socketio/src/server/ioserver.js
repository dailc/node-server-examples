/**
 * socketio的一套测试程序
 */
import {
    log,
} from '../util/debug';

export default function ioserverMixmin(io) {
    // 连接的客户端数
    let userCountOnline = 0;
    // 连接的用户
    const usersOnline = {};
    
    function broadcast(socket, message) {
        // 向其他用户发送消息
        socket.broadcast.emit('broadcast', message);
    }

    function getHashByNickName(nickName) {
        return encodeURIComponent(nickName);
    }
    
    function decodeNickName(nickName) {
        return decodeURIComponent(nickName);
    }

    io.on('connection', (socket) => {
        log('一个客户端连接');

        // 通知客户端已经连接
        socket.emit('open', {
            time: (new Date()).toLocaleString(),
        });

        socket.on('login', (nickName, fn) => {
            const res = {};

            if (usersOnline[getHashByNickName(nickName)]) {
                res.code = 0;
                res.message = '昵称重复';

                fn(res);

                return;
            }
            const name = getHashByNickName(nickName);
            const client = {
                name,
                socket,
            };

            socket.name = name;
            usersOnline[name] = client;
            userCountOnline++;
            log(`${nickName}登陆`);

            res.code = 1;
            res.message = `当前用户数:${userCountOnline}`;

            fn(res);
            
            broadcast(socket, `欢迎${nickName}登陆成功,当前用户数:${userCountOnline}`);
        });

        socket.on('group chat message server', (message) => {
            log(`一个群聊信息:${message}`);
            
            socket.broadcast.emit('group chat message client', message);
        });

        socket.on('disconnect', () => {
            // 失联
            const name = socket.name;

            if (usersOnline[name]) {
                delete usersOnline[name];
                userCountOnline--;
                log(`${decodeNickName(name)}退出登陆`);
                
                broadcast(socket, `${decodeNickName(name)}退出登陆,当前用户数:${userCountOnline}`);
            }

            log('一个客户端失联');
        });
    });
}