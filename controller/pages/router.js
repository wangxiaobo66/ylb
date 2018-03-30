/**
 * Created by wangxiaobo on 18/2/26.
 */
//import {getIndexTemplate} from '../../template/index.html';
import fs from 'fs';
let getIndexTemplate = fs.readFileSync('./template/index.html');
function indexController(ctx, next) {
    ctx.type = 'text/html';
    ctx.body = getIndexTemplate;
}
let getSearchTemplate = fs.readFileSync('./states/search.html');
function searchController(ctx, next) {
    //console.log(getSearchTemplate);
    ctx.type = 'text/html';
    ctx.body = getSearchTemplate;
}
let getRssTemplate = fs.readFileSync('./states/rss.html');
function rssController(ctx, next) {
    ctx.type = 'text/html';
    ctx.body = getRssTemplate;
}
let getCollectTemplate = fs.readFileSync('./states/collect.html');
function collectController(ctx,next){
    ctx.type = 'text/html';
    ctx.body = getCollectTemplate;
}
let getHotTemplate = fs.readFileSync('./states/hot.html');
function hotController(ctx,next){
    ctx.type = 'text/html';
    ctx.body = getHotTemplate;
}
let getReviseTemplate = fs.readFileSync('./states/revise.html');
function reviseController(ctx,next){
    ctx.type = 'text/html';
    ctx.body = getReviseTemplate;
}
let getMineTemplate = fs.readFileSync('./states/my.html');
function mineController(ctx,next){
    ctx.type = 'text/html';
    ctx.body = getMineTemplate;
}
let getRegisterTemplate = fs.readFileSync('./states/regist.html');
function registerController(ctx,next){
    ctx.type = 'text/html';
    ctx.body = getRegisterTemplate;
}
export {indexController,searchController,rssController,collectController,hotController,reviseController,mineController,registerController}