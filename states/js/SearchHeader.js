/**
 * Created by wangxiaobo on 17/12/22.
 */
$(function(){
    //获取历史纪录
    var history = localStorage.getItem("history");
    if(history!=null){
        var History = history.split(",");
        History = Distinct(History);
        console.log(History,History.length);
        for(var i = 0,len = History.length;i<len;i++){
            $('#searchHistory ul').append('<li>'+History[i]+'</li>')
        }
    }else{
        $('#searchHistory').hide();
    }
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
            setHistory(val);
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
                setHistory(val);
            }
        }
    };
    $('#clear').on('click',function(){
        $('.search-input').val('');
        $('.search-input').focus();
    });
    //这里开始
    $('.catalogue .ul-table').on('click','li',function(e){
        $('.catalogue-list').show();
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
        showClass(name);
        $('.reset-fix').removeClass('hidden');
    });
    //table切换

    //储存历史纪录公方法
    function setHistory(val){
        if(history==null){
            localStorage.setItem("history", val);
        }else{
            history = history + ',' + val;
            localStorage.setItem("history", history);
            var History = history.split(",");
            History = Distinct(History);
            if(History.length>5){
                History.shift();
                History.join(',');
                localStorage.setItem("history", History);
            }else{
                History.join(',');
                localStorage.setItem("history", History);
            }
        }
    }
    //删除历史记录
    $('#Delete').on('click',function(){
        if(history!=null){
            localStorage.clear();
            $('#searchHistory').hide();
        }
    })
    //再次点击导航
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
//传递导航参数
var className;
function showClass(name){
    className = name;
}