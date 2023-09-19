
const SessionRequest = require('./SessionRequest');
const SessionResponse = require('./SessionResponse');

class Session {
    /**
     * 监听来自会话的收到请求
     * @param {function(SessionRequest, SessionResponse):void} requestCallback 请求回调
     */
    onRequest(requestCallback) {
    }
    /**
     * 向会话发送新请求
     * @param {string} path 会话请求路径
     * @param {*} data 会话请求数据
     */
    sendRequest(path, data) {
    }
}

module.exports = Session;
