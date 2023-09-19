
class ApiResponse {
    /**
     * 添加响应头
     * @param {string} name 
     * @param {string} value 
     */
    addHeader(name, value) {
    }
    /**
     * 写出响应数据
     * @param {*} data 
     */
    write(data) {
    }
    /**
     * 完成响应
     */
    close() {
    }
}

module.exports = ApiResponse;
