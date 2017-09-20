const oauthMixmin = require('./weichat/oauth').oauthMixmin;

/**
 * 微信相关API
 */

module.exports.weichatMixmin = function weichatMixmin(app) {
    oauthMixmin(app);
};