const chatRecently = require('../data/chatRecently');

const modulesUser = require('../models/user');

exports.getChatRecently = function() {
  const chates = [];

  chatRecently.chates.forEach((chat) => {
    const { id, nickname, avatar } = modulesUser.findUser(chat.userId);
    
    chates.push({
      id,
      nickname,
      avatar,
      latestMsg: chat.latestMsg,
    });
  });

  return chates;
};