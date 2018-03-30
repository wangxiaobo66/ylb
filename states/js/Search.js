$(function(){
    var page = 1,rp = 20;//设置初始页面和条数
    //设置搜索的信息
    var kw="",tablename = "",area = "",cate ="",searchtype = "";
    //从订阅过来
    //读取url参数
    var theRequest = GetRequest();
    console.log(theRequest);
    //从订阅来
    if(theRequest.areaid!=undefined){
        kw = decodeURI(theRequest.keyword);
        if(theRequest.tableType!=""){
            var attr = theRequest.tableType.split(',');
            for(var i = 0, len = attr.length;i<len;i++){
                tablename = tablename + "&tablename=" + attr[i]
            }
        }else{
            tablename = ""
        }
        if(theRequest.areaid!=""){
            var attr = theRequest.areaid.split(',');
            for(var i = 0, len = attr.length;i<len;i++){
                area = area + "&area=" + attr[i]
            }
        }else{
            area = ""
        }
        if(theRequest.categoryid!=""){
            var attr = theRequest.categoryid.split(',');
            for(var i = 0, len = attr.length;i<len;i++){
                cate = cate + "&cate=" + attr[i]
            }
        }else{
            cate = ""
        }
        time = timeDate[theRequest.bDate];
        var url = "http://39.107.107.129:18005/mobile.Info/search?kw="+kw+tablename+area+cate+"&searchtype="+searchtype+"&time="+time+"&page="+page+"&rp="+rp;
        search(url,page);
    }
    //从hot来
    if(theRequest.kw!=undefined){
        kw = theRequest.kw;
        var url = "http://39.107.107.129:18005/mobile.Info/search?kw="+kw+"&searchtype="+searchtype+"&page="+page+"&rp="+rp;
        search(url,page);
    }
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
    $('.content span').on('click',function(){
        if($(this).hasClass('active')){
            $('.content span').removeClass('active');
            searchtype = "";
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
        if($('#informationList').html()==""){
            $('#searchHistory').hide();
            $('#searchHot').show();
            $('.search-content').addClass('hidden');
        }
        $('.catalogue-list').children('div').addClass('hidden');
        $('.catalogue-list').hide();
        $('.catalogue ul li img').attr('src','img/down_arrow.png');
        $('.ul-table li').removeClass('active');
    });
    //开始搜索
    $('#Search').on('click',function(){
        //初始化搜索结果list
        $('#informationList').html('');
        kw=$('.search-input').val();
        //栏目
        for(var i = 0,len = column.length;i<len;i++){
            tablename = tablename+("&tablename="+column[i])
        }
        //内容
        //地区
        for(var i = 0,len = areas.length;i<len;i++){
            area = area+("&area="+areas[i])
        }
        //行业
        for(var i = 0,len = cates.length;i<len;i++){
            cate = cate+("&cate="+cates[i])
        }
        var url = "http://39.107.107.129:18005/mobile.Info/search?kw="+kw+tablename+area+cate+"&searchtype="+searchtype+"&time="+time+"&page="+page+"&rp="+rp;
        search(url,page);
    });
    //显示更多
    $('#moreInfo').on('click',function(){
        page = page+1;
        var url = "http://39.107.107.129:18005/mobile.Info/search?kw="+kw+tablename+area+cate+"&searchtype="+searchtype+"&time="+time+"&page="+page+"&rp="+rp;
        search(url,page);
    });
    //历史记录搜索
    $('#searchHistory ul li').on('click',function(){
       //获取搜索词
        kw = $(this).html();
        var url = "http://39.107.107.129:18005/mobile.Info/search?kw="+kw+tablename+area+cate+"&searchtype="+searchtype+"&time="+time+"&page="+page+"&rp="+rp;
        search(url,page);
    });
    //热门关键词搜索
    /*
    $('#searchHot ul li').on('click',function(){
        kw = $(this).html();
        var url = "http://39.107.107.129:18005/mobile.Info/search?kw="+kw+tablename+area+cate+"&searchtype="+searchtype+"&time="+time+"&page="+page+"&rp="+rp;
        search(url,page);
    });*/
    //直接软键盘enter事件
    document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) { // enter 键
            //取input内的值
            kw = $('.search-input').val();
            console.log(kw);
            //传值为空时
            if(kw==""){
                //不做任何操作
            }else{
                document.activeElement.blur();//h5页面关闭软键盘事件
                var url = "http://39.107.107.129:18005/mobile.Info/search?kw="+kw+tablename+area+cate+"&searchtype="+searchtype+"&time="+time+"&page="+page+"&rp="+rp;
                search(url,page);
                setHistory(kw);
            }
        }
    };
});
//数组删除方法
function arrayRemoveElement(array,element){
    for(var i = 0,len = array.length;i<len;i++){
        if(array[i] == element){
            array.splice(i,1);
            return array;
        }
    }
}
//时间戳转时间
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y+M+D;
}
//调用搜索
function search(url,page){
    $.ajax({
        type: "GET",
        url:url,
        dataType: "json",
        success: function(data) {
            var total, allpage;
            if (data.infos.length != 0) {
                if (data.totalFound >= 5000) {
                    total = 5000;
                    allpage = Math.ceil(total / 20);
                    if (page <= allpage) {
                        informationList(data.infos);
                    } else {
                        $('#moreInfo').html('暂无更多信息')
                    }
                } else {
                    total = data.totalFound;
                    allpage = Math.ceil(total / 20);
                    if (page <= allpage) {
                        informationList(data.infos);
                    } else {
                        $('#moreInfo').html('暂无更多信息')
                    }
                }
            }else{
                $('#moreInfo').html('暂无信息')
            }
            $('.catalogue ul li img').attr('src','img/down_arrow.png');
            $('.ul-table li').removeClass('active');
            $('.search-content').removeClass('hidden');
            $('#searchHot,#searchHistory,.catalogue-list').hide();
        }
    })
}
//储存历史纪录公方法
function setHistory(val){
    var history = localStorage.getItem("history");
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
//搜索结果list
function informationList(data){
    var List = '';
    for (var i = 0,len = data.length;i<len;i++){
        var categoryName = '';
        for (var j = 0,lenj = data[i].categoryId.length;j<lenj;j++){
            //console.log(categoryList[(data[i].categoryId[j])-1]);
            if(data[i].categoryId[j] == 0){

            }else{
                categoryName = categoryName + categoryList[(data[i].categoryId[j])-1].name + ',';
            }
        }
        List = List +   '<li class="dynamic-list">'+
                            '<p class="dynamic-list-title">'+
                                '<a href="'+'/'+data[i].tableName2.toLowerCase()+'/'+data[i].htmlid+'">'+data[i].title+'</a>' +
                            '</p>'+
                            '<p>'+
                                '<span class="dynamic-list-addr">'+
                                    '<a title="'+areaList[(data[i].areaId) - 1].name+'招标网" href="/sa/'+areaList[(data[i].areaId) - 1].value+'">'+areaList[data[i].areaId - 1].name+'</a>'+
                                '</span>'+
                                '<span class="dynamic-list-type">'+categoryName+'&nbsp;&nbsp;&nbsp;&nbsp;'+'招标'+
                                '</span>'+
                                '<span class="dynamic-list-time">'+timestampToTime(data[i].publishDate)+'</span>' +
                            '</p>' +
                        '</li>';
    }
    $('#informationList').append(List);

}
//url获取参数
function GetRequest(){
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
//地区表
var areaList = [
        {"name":"北京","value":"beijing","id":"1"}, {"name":"上海","value":"shanghai","id":"2"}, {"name":"天津","value":"tianjin","id":"3"},
        {"name":"重庆","value":"chongqing","id":"4"}, {"name":"河北","value":"hebei","id":"5"}, {"name":"山西","value":"shanxi","id":"6"},
        {"name":"内蒙古","value":"neimenggu","id":"7"}, {"name":"辽宁","value":"liaoning","id":"8"}, {"name":"吉林","value":"jilin","id":"9"},
        {"name":"黑龙江","value":"heilongjiang","id":"10"},{"name":"江苏","value":"jiangsu","id":"11"}, {"name":"浙江","value":"zhejiang","id":"12"},
        {"name":"安徽","value":"anhui","id":"13"}, {"name":"福建","value":"fujian","id":"14"}, {"name":"江西","value":"jiangxi","id":"15"} ,
        {"name":"山东","value":"shandong","id":"16"}, {"name":"河南","value":"henan","id":"17"}, {"name":"湖北","value":"hebei","id":"18"},
        {"name":"湖南","value":"hunan","id":"19"}, {"name":"广东","value":"guangdong","id":"20"}, {"name":"广西","value":"guangxi","id":"21"},
        {"name":"海南","value":"hainan","id":"22"}, {"name":"贵州","value":"guizhou","id":"23"}, {"name":"云南","value":"yunnan","id":"24"},
        {"name":"西藏","value":"xizang","id":"25"}, {"name":"陕西","value":"shangxi","id":"26"}, {"name":"四川","value":"sichuan","id":"27"},
        {"name":"甘肃","value":"gansu","id":"28"}, {"name":"青海","value":"qinghai","id":"29"}, {"name":"新疆","value":"xinjiang","id":"30"},
        {"name":"宁夏","value":"ningxia","id":"31"},{"name":"香港","value":"xianggang","id":"32"},{"name":"澳门","value":"aomen","id":"33"},
        {"name":"台湾","value":"taiwan","id":"34"},{"name":"","value":"","id":"35"},{"name":"跨省","value":"kuasheng","id":"36"},
        {"name":"","value":"","id":"37"},{"name":"","value":"","id":"38"},{"name":"","value":"","id":"39"},{"name":"海外","value":"haiwai","id":"40"},
        {"name":"","value":"","id":"41"},{"name":"","value":"","id":"42"},{"name":"亚洲","value":"yazhou","id":"43"},{"name":"欧洲","value":"ouzhou","id":"44"},
        {"name":"非洲","value":"feizhou","id":"45"},{"name":"北美洲","value":"beimeizhou","id":"46"},{"name":"南美洲","value":"nanmeizhou","id":"47"},
        {"name":"大洋洲","value":"dayangzhou","id":"48"},{"name":"中美洲","value":"zhongmeizhou","id":"49"},{"name":"加勒比","value":"jialebi","id":"50"}];
//行业表
var categoryList = [
        {"name":"交通运输"}, {"name":"网络通讯计算机"}, {"name":"市政房地产建筑"}, {"name":"水利桥梁"}, {"name":"机械电子电器"}, {"name":"环保"},
        {"name":"能源化工"}, {"name":"医疗卫生"}, {"name":"科技文教旅游"}, {"name":"冶金矿产原材料"}, {"name":"出版印刷"}, {"name":"轻工纺织食品"},
        {"name":"农林牧渔"}, {"name":"商业服务"}, {"name":"其它"} , {"name":"园林绿化"}, {"name":"能源"}, {"name":"化工"}];

var timeDate = {day:1,week:7,month:30,quarter:90,year:365};