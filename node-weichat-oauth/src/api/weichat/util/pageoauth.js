const request = require('request');
const warn = require('../../../util/debug').warn;

/**
 * 通过code和公众号信息换取网页授权的token
 * @param {String} appid 公众号id
 * @param {String} appSecret 密钥
 * @param {String} code 每次授权的唯一code，只能用一次
 */
module.exports.getOauth2AccessToken = function getOauth2AccessToken(APPID, SECRET, CODE, callback) {
    const oauthUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${APPID}&secret=${SECRET}&code=${CODE}&grant_type=authorization_code`;
    
    request(oauthUrl, (error, response, body) => {
        if (!error && (response.statusCode === 200)) {
            // Show the HTML for the baidu homepage.
            let finalOauth2Token;
            
            try {
                finalOauth2Token = JSON.parse(body);
            } catch (e) {
                warn('授权token获取失败');
                warn(e);
            }
            callback(null, finalOauth2Token);
        } else {
            callback(error);
        }
    });
};