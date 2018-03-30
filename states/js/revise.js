$(function(){
	//密码强度
	$('#newPassword').keyup(function(){
		var val = $('#newPassword').val();
		if (val.length>=6) {
			$('.intensity').removeClass('hide');
			var score = testpass(val);
			if (score == "5") {
				$('.weak').removeClass('hide');
				$('.middle').addClass('hide');
				$('.strong').addClass('hide');
			}else if (score == "10") {
				$('.weak').removeClass('hide');
				$('.middle').removeClass('hide');
				$('.strong').addClass('hide');
			}else if (score == "15" || score == "20"){
				$('.weak').removeClass('hide');
				$('.middle').removeClass('hide');
				$('.strong').removeClass('hide');
			}
		}else{
			$('.intensity').addClass('hide');
		}
	});
	//验证码
	var a = Math.round(Math.random()*9+1);
	var b = Math.round(Math.random()*9+1);
	var c = a+b;
	$('.reg-iq').html(a+'+'+b+'=?');
	//点击确认
	$('.btn-login').on('click',function(){
		var oldPassword = $('#oldPassword').val();
		var newPassword = $('#newPassword').val();
		var againPassword = $('#againPassword').val();
		//获取俩id
		var memberid=$('#memberid').html(),loginid = $('#loginid').html();
		var code = $('#code').val();
		if(oldPassword == ""){
            mc('当前密码不能为空')
		}
		if(newPassword == ""){
            mc('新密码不能为空')
		}
		if(againPassword == ""){
			mc('请确认密码')
		}
		if(code == ""){
			mc('验证码不能为空')
		}
		if(newPassword!=againPassword){
			mc('两次输入密码不一致')
		}
		if(code != c){
			mc('请输入正确的验证码')
		}
		if(oldPassword!=""&&newPassword!=""&&againPassword!=""&&code!=""&&newPassword==againPassword){
			//提交
            $.ajax({
                type:"GET",
                url:"http://39.107.107.129:18005/mobile.erqi/updatePassword?memberid="+memberid+"&loginid="+loginid+"&passraw="+oldPassword+"&passnew="+newPassword,
                dataType:"json",
                success:function(data){
                    if(data == 1){
                        mc('密码修改成功');
						setTimeout(function(){
							window.location.href="/mine"
						},2000)
                    }else{
                    	mc('密码修改失败')
					}
                }
            })
		}
	})
});
//密码强度
function testpass(password){ 
	 var score = 0; 
	 if (password.match(/(.*[A-Z])/)){ 
	 	score += 5; 
	 } 
	 if (password.match(/(.*[0-9])/)){ 
	 	score += 5; 
	 } 
	 if (password.match(/(.*[a-z])/)){ 
	 	score += 5; 
	 } 
	 if (password.match(/(.*[!,@,#,$,%,^,&,*,?,_,~])/)){ 
	 	score += 5 ; 
	 } 
	 return score; 
 }
 //错误提示
 function mc(val){
	$('.wrong').removeClass('hide');
	$('.text').text(val);
	setTimeout(function(){
		$('.wrong').addClass('hide');
	},1000)
}