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

import {indexController,searchController,rssController,collectController,hotController,reviseController,mineController,registerController} from './controller/pages/router';
app.use(koaBody({
    multipart: true
}));
app.keys = ['ylb'];
//页面路由
router.get('/index',indexController);
router.get('/search',searchController);
router.get('/rss',rssController);
router.get('/collect',collectController);
router.get('/hot',hotController);
router.get('/revise',reviseController);
router.get('/mine',mineController);
router.get('/regist',registerController);
app.use(cors());
app
    .use(router.routes())
    .use(router.allowedMethods());


app.use(staticCache(path.join('./states'), {
    maxAge: 365 * 24 * 60 *60,
    dynamic: true,
    gzip: true
}));
app.listen(10009);