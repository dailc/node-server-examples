'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('./inner/cors');

var _cors2 = _interopRequireDefault(_cors);

var _public = require('./inner/public');

var _public2 = _interopRequireDefault(_public);

var _server = require('./server/server');

var _server2 = _interopRequireDefault(_server);

var _home = require('./api/home');

var _home2 = _interopRequireDefault(_home);

var _testdb = require('./api/testdb');

var _testdb2 = _interopRequireDefault(_testdb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

(0, _public2.default)(app, _express2.default);
(0, _cors2.default)(app);

(0, _home2.default)(app);
(0, _testdb2.default)(app);

(0, _server2.default)(app);
//# sourceMappingURL=start.js.map
