/**
 * Created by wangxiaobo on 17/12/22.
 */
$(function(){
    //获取memberId
    var memberId = /*$('#memberId').html()*/67774184;
    //获取订阅信息
    RssList(memberId);
    //rss(kw,tableType,seachType,areaid,categoryid,bDate);
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
        showClass(name);
        $('.reset-fix').removeClass('hidden');
    });
    //table切换
    var allDelete = [];
    //选择删除
    $('.dynamic').on('click','div',function(e){
        var name = ($(this).attr('name'));
        if($(this).hasClass('dynamic-input')){
            if($(this).hasClass('curr')){
                $(this).removeClass('curr');
                allDelete = arrayRemoveElement(allDelete,name);
            }else{
                $(this).addClass('curr');
                allDelete.push(name);
            }
        }
    });
    //点击删除
    $('.dynamic').on('click','a',function(e){
        if($(this).hasClass('dynamic-list-delete')){
            var id = $(this).attr('name');
            getDelete(id,memberId);
        }
    });
    //全选
    $('.all-check').on('click',function(){
        if($('.all-check').hasClass('active')){
            $('.all-check').removeClass('active').html('全选');
            $('.dynamic-input').removeClass('curr');
            allDelete = [];
        }else{
            $('.all-check').addClass('active').html('取消');
            $('.dynamic-input').addClass('curr');
            $('.dynamic li div.dynamic-input').each(function(){
                allDelete.push($(this).attr('name'))
            })
        }
    });
    //批量删除
    $('.all-delete').on('click',function(){
        if(allDelete.length != 0){
            for(var i = 0,len = allDelete.length;i<len;i++){
                getDelete(allDelete[i],memberId)
            }
        }
    });
    //栏目
    var column = [];
    $('#all_column').on('click',function(){
        if($('#all_column').hasClass('active')){
            $('#all_column,.column_class').removeClass('active');
            column = [];
        }else{
            $('#all_column,.column_class').addClass('active');
            column = [1,2,3,4,5,6,7];
        }
    });
    $('.column_class').each(function(){
        $(this).on('click',function(){
            var tablename = $(this).attr('name');
            if($(this).hasClass('active')){
                $(this).removeClass('active');
                column = arrayRemoveElement(column,tablename);
                if(column.length==0){
                    $('.column_class,#all_column').removeClass('active');
                }
            }else{
                $(this).addClass('active');
                column.push(tablename);
            }
        })
    });
    //内容
    var searchtype = "CONTEXT";
    $('.content span').on('click',function(){
        if($(this).hasClass('active')){
            $('.content span').removeClass('active');
            searchtype = "CONTEXT";
        }else{
            $('.content span').removeClass('active');
            $(this).addClass('active');
            searchtype = $(this).attr('name');
        }
    });
    //地区
    var areas = [];
    $('#all_area').on('click',function(){
        if($('#all_area').hasClass('active')){
            $('#all_area,.area_class').removeClass('active');
            areas = [];
        }else{
            $('#all_area,.area_class').addClass('active');
            areas = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40];
        }
    });
    $('.area_class').each(function(){
        $(this).on('click',function(){
            var area = $(this).attr('name');
            if($(this).hasClass('active')){
                $(this).removeClass('active');
                areas = arrayRemoveElement(areas,area);
                if(areas.length==0){
                    $('.area_class,#all_area').removeClass('active');
                }
            }else {
                $(this).addClass('active');
                areas.push(area);
            }
        })
    });
    //行业
    var cates = [];
    $('#all_cate').on('click',function(){
        if($('#all_cate').hasClass('active')){
            $('#all_cate,.cate_class').removeClass('active');
            cates = [];
        }else{
            $('#all_cate,.cate_class').addClass('active');
            cates = [1,2,3,4,5,6,8,9,10,11,12,13,14,15,16,17,18];
        }
    });
    $('.cate_class').each(function(){
        $(this).on('click',function(){
            var cate = $(this).attr('name');
            if($(this).hasClass('active')){
                $(this).removeClass('active');
                cates = arrayRemoveElement(cates,cate);
                if(cates.length==0){
                    $('.cate_class,#all_cate').removeClass('active');
                }
            }else{
                $(this).addClass('active');
                cates.push(cate);
            }
        })
    });
    //时间
    var time ="";
    $('.time_class').each(function(){
        $(this).on('click',function(){
            time = $(this).attr('name');
            $('.time_class').removeClass('active');
            $(this).addClass('active');
        })
    });
    //重置所选参数
    $('#reset').on('click',function(){
        if(className == "column"){
            column = [];
            $('#all_column,.column_class').removeClass('active');
        }
        if(className == "content"){
            $('.content span').removeClass('active');
            searchtype = "";
        }
        if(className == "area"){
            areas = [];
            $('#all_area,.area_class').removeClass('active');
        }
        if(className == "trade"){
            cates = [];
            $('#all_cate,.cate_class').removeClass('active');
        }
        if(className == "time"){
            time = "";
            $('.time_class').removeClass('active');
        }
    });
    //确定收起选择
    $('#fix').on('click',function(){
        $('#searchHistory').show();
        $('.catalogue-list').children('div').addClass('hidden');
        $('.catalogue ul li img').attr('src','img/down_arrow.png');
        $('.ul-table li').removeClass('active');
    });
    //定义提交订阅参数
    var kw = "",tableType = "",areaid = "",searchType = "",categoryid = "",bDate = "";
    //点击订阅按钮或enter订阅
    $('#Search').on('click',function(){
        //收起table选框
        $('#searchHistory').show();
        $('.catalogue-list').children('div').addClass('hidden');
        $('.catalogue ul li img').attr('src','img/down_arrow.png');
        $('.ul-table li').removeClass('active');
        if(areas.length>5){
            areaid = ""
        }else{
            areaid = areas.toString();
        }
        if(cates.length>5){
            categoryid = ""
        }else{
            categoryid = cates.toString();
        }
        kw = $('.search-input').val();tableType = column.toString();bDate = time;searchType = searchtype;
        //传值所有参数为空时
        if(kw==""&&tableType==""&&areaid==""&&categoryid==""&&bDate==""){
            //不做任何操作
        }else{
            rss(kw,tableType,searchType,areaid,categoryid,bDate,memberId);
        }
    });
    document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) { // enter 键
            //收起table选框
            $('#searchHistory').show();
            $('.catalogue-list').children('div').addClass('hidden');
            $('.catalogue ul li img').attr('src','img/down_arrow.png');
            $('.ul-table li').removeClass('active');

            if(areas.length>5){
                areaid = ""
            }else{
                areaid = areas.toString();
            }
            if(cates.length>5){
                categoryid = ""
            }else{
                categoryid = cates.toString();
            }
            kw = $('.search-input').val();tableType = column.toString();bDate = time;searchType = searchtype;
            //传值所有参数为空时
            if(kw==""&&tableType==""&&areaid==""&&categoryid==""&&bDate==""){
                //不做任何操作
            }else{
                rss(kw,tableType,searchType,areaid,categoryid,bDate,memberId);
            }
        }
    };
    //点击订阅条目跳转搜索
    $('.dynamic').on('click','p',function(){
        var areaid = $(this).attr('areaid'),bDate = $(this).attr('bDate'),categoryid = $(this).attr('categoryid'),
            keyword = encodeURI($(this).attr('keyword')),searchType = $(this).attr('searchType'),tableType = $(this).attr('tableType');
        window.location.href = "/search?areaid="+areaid+"&bDate="+bDate+"&categoryid="+categoryid+"&keyword="+keyword+"&searchType="+searchType+"&tableType="+tableType;
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
//获取订阅list
function RssList(memberId){
    $.ajax({
        type: "GET",
        url:"http://39.107.107.129:18005/mobile.erqi/getListMembersearchs?memberid="+memberId,
        dataType: "json",
        success: function(data) {
            //生成list
            createList(data)
        }
    })
}
//生成订阅list
function createList(data){
    //初始化list
    $('#searchHistory ul').html('');
    if(data.length==0){
        $('#searchHistory ul').html('');
        $('#searchHistory a').html('暂无订阅信息');
    }else{
        for(var i = 0, len = data.length;i<len;i++){
            $('#searchHistory ul').append(
                '<li class="dynamic-list">'+
                '<div class="dynamic-input" name="'+data[i].id+'"><a href="javascript:;"></a></div>' +
                '<p class="dynamic-list-title limit" areaid="'+data[i].areaid+'" bDate="'+data[i].bDate+'" categoryid="'+data[i].categoryid+'" keyword="'+data[i].keyword+'" searchType="'+data[i].searchType+'" tableType="'+data[i].tableType+'">'+data[i].conditionText+'</p>' +
                '<a href="javascript:;" class="dynamic-list-delete" name="'+data[i].id+'">删除</a>' +
                '</li>'
            )
        }
    }
}
//单点删除
function getDelete(id,memberId){
    $.ajax({
        type:"GET",
        url:"http://39.107.107.129:18005/mobile.erqi/delMembersearch?membersearchid="+id,
        dataType:"json",
        success:function(data){
            if(data == 1){
                RssList(memberId);
            }
        }
    })
}
//订阅接口
function rss(kw,tableType,searchType,areaid,categoryid,bDate,memberId){
    $.ajax({
        type:"GET",
        url:"http://39.107.107.129:18005/mobile.erqi/addMembersearch?tableType="+tableType+"&kw="+kw+"&searchType="+searchType+
            "&areaid="+areaid+"&categoryid="+categoryid+"&bDate="+bDate+"&memberId="+memberId,
        dataType:"json",
        success:function(data){
            if(data > 1){
                RssList(memberId);
            }else if(data == -22){
                $('#wrong').removeClass('hide');
                $('#wrong span').html('已保存过此条订阅');
                setTimeout(function(){
                    $('#wrong').addClass('hide');
                },1500)
            }else if(data == -23){
                $('#wrong').removeClass('hide');
                $('#wrong span').html('免费会员最多只能保存三条订阅');
                setTimeout(function(){
                    $('#wrong').addClass('hide');
                },1500)
            }else if(data == -24){
                $('#wrong').removeClass('hide');
                $('#wrong span').html('收费会员最多保存十条订阅');
                setTimeout(function(){
                    $('#wrong').addClass('hide');
                },1500)
            }else if(data == -17){
                $('#wrong').removeClass('hide');
                $('#wrong span').html('请选择时间');
                setTimeout(function(){
                    $('#wrong').addClass('hide');
                },1500)
            }
        }
    })

}
//传递导航参数
var className;
function showClass(name){
    className = name;
}
//数组删除方法
function arrayRemoveElement(array,element){
    for(var i = 0,len = array.length;i<len;i++){
        if(array[i] == element){
            array.splice(i,1);
            return array;
        }
    }
}