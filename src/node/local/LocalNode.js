
const LocalNodeHandlerManager = require('./LocalNodeHandlerManager');
const LocalNodeServicesRegister = require('./LocalNodeServicesRegister');
const {SecretKey} = require('../cert_format');

/**
 * @typedef {Object} LocalNodeOptions 选项
 * @property {string} localNodeProtocol 本地节点协议
 * @property {string} issuer 节点发行商
 * @property {string} purpose 节点用途
 */

/**
 * 本地节点
 */
class LocalNode {
    /**
     * 本地节点处理器，用于处理不同的本地节点协议。
     */
    static manager = new LocalNodeHandlerManager();
    /**
     * 本地节点服务注册器
     */
    services;
    _options;
    _handler;
    /**
     * @param {LocalNodeOptions} options 构造选项
     */
    constructor(options) {
        this._options = options;
        const handler = LocalNode.manager.match(options.localNodeProtocol);
        if (!handler) {
            throw new Error("不支持的本地节点协议: [" + options.localNodeProtocol + "]");
        }
        this.services = new LocalNodeServicesRegister(handler);
        this._handler = handler;
    }
    /**
     * 添加本地节点证书
     * @param {SecretKey} certSecretKey 证书秘钥对象
     */
    addCert(certSecretKey) {
        this._handler.addCert(certSecretKey);
    }
    /**
     * 启动节点
     */
    start() {
        this._handler.start();
    }
    /**
     * 关闭节点
     */
    stop() {
        this._handler.stop();
    }
}

module.exports = LocalNode;
