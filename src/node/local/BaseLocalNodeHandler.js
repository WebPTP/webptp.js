
const {SecretKey} = require('../cert_format');

/**
 * @typedef {Object} BaseLocalNodeHandlerOptions 
 * @property {string} nodeProtocol 节点协议
 * @property {string} connectionURL 连接地址
 * @property {string} nodeIssuer 节点发行商
 * @property {string} nodePurpose 节点用途
 */

/**
 * 本地节点处理器
 */
class BaseLocalNodeHandler {
    _options;
    /**
     * @type {SecretKey[]} 本地节点证书列表
     */
    _certs = [];
    /**
     * @param {BaseLocalNodeHandlerOptions} _options 
     */
    constructor(_options) {
        this._options = _options;
    }
    /**
     * 获取节点对外的信息
     */
    getNodeHeaders() {
        let certs = [];
        this._certs.forEach(cert => {
            certs.push(cert.getCertFlag());
        });
        return {
            "Protocol": this._options.nodeProtocol,
            "ConnectionURL": this._options.connectionURL,
            "Issuer": this._options.nodeIssuer,
            "Purpose": this._options.nodePurpose,
            "Certs": certs,
        }
    }
    /**
     * 添加本地节点证书
     * @param {SecretKey} certSecretKey 证书秘钥对象
     */
    addCert(certSecretKey) {
        this._certs.push(certSecretKey);
    }
    /**
     * 添加服务
     * @param {*} serviceOptions 
     */
    addService(serviceOptions) {
    }
    /**
     * 启动
     */
    start() {
    }
    /**
     * 关闭
     */
    stop() {
    }
}

module.exports = BaseLocalNodeHandler;