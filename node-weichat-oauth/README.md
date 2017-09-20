# node-weichat-oauth

一个基于node.js与express与mongodb的微信授权后台的示例

- 在`node-express-mongodb-sample`的基础上，演示如何进行微信授权，并记录每次授权的用户`code`

- 然后再将`code`通过`access_token`换取成对应的`openid`

- 需要有自己相应的微信公众号（或测试号）配合调试

- 提供了授权，获取token，存储openid，查询openid的功能