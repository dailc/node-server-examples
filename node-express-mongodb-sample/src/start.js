const express = require('express');
const corsMixmin = require('./inner/cors').corsMixmin;
const publicMixmin = require('./inner/public').publicMixmin;
const serverMixmin = require('./server/server').serverMixmin;
const getMixmin = require('./api/get').getMixmin;
const postMixmin = require('./api/post').postMixmin;

const app = express();

publicMixmin(app, express);
corsMixmin(app);

getMixmin(app);
postMixmin(app);

serverMixmin(app);

