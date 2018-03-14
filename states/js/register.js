var userName=false,passwordName=false,passwordAgainName=false,corporationName=false,nameName=false,areaCodeName=false,telName=false,emailName=false,phoneName=false,codeName=false;
$(function(){
	var msession = document.cookie.replace(/(?:(?:^|.*;\s*)MSESSION\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	var a = Math.round(Math.random()*9+1);
	var b = Math.round(Math.random()*9+1);
	var c = a+b;
	$('.reg-iq').html(a+'+'+b+'=?');//验证
	$('.passwordAgain').blur(function(){
		if($('.passwordAgain').val() == $('.password').val()){
				passwordAgainName=true;
			}else{
				mc('请确保两次输入密码一致');
				passwordAgainName=false;
			}
	})
	$('.password').keyup(function(){
		var val = $('.password').val();
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
	$('.input').blur(function(){
		//console.log(passwordAgainName);
		var val = $(this).val();
		var _this = $(this);
		if (_this.attr('class').indexOf('user')!="-1") {
			var abc = name(val);
			if(name(val)){
				user(val,msession);
			}else{
				mc('请输入正确的用户名');
				userName=false;
			}
		}else if(_this.attr('class').indexOf('password')!="-1"){
			if(val.length>=6){
				passwordName=true;
			}else{
				mc('请输入正确的密码');
				passwordName=false;
			}
		}else if(_this.attr('class').indexOf('corporation')!="-1"){
			if (val!="") {
				corporationName = true;
			}else{
				mc('请输入您的公司名称');
				corporationName = false;
			}
		}else if(_this.attr('class').indexOf('name')!="-1"){
			if (val!="") {
				nameName=true;
			}else{
				mc('请输入联系人姓名');
				nameName=false;
			}
		}else if(_this.attr('class').indexOf('areaCode')!="-1"){
			if(areaCode(val)){
				areaCodeName=true;
			}else{
				mc('请输入正确的区号');
				areaCodeName = false;
			}
		}else if(_this.attr('class').indexOf('tel')!="-1"){
			if (tel(val)) {
				telName = true;
			}else{
				mc('请输入正确的电话号码');
				telName = false;
			}
		}else if(_this.attr('class').indexOf('email')!="-1"){
			if (email(val)) {
				emailName = true;
			}else{
				mc('请输入正确的邮箱');
				emailName=false;
			}
		}else if(_this.attr('class').indexOf('phone')!="-1"){
			if(mobile(val)){
				phoneName=true;
			}else{
				mc('请输入正确的手机号码')
				phoneName=false;
			}
		}else if(_this.attr('class').indexOf('code')!="-1"){
			if (val==c) {
				codeName=true;
			}else{
				mc('请输入正确的验证码')
				codeName = false
			}
		}
	})
	//选择地区
	$('#changeArea').on('click',function(){
		if($('.area').hasClass('hide')){
			$('.area').removeClass('hide');
		}else{
			$('.area').addClass('hide');
		}
	})
	$('.area').on('click','span',function(){
		$('.area').addClass('hide');
		$('.area span').removeClass('active');
		$(this).addClass('active');
		var name = $(this).html();
		$('#changeArea p span').html('['+name+']');
	})
	//选择地区
	$('.btn-register').on('click',function(){
		console.log(userName,passwordName,passwordAgainName,corporationName,nameName,areaCodeName,telName,emailName,phoneName,codeName);
		if (userName==true&&passwordName==true&&passwordAgainName==true&&corporationName==true&&nameName==true&&areaCodeName==true&&telName==true&&emailName==true&&phoneName==true&&codeName==true) {
			$.get("/mobile.Member/regist?loginid="+$('.user').val()+"&password="+$('.password').val()+"&pwd="+$('.passwordAgain').val()+"&company="+encodeURIComponent($('.corporation').val())+"&contact="+encodeURIComponent($('.name').val())+"&tphone="+($('.areaCode').val()+$('.tel').val())+"&mphone="+$('.phone').val()+"&email="+$('.email').val()+"&msession="+msession,function(data){
				var json = JSON.parse(data);
				if(json.id>0){
					mc('注册成功');
					setTimeout(function(){
                        window.location.href= "/";
                    },1000)
				}else if(json.id=="-1000"){
					mc('注册成功,请重新登录');
					setTimeout(function(){
                        window.location.href= "/login";
                    },1000)
				}else{
					mc('系统异常,请重新注册');
					setTimeout(function(){
                        window.location.href= "/register";
                    },1000)
				}
			})
		}
		if (codeName==false) {
			mc('请输入正确的验证码');
		}
		if (phoneName==false) {
			mc('请输入正确的手机号码');
		}
		if (emailName==false) {
			mc('请输入正确的邮箱');
		}
		if (telName==false) {
			mc('请输入正确的电话号码');
		}
		if (areaCodeName==false) {
			mc('请输入正确的区号');
		}
		if (areaCodeName==false) {
			mc('请输入正确的区号');
		}
		if(corporationName==false){
			mc('请输入您的公司名称');
		}
		if(passwordAgainName==false){
			mc('请确保两次输入密码一致');
		}
		if(passwordAgainName==false){
			mc('请确保两次输入密码一致');
		}
		if (userName==false) {
			mc('请输入正确的用户名');
		}
	})
})

function mobile(val){
	var reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
	return reg.test(val);
}
function tel(val){
	var reg = /^(\d{3,4}-?)?\d{7,9}$/g;
	return reg.test(val);
}
function name(val){
	var reg = /^[a-z\d]{6,16}$/;
	return reg.test(val);
}
function password(val){
	var reg = /^[a-z\d]{6,16}$/;
	return reg.test(val);
}
function email(val){
	var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
	return reg.test(val);
}
function areaCode(val){
	var reg = /^\d{3,4}$/;
	return reg.test(val);
}

function mc(val){
	$('.wrong').removeClass('hide');
	$('.text').text(val);
	setTimeout(function(){
		$('.wrong').addClass('hide');
	},1000)
}
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
 //查询用户是否存在
 function user(val,msession){
 	$.get("/mobile.Member/checkLoginid?loginid="+val+"&msession="+msession,function(data){
 		var json = JSON.parse(data);
 		if (json.id == "-10") {
 			userName=true;
 		}else{
 			mc('该用户名已存在');
 		}
 	})
 }