/**
 * 开启公告资源访问
 */
module.exports.publicMixmin = function publicMixmin(app, express) {
    app.use(express.static('public'));
};