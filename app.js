/**
 * Created by wangxiaobo on 18/2/26.
 */
import Koa from "koa";
const staticCache = require('koa-static-cache');
import Router from 'koa-router';
import koaBody from 'koa-body';
import fs from 'fs';
import path from 'path';
import cors from 'kcors';
import jwt from 'koa-jwt';
const app = new Koa();
const router = new Router();

import {indexController} from './controller/pages/router';
app.keys = ['ylb'];

router.get('/',indexController);

app.use(cors());
app
    .use(router.routes())
    .use(router.allowedMethods());
app.use(staticCache('./build', {
    maxAge: 365 * 24 * 60 * 60,
    dynamic: true,
    gzip: true
}));
app.listen(10009);