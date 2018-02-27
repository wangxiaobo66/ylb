/**
 * Created by wangxiaobo on 18/2/26.
 */
//import {getIndexTemplate} from '../../template/index.html';
import fs from 'fs';
let getIndexTemplate = fs.createReadStream('./template/index.html');
function indexController(ctx, next) {
    ctx.type = 'text/html';
    ctx.body = getIndexTemplate;
}

export {indexController}