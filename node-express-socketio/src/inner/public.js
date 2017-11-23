/**
 * 开启公告资源访问
 */
export default function publicMixmin(app, express) {
    app.use(express.static('public'));
}