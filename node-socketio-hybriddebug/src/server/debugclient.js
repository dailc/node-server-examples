/**
 * 客户端对象类
 */
class DebugClient {
    constructor(_roomId, _clientId, _socket) {
        // 所属的房间号
        this._roomId = _roomId;
        // 客户端id
        this._clientId = _clientId;
        // 所持有的socket对象
        this._socket = _socket;
    }
    
    get roomId() {
        return this._roomId;
    }
    
    // 对外叫id
    get id() {
        return this._clientId;
    }
    
    get socket() {
        return this._socket;
    }
    
    destroy() {
        this._socket && this._socket.disconnect(true);
        this._clientId = undefined;
        this._roomId = undefined;
    }
    
    
    toString() {
        return `${this._roomId}:${this._clientId}`;
    }
}

export default DebugClient;