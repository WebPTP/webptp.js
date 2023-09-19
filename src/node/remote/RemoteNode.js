
class RemoteNode {
    /**
     * 单向发送请求并等待远程节点响应数据。
     * @param {string} path 请求地址
     * @param {*} data 发送的请求数据
     * @returns 远程节点的响应
     */
    request(path, data) {
    }
    /**
     * 连接到远程节点，保持与远程节点连接，期间双方随时可以互发请求和响应。
     * @param {string} path 请求地址
     * @returns 远程节点的会话
     */
    connect(path) {
    }
}

module.exports = RemoteNode;

