export function warn(msg) {
    // 模板字符串
    console.error(`[error]: ${JSON.stringify(msg)}`);
}

export function log(msg) {
    console.log(`[log]: ${JSON.stringify(msg)}`);
}