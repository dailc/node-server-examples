const config = require('../../config/config');
const log = require('../../util/debug').log;
const warn = require('../../util/debug').warn;
const oauthUtil = require('./util/pageoauth');
const dbweichat = require('../../db/dbweichat');

const PUBLIC_ADDRESS = config.PUBLIC_ADDRESS;
const APPID = config.APPID;
const APPSECRET = config.APPSECRET;

/**
 * 微信授权程序
 */

module.exports.oauthMixmin = function oauthMixmin(app) {
    /**
     * 授权接口的入口
     * 在这个入口，接收到授权请求，以及最终需要跳转的页面
     * 然后内部拼装成合法的微信授权地址，在另一个接口接收
     * 逻辑：
     * 获取targetUrl
     * 然后组装成一个微信授权地址（回调地址是本后台的另一个recieve接口）
     * 然后在接收地址处理逻辑
     * 如果跳转失败：
     * 1. 检测appid是否正确
     * 2. 检查回调地址是否被公众号授权
     * 3. 检测是否回调地址有urlEncode
     * 4. 检测是否有多余的空格（检测很严）
     */
    app.get('/redirectToOauth', (req, res) => {
        const finalTargetUrl = req.query.targetUrl;
        const oauthCallbackUrl = `${PUBLIC_ADDRESS}/recieveWeichatOauth?targetUrl=${finalTargetUrl}`;
        const REDIRECT_URI = encodeURIComponent(oauthCallbackUrl);
        const SCOPE = 'snsapi_base';
        const STATE = 'test';
        const weichatOauthUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}&state=${STATE}#wechat_redirect`;

        res.redirect(weichatOauthUrl);
    });

    /**
     * 接收微信授权回调
     */
    app.get('/recieveWeichatOauth', (req, res) => {
        // code是微信给的，通过code换取openid
        const code = req.query.code;
        // targetUrl是最初的参数，最终呈现的地址
        const finalTargetUrl = req.query.targetUrl;
        // 默认的跳转页面，防止目标页面不合法
        const defaultCallbackUrl = PUBLIC_ADDRESS;

        oauthUtil.getOauth2AccessToken(APPID, APPSECRET, code, (error, weichatOauth2Token) => {
            if (error) {
                warn('授权错误!');
                warn(error);
                // 跳转默认页面
                res.redirect(defaultCallbackUrl);

                return;
            }

            let weichatOauthUrl = /^https?/.test(finalTargetUrl) ? finalTargetUrl : defaultCallbackUrl;

            weichatOauthUrl = `${weichatOauthUrl}/?openid=${weichatOauth2Token.openid}`;

            log(weichatOauth2Token);
            log(`进入授权回调:code:${code},openid:${weichatOauth2Token.openid},url:${finalTargetUrl}`);

            // 插入mongodb数据库
            dbweichat.insert(weichatOauth2Token.openid, (error2, result) => {
                if (error2) {
                    warn(error2);
                } else {
                    log(result);
                }
                res.redirect(weichatOauthUrl);
            });
        });
    });

    /**
     * 查询是否存在openid
     */
    app.get('/queryopenid', (req, res) => {
        const openid = req.query.openid;

        dbweichat.getByConditions(openid, (error, result) => {
            if (error) {
                warn(error);
                res.end(JSON.stringify(error));
            } else {
                log(result);
                res.end(JSON.stringify(result));
            }
        });
    });
};