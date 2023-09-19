
const asn1 = require('asn1.js');
const Buffer = require('safer-buffer').Buffer;

/**
 * 根证书秘钥信息
 * 
 * 由服务节点秘密生成，并安全保存。
 * 通过根证书秘钥信息，可生成根证书信息，根证书信息发放给客户端使用。
 */
const SecretKeyFormat = asn1.define('SecretKey', function () {
    this.seq().obj(
        /**
         * 证书版本号：证书的版本编号，用于区别过期的证书。过期证书版本号会直接拒绝访问，不会进行证书验证。
         */
        this.key('version').int(),
        /**
         * 证书用途：明确声明证书的生效范围，防止用户安装错误的证书。
         */
        this.key('purpose').charstr(),
        /**
         * 颁发者：证书颁发机构（CA）的名称，用来区别相同用途的证书。
         */
        this.key('issuer').charstr(),
        /**
         * 有效期：证书的生效时间和过期时间。
         */
        this.key('validity').seq().obj(
            /**
             * 证书的生效时间
             */
            this.key('effectiveTime').gentime(),
            /**
             * 证书的过期时间
             */
            this.key('expirationTime').gentime(),
        ),
        /**
         * 公钥：证书所包含实体的公钥。
         */
        this.key('publicKey').octstr(),
        /**
         * 私钥
         */
        this.key('privateKey').octstr(),
    );
});

/**
 * 证书的秘钥
 */
class SecretKey extends Format {
    /**
     * @type {number} 证书版本号
     */
    version;
    /**
     * @type {string} 证书用途
     */
    purpose;
    /**
     * @type {string} 颁发者
     */
    issuer;
    /**
     * @type {Date} 证书的生效时间
     */
    effectiveTime;
    /**
     * @type {Date} 证书的过期时间
     */
    expirationTime;
    /**
     * @type {Buffer} 公钥
     */
    publicKey;
    /**
     * @type {Buffer} 私钥
     */
    privateKey;

    constructor(data) {
        super(SecretKeyFormat, data);
    }
    _import(data) {
        this.version = data.version;
        this.purpose = data.purpose;
        this.issuer = data.issuer;
        this.effectiveTime = data.validity.effectiveTime;
        this.expirationTime = data.validity.expirationTime;
        this.publicKey = data.publicKey;
        this.privateKey = data.privateKey;
    }
    _export() {
        return {
            version: this.version,
            purpose: this.purpose,
            issuer: this.issuer,
            validity: {
                effectiveTime: this.effectiveTime,
                expirationTime: this.expirationTime,
            },
            publicKey: this.publicKey,
            privateKey: this.privateKey,
        };
    }
    getCertFlag() {
        return this.issuer + "." + this.purpose;
    }
    getCertId() {
        return this.issuer + "." + this.purpose + "." + this.version;
    }
}

/**
 * 证书信息
 * 
 * 通过证书中的公钥，将数据安全的发送的目标节点。
 * 1.本地随机生成对称加密秘钥。
 * 2.将随机生成的对称加密秘钥，通过证书发送到目标节点。
 * 3.目标节点再随机生成秘钥，以此反复，相互通讯。
 */
const CertificateFormat = asn1.define('Certificate', function () {
    this.seq().obj(
        /**
         * 版本号：证书的版本编号，用于区别过期的证书。过期证书版本号会直接拒绝访问，不会进行秘钥验证。
         */
        this.key('version').int(),
        /**
         * 证书用途：明确声明证书的生效范围，防止用户安装错误的证书。
         */
        this.key('purpose').charstr(),
        /**
         * 颁发者：证书颁发机构（CA）的名称，用来区别相同用途的证书。
         */
        this.key('issuer').charstr(),
        /**
         * 有效期：证书的生效时间和过期时间。
         */
        this.key('validity').seq().obj(
            /**
             * 证书的生效时间
             */
            this.key('effectiveTime').gentime(),
            /**
             * 证书的过期时间
             */
            this.key('expirationTime').gentime(),
        ),
        /**
         * 公钥：证书所包含实体的公钥。
         */
        this.key('publicKey').octstr(),
        /**
         * 携带密文：使用时需要原封不动发送的内容，是证书颁发者加密和解密的数据。
         */
        this.key('ciphertext').octstr(),
    );
});

/**
 * 证书信息
 */
class Certificate extends Format {
    /**
     * @type {number} 证书版本号
     */
    version;
    /**
     * @type {string} 证书用途
     */
    purpose;
    /**
     * @type {string} 颁发者
     */
    issuer;
    /**
     * @type {Date} 证书的生效时间
     */
    effectiveTime;
    /**
     * @type {Date} 证书的过期时间
     */
    expirationTime;
    /**
     * @type {Buffer} 公钥
     */
    publicKey;
    /**
     * @type {Buffer} 密文
     */
    ciphertext;

    constructor(data) {
        super(SecretKeyFormat, data);
    }
    _import(data) {
        this.version = data.version;
        this.purpose = data.purpose;
        this.issuer = data.issuer;
        this.effectiveTime = data.validity.effectiveTime;
        this.expirationTime = data.validity.expirationTime;
        this.publicKey = data.publicKey;
        this.ciphertext = data.ciphertext;
    }
    _export() {
        return {
            version: this.version,
            purpose: this.purpose,
            issuer: this.issuer,
            validity: {
                effectiveTime: this.effectiveTime,
                expirationTime: this.expirationTime,
            },
            publicKey: this.publicKey,
            ciphertext: this.ciphertext,
        };
    }
    getCertFlag() {
        return this.issuer + "." + this.purpose;
    }
    getCertId() {
        return this.issuer + "." + this.purpose + "." + this.version;
    }
}

/**
 * 格式化工具
 */
class Format {
    _entity;
    constructor(entity, data) {
        if (Buffer.isBuffer(data)) {
            data = entity.decode(data, 'der')
        }
        if (typeof data !== "object") {
            throw new Error("数据类型错误，无法格式化证书数据!");
        }
        this._entity = entity;
        this._import(data);
    }
    _import(data) {
    }
    _export() {
        return {};
    }
    /**
     * 编码数据
     * @returns {Buffer} 编码后的数据
     */
    encode() {
        return this._entity.encode(this._export(), 'der');
    }
}

module.exports = {
    SecretKeyFormat,
    SecretKey,
    CertificateFormat,
    Certificate,
};
