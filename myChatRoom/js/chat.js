window.onload = function() {
	var chat = new hichat();
	chat.init();
};
document.getElementById('text').focus();

var hichat = function() {
	this.socket = null;
}

hichat.prototype = {
	init: function() {
		var that = this,i=0;
		this.socket = io.connect();
		//连接成功后提醒用户
		this.socket.on('connect',function(){
			// var newP=document.createElement('p');
			// newP.innerHTML = "welcome to new user";
			// newP.style.color = 'red';
			// document.getElementById('show').appendChild(newP);
		});
		
		//clickevent that get nick name
		document.getElementById('nicknameBtn').addEventListener('click',function(){
			var nickname = document.getElementById('nickname').value;
			that.socket.emit('login',nickname);
			
			//show the welcome
			document.getElementById('hidden').style.display = 'none';
			var newP=document.createElement('p');
			newP.innerHTML = "welcome " +nickname;
			newP.style.color = 'red';
			document.getElementById('show').appendChild(newP);
		});
		
		//nickname is existed
		this.socket.on('existed',function(){
			var nickname = document.getElementById('nickname').value,
			i=1;
			
			var newP=document.createElement('p');
			newP.innerHTML = "welcome " +nickname+i;
			newP.style.color = 'red';
			document.getElementById('show').appendChild(newP);
		});
		
		//post the others someone is onLine
		this.socket.on('system',function(nickname){
			var newP=document.createElement('p');
			newP.innerHTML = "welcome " +nickname;
			newP.style.color = 'red';
			document.getElementById('show').appendChild(newP);
		});
		
		//click event that post message
		document.getElementById('sendBtn').addEventListener('click',function(){
			//此处定义了此方法中的局部变量
		var messageInput = document.getElementById('text'),
		date = new Date().toTimeString().substr(0,8);
		nickname = document.getElementById('nickname').value;
		message = messageInput.value;
		messageInput.value = '';
		messageInput.focus();
		
		that.socket.emit('post',nickname,message);//传送数据到后台
		var P=document.createElement('p');
		
		P.innerHTML = nickname+ '<span class="timespan">(' + date + '): </span>'+message;
		document.getElementById('show').appendChild(P);
		
		
	},false);
	this.socket.on('newMsg',function(nickname,message){
			var P=document.createElement('p'),
			date = new Date().toTimeString().substr(0,8);;
			P.innerHTML = nickname+ '<span class="timespan">(' + date + '): </span>'+message;
			document.getElementById('show').appendChild(P);
		});
	}
}