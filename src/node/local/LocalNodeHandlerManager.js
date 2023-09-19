const BaseLocalNodeHandler = require('./BaseLocalNodeHandler');

/**
 * 本地节点处理器管理器
 */
class LocalNodeHandlerManager {
    _handlers = {};
    constructor() {
    }
    /**
     * 注册新的LocalNodeHandler
     * @param {BaseLocalNodeHandler} localNodeHandler 
     */
    register(localNodeHandler) {
        const protocol = localNodeHandler.getLocalNodeProtocol();
        if (this._handlers[protocol]) {
            throw new Error("协议被重复注册: " + protocol)
        }
        this._handlers[protocol] = localNodeHandler;
    }
    match(localNodeProtocol) {
        return this._handlers[localNodeProtocol];
    }
}

module.exports = LocalNodeHandlerManager;
