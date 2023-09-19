
require('url-search-params-polyfill');

const protocol_regex = /^([^:]+):\/\/([^\/]+)(\/[^?#]*)?(\?[^#]*)?(#.*)?$/;

/**
 * 协议URL
 */
class ProtocolURL {
    /**
     * @type {string} 协议，例如：http, https, ws, webptp
     */
    protocol;
    /**
     * @type {string} 主机名，例如：example.com
     */
    hostname;
    /**
     * @type {string} 路径，例如：/path，若不存在则为空字符串
     */
    pathname;
    /**
     * @type {string} 查询参数，例如：?query=value，若不存在则为空字符串
     */
    search;
    /**
     * @type {URLSearchParams} 查询参数格式化后的对象
     */
    searchParams;
    /**
     * @type {string} 哈希值，例如：#fragment，若不存在则为空字符串
     */
    hash;
    constructor(url) {
        const matches = url.match(protocol_regex);
        if (!matches) {
            return null;
        }
        this.protocol = matches[1];
        this.hostname = matches[2];
        this.pathname = matches[3] || ""
        this.search = matches[4] || ""
        this.searchParams = new URLSearchParams(matches[4] || "")
        this.hash = matches[5] || ""
    }
}

module.exports = ProtocolURL;
