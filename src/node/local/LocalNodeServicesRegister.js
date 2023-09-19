
const BaseLocalNodeHandler = require('./BaseLocalNodeHandler');

const ApiRequest = require('./service/api/ApiRequest');
const ApiResponse = require('./service/api/ApiResponse');

const SessionHandshake = require('./service/session/SessionHandshake')
const Session = require('./service/session/Session');

/**
 * @typedef {function(ApiRequest, ApiResponse):void} ApiRequestCallbackFunction API请求回调函数
 */

/**
 * @typedef {function(SessionHandshake, Session):void} SessionCallbackFunction Session回调函数
 */

/**
 * 节点服务注册器
 */
class LocalNodeServicesRegister {
    _handler;
    /**
     * @param {BaseLocalNodeHandler} localNodeHandler 
     */
    constructor(localNodeHandler) {
        this._handler = localNodeHandler;
    }
    /**
     * 注册接口服务
     * @param {string} apiPath 
     * @param {ApiRequestCallbackFunction} apiCallback
     * @returns {LocalNodeServicesRegister} this
     */
    api(apiPath, apiCallback) {
        this._handler.addService({
            type: "api",
            path: apiPath,
            apiCallback: apiCallback,
        })
        return this;
    }
    /**
     * 注册会话服务
     * @param {string} sessionPath 
     * @param {SessionCallbackFunction} sessionCallback
     * @returns {LocalNodeServicesRegister} this
     */
    session(sessionPath, sessionCallback) {
        this._handler.addService({
            type: "session",
            path: sessionPath,
            sessionCallback: sessionCallback,
        })
        return this;
    }
}

module.exports = LocalNodeServicesRegister;
