'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = publicMixmin;
/**
 * 开启公告资源访问
 */
function publicMixmin(app, express) {
  app.use(express.static('public'));
}
//# sourceMappingURL=public.js.map
