module.exports.warn = function warn(msg) {
    // 模板字符串
    console.error(`[error]: ${JSON.stringify(msg)}`);
};

module.exports.log = function log(msg) {
    console.log(`[log]: ${JSON.stringify(msg)}`);
};