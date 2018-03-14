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
	})
	//验证码
	var a = Math.round(Math.random()*9+1);
	var b = Math.round(Math.random()*9+1);
	var c = a+b;
	$('.reg-iq').html(a+'+'+b+'=?');
})
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