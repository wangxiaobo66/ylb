/**
 * Created by wangxiaobo on 18/2/26.
 */
import {getIndexTemplate} from '../../template/index';
function indexController(ctx, next) {
    ctx.body = getIndexTemplate('首页');
}

export {indexController}