import express from 'express';
import corsMixmin from './inner/cors';
import publicMixmin from './inner/public';
import serverMixmin from './server/server';
import homeMixmin from './api/home';
import testdbMixmin from './api/testdb';

const app = express();

publicMixmin(app, express);
corsMixmin(app);

homeMixmin(app);
testdbMixmin(app);

serverMixmin(app);

