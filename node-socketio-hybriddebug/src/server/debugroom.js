/**
 * 房间对象类
 */
class DebugRoom {
    constructor(_roomId, _socket) {
        // 所属的房间号
        this._roomId = _roomId;
        // 所持有的socket对象
        this._socket = _socket;
        // 客户端持有默认是一个空对象，key是clientid，value是client
        this._clients = {};
    }
    
    get id() {
        return this._roomId;
    }
    
    get clients() {
        return this._clients;
    }
    
    getClientsCount() {
        return Object.keys(this._clients).length;
    }
    
    get socket() {
        return this._socket;
    }
    
    removeClient(client) {
        if (!client) {
            return false;
        }
        const clientId = client.id;
        
        if (!this._clients[clientId]) {
            return false;
        }
        
        this._clients[clientId].destroy();
        delete this._clients[clientId];
        
        return true;
    }
    
    addClient(client) {
        if (!client) {
            return false;
        }
        const clientId = client.id;
        
        if (this._clients[clientId]) {
            return false;
        }
        
        this._clients[clientId] = client;
        
        return true;
    }
    
    clearClients() {
        if (!this._clients) {
            return;
        }
        const keys = Object.keys(this._clients);
        const len = keys.length;
        
        for (let i = 0; i < len; i++) {
            this._clients[keys[i]].destroy();
        }
        
        this._clients = {};
    }
    
    destroy() {
        // 销毁每一个client
        this.clearClients();
        this._clients = undefined;
        this._socket && this._socket.disconnect(true);
        this._roomId = undefined;
    }
    
    toString() {
        return `${this._roomId}`;
    }
}

export default DebugRoom;