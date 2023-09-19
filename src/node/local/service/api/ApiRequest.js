
const ProtocolURL = require('../../../ProtocolURL')

class ApiRequest {
    /**
     * @type {ProtocolURL} 请求地址
     */
    url;
    /**
     * @type {*} 请求头
     */
    headers;
    /**
     * @type {*} 请求数据
     */
    data;
}

module.exports = ApiRequest;
