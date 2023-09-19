
const LocalNode = require('./local/LocalNode');
const RemoteNode = require('./remote/RemoteNode');

/**
 * 节点驱动
 * 
 * 将多个节点添加到驱动，形成一个节点网络。
 */
class NodeDrive {
    /**
     * 添加并激活本地节点
     * @param {LocalNode} localNode 本地节点
     */
    addLocalNode(localNode) {
    }
    /**
     * 添加并激活远程节点
     * @param {RemoteNode} remoteNode 远程节点
     * @param {string[]} permissionList 授权给远程节点的权限列表
     */
    addRemoteNode(remoteNode, permissionList) {
    }
}
