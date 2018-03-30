$(function(){
   var memberid = $('#memberid').html(),infoid = $('#infoid').html(),membersearchid = $('#membersearchid').html();
   $('h2 span').on('click',function(){
       if($('h2 img').hasClass('active')){//已收藏
           //删除该收藏
           $.ajax({
               type: "GET",
               url:"http://39.107.107.129:18005/mobile.erqi/delMembersearch?membersearchid="+membersearchid,
               dataType: "json",
               success: function(data) {
                   if(data == 1){
                       $('h2 img').attr('src','/public/erqi/img/star.png').removeClass('active');
                       mc('已删除')
                   }
               }
           })
       }else{
           //收藏此条
           $.ajax({
               type: "GET",
               url:"http://39.107.107.129:18005/mobile.erqi/addShoucang?memberid="+memberid+"&infoid="+infoid,
               dataType: "json",
               success: function(data) {
                   if(data > 1){
                       $('h2 img').attr('src','/public/erqi/img/redstar.png').addClass('active');
                       mc('已收藏请到"我的"后台查看');
                       membersearchid = data;
                   }else{
                       mc('收藏失败');
                   }
               }
           })
       }
   })
});
function mc(val){
    $('.wrong').removeClass('hide');
    $('.text').text(val);
    setTimeout(function(){
        $('.wrong').addClass('hide');
    },1000)
}