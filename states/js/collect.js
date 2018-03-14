/**
 * Created by wangxiaobo on 17/12/25.
 */
$(function(){
    $('.dynamic').on('click','div',function(e){
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