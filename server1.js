var express = require('express'),
	index = express(),
	server = require('http').createServer(index),
	users=[];// save nickname;
	io = require('socket.io').listen(server);
index.use('/',express.static(__dirname + '/myChatRoom'));
server.listen(80);
console.log('sucess');

io.on('connect',function(socket){
	socket.on("login",function(nickname) {
		if(users.indexOf(nickname)>-1) {
			socket.emit("existed");
		}else {
			users.push(nickname);
			socket.broadcast.emit('system',nickname);
		}
	});
	socket.on('post',function(nickname,message){
		socket.broadcast.emit('newMsg',nickname,message);
	});
})

