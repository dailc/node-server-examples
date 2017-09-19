/**
 * 开启服务
 */
const SERVER_PORT = 86;

module.exports.serverMixmin = function serverMixmin(app) {
    const server = app.listen(SERVER_PORT, () => {
        const host = server.address().address;
        const port = server.address().port;

        console.log(`应用实例，访问地址为 http://${host}:${port}`);
    });
};