/**
 * Created by wangxiaobo on 17/12/22.
 */
$(function(){
    //点击搜索或enter搜索
    $('#Search').on('click',function(){
        var val = $('.search-input').val();
        //传值为空时
        if(val==""){
            //不做任何操作
        }else{
            //尝试用java去取val值并请求数据 这个时候生成list和page
            //window.location.href="/search?kw="+val;
            //存储为历史搜索
            //setHistory(val);
        }
    });
    document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) { // enter 键
            //取input内的值
            var val = $('.search-input').val();
            console.log(val);
            //传值为空时
            if(val==""){
                //不做任何操作
            }else{
                //尝试用java去取val值并请求数据 这个时候生成list和page
                //window.location.href="/search?kw="+val;
                //存储为历史搜索
                //setHistory(val);
            }
        }
    };
    $('#clear').on('click',function(){
        $('.search-input').val('');
        $('.search-input').focus();
    });
    //这里开始
    $('.catalogue .ul-table').on('click','li',function(e){
        $('#searchHistory,#searchHot').hide();
        $('.catalogue ul li').removeClass('active');
        $(this).addClass('active');
        $('.catalogue ul li img').attr('src','img/down_arrow.png');
        $(this).children('img').attr('src','img/up_arrow.png');
        var name = $(this).attr('name');
        $('.catalogue-list').children().each(function(){
            if($(this).hasClass(name)){
                $(this).removeClass('hidden');
            }else{
                $(this).addClass('hidden');
            }
        });
        $('.reset-fix').removeClass('hidden');
    });
    //table切换

    //选择删除
    $('.dynamic').on('click','div',function(e){
        console.log($(this));
        if($(this).hasClass('dynamic-input')){
            if($(this).hasClass('curr')){
                $(this).removeClass('curr');
            }else{
                $(this).addClass('curr');
            }
        }
    });
    $('.dynamic').on('click','a',function(e){
        if($(this).hasClass('dynamic-list-delete')){

        }
    });
    //全选
    $('.all-check').on('click',function(){
        if($('.all-check').hasClass('active')){
            $('.all-check').removeClass('active').html('全选');
            $('.dynamic-input').removeClass('curr');
        }else{
            $('.all-check').addClass('active').html('取消');
            $('.dynamic-input').addClass('curr');
        }
    });
    //批量删除
    $('.all-delete').on('click',function(){

    })
});
//数组去重
function Distinct(array){
    var res = [];
    var json = {};
    for(var i = 0; i < array.length; i++){
        if(!json[array[i]]){
            res.push(array[i]);
            json[array[i]] = 1;
        }
    }
    return res;
}