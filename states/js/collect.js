/**
 * Created by wangxiaobo on 17/12/25.
 */
$(function(){
    var memberId =$('#memberId').html();
    var deleteId = [];
    var infocatalog = 1;
    //获取收藏列表
    collectList(memberId,infocatalog);
    $('.dynamic').on('click','div',function(e){
        if($(this).hasClass('dynamic-input')){
            var id = $(this).attr('name');
            if($(this).hasClass('curr')){
                $(this).removeClass('curr');
                deleteId = arrayRemoveElement(deleteId,id);
            }else{
                $(this).addClass('curr');
                deleteId.push(id);
            }
        }
    });
    //单点删除
    $('.dynamic').on('click','a',function(e){
        if($(this).hasClass('dynamic-list-delete')){
            var id = $(this).attr('name');
            infoDelete(id,memberId,infocatalog);
        }
    });
    //全选
    $('.all-check').on('click',function(){
        if($('.all-check').hasClass('active')){
            $('.all-check').removeClass('active').html('全选');
            $('.dynamic-input').removeClass('curr');
            deleteId = [];
        }else{
            $('.all-check').addClass('active').html('取消');
            $('.dynamic-input').addClass('curr');
            $('.dynamic-input').each(function(){
                deleteId.push($(this).attr('name'))
            })
        }
    });
    //批量删除
    $('.all-delete').on('click',function(){
        for(var i=0,len = deleteId.length;i<len;i++){
            infoDelete(deleteId[i],memberId,infocatalog)
        }
    });
    //收藏table
    $('.button-table div').on('click',function(){
        if($(this).hasClass('active')){

        }else{
            $('.button-table div').removeClass('active');
            $(this).addClass('active');
            infocatalog = $(this).attr('name');
            collectList(memberId,infocatalog);
        }
    })
});
//删除
function infoDelete(id,memberId,infocatalog){
    $.ajax({
        type: "GET",
        url:"http://39.107.107.129:18005/mobile.erqi/delShoucang?shoucangid="+id,
        dataType: "json",
        success: function(data) {
            if(data==1){
                collectList(memberId,infocatalog);
            }
        }
    })
}
//获取收藏list
function collectList(memberId,infocatalog){
    $.ajax({
        type: "GET",
        url:"http://39.107.107.129:18005/mobile.erqi/getListShoucangs?memberid="+memberId+"&infocatalog="+infocatalog,
        dataType: "json",
        success: function(data) {
            //生成list
            createList(data)
            //console.log(data)
        }
    })
}
//生成收藏list
function createList(data){
    //初始化list
    $('ul.dynamic').html('');
    if(data.length == 0){
        $('#Delete').html('暂无收藏信息')
    }else{
        $('#Delete').html('');
        for(var i = 0,len = data.length;i<len;i++){
            $('ul.dynamic').append(
                '<li class="dynamic-list">'+
                '<div class="dynamic-input" name="'+data[i].id+'"><a href="javascript:;"></a></div>'+
                '<p class="dynamic-list-title limit">'+data[i].infoTitle+'</p >'+
                '<a href="javascript:;" class="dynamic-list-delete" name="'+data[i].id+'">删除</a >' +
                '<p class="dynamic-list-span">' +
                '<span class="dynamic-list-addr">'+(data[i].state2 == 0?'未投标':data[i].state2 ==2?'中标了':'未中标')+'</span>' +
                //'<span class="dynamic-list-type">中标了</span>' +
                '<span class="dynamic-list-type">人气:1</span>' +
                '<span class="dynamic-list-time">'+timestampToTime(data[i].infoPubTime)+'</span>' +
                '</p >' +
                '</li>'
            )
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
//数组删除方法
function arrayRemoveElement(array,element){
    for(var i = 0,len = array.length;i<len;i++){
        if(array[i] == element){
            array.splice(i,1);
            return array;
        }
    }
}