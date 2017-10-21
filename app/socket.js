/**
 * socket connection
 */
const cookie = require('cookie');

const modulesUser = require('./models/user');

exports.socket = function(server) {
    // -- socket.io start

    const io = require('socket.io')(server);
    io.use((socket, next) => {
      if (socket.request.headers.cookie) {
        socket.request.cookies = cookie.parse(socket.request.headers.cookie);
        next();
      } else {
        return next(new Error('Missing cookie headers'));
      }
    });

    
    // 在线用户
    let usersOnline = [];

    io.on('connection', function (socket) {
      const cookies = socket.request.cookies;
      const userId = cookies.sessionKey;
      const user = modulesUser.findUser(userId);
      console.log('current online user ==>', usersOnline);
      
      // 用户加入事件
      socket.on('chat join',function() {
        

        // 在线用户同名的用户
        const users = usersOnline.filter((user) => {
          return user.id === userId;
        });

        if (users.length) {
          // 非新用户
          // 向客户端发送登录失败事件
          socket.emit('chat join fail', {
            msg: 'You\'re online',
          });

        } else {
          // 是新用户
          usersOnline.push(user);

          console.log('join new user: ', user);
          
          // 向客户端发送登录成功事件
          socket.emit('chat join success', user);

          // 向客户端广播(不包含当前客户端)
          socket.broadcast.emit('chat join new user', user);
        }
      });


      // 用户退出事件
      socket.on('chat sign out', function() {
        console.log('chat sign out =>>', userId);
        const newUsersOnline = usersOnline.filter((user) => {
          return user.id !== userId;
        });

        usersOnline = [];
        usersOnline = newUsersOnline;
        
        // 向客户端广播(不包含当前客户端)
        socket.broadcast.emit('chat sign out user', user);
      });
  
      // 发送信息
      socket.on('chat send message', function(data) {
        console.log('Receive send message ==>', data, 'from', user);
        // 广播 (且包含当前客户端)
        io.sockets.emit('chat receive message', Object.assign({}, data, user));
        // chatSocket.sockets.emit('receive message', data);
      });
  
    });

    // -- socket.io end
  
};