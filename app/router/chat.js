const util = require('../utils/util');
const modulesUser = require('../models/user');
const modulesChat = require('../models/chat');


/**
 * 登录 模块
 * 
 * @param {any} req 
 * @param {any} res 
 * @returns 
 */
exports.login = function(req, res) {

  const requestMethod = req.method;

  // 登录操作
  if (requestMethod === 'POST') {
    const user = req.body;
    const loginResult = modulesUser.checkLogin(user.userName, user.password);

    if (loginResult.success) {
      // 登录成功
      res.cookie('sessionKey', loginResult.id, { maxAge: 24 * 60 * 1000 });
      res.send(Object.assign({}, loginResult, {
        redirectUrl: '/chat',
      }));
    } else {
      // 登录失败
      res.send(loginResult);
    }
    return;
  };


  // 登录页面渲染
  if (req.cookies.sessionKey) {
    console.log(req.cookies.sessionKey);
    res.redirect('/chat');
    return;
  } 

  // 随机的图片序号
  const imageIndex = util.randomNum(1, 10);

  res.render('chat-login.html', {
    pageTitle: 'login - websoket',
    user: {
      avatar: '/static/images/'+ imageIndex +'.jpg',
    }
  });

};


/**
 * 聊天室 模块
 * 
 * @param {any} req 
 * @param {any} res 
 * @returns 
 */
exports.index = function(req, res) {

  const userId = req.cookies.sessionKey;

  /****************
   * 未登录
   ****************/ 
  if (!userId) {
    res.redirect('/chat/login');
    return;
  }


  /****************
   * 已登录
   ****************/ 
  // 延迟 Cookie 时间
  res.cookie('sessionKey', userId, { maxAge: 24 * 60 * 1000 });
  // 获取用户信息
  const { id, name, nickname, avatar } = modulesUser.findUser(userId);
  // 获取最近联系人信息
  const chatRecently = modulesChat.getChatRecently();


  res.render('chat.html', {
    pageTitle: 'inde - websoket',
    userInfo: {
      id,
      name,
      nickname,
      avatar,
    },
    chatRecently,
  });

};
