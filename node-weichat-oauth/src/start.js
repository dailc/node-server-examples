const express = require('express');
const corsMixmin = require('./inner/cors').corsMixmin;
const publicMixmin = require('./inner/public').publicMixmin;
const serverMixmin = require('./server/server').serverMixmin;
const homeMixmin = require('./api/home').homeMixmin;
const weichatMixmin = require('./api/weichat').weichatMixmin;

const app = express();

publicMixmin(app, express);
corsMixmin(app);

homeMixmin(app);
weichatMixmin(app);

serverMixmin(app);

