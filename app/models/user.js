/* const path = require('path');
const fs = require('fs');

const file = path.resolve(__dirname, './data/users.json');
const users = fs.readFileSync(file, 'utf-8'); */

const users = require('../data/users.js');

// 查找用户
exports.findUser = function(id) {

  const user = users.users.filter((user) => {
    return user.id === id;
  });

  return { id, name, nickname, avatar } = user[0] || {};
}


// 登录检查
exports.checkLogin = function(name, password) {
  console.log('login user =>>', name, password);
  
  let result = {
    success: false,
    msg: 'login fail',
    id: null,
  };

  const loginUser = users.users.filter((user) => {
    console.log(user.name, user.password, user.name === name && user.password === password);
    return user.name === name && user.password === password;
  });


  if (loginUser.length) {
    result = {
      success: true,
      msg: 'login success',
      id: loginUser[0].id,
    }
  }

  return result;
}
