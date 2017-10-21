$(document).ready(function() {

  const $chatContent = $('.chat__content');
  const chat = io.connect('/');

  chat.on('connect', function() {
    console.log("Connected to WebSocket server.");

    // To Server: 加入
    chat.emit('chat join');


    // Re Server: 新人加入提示
    chat.on('chat join new user', function(data) {
      console.log('data =>>', data);
      const noticeHtml = `<div class="chat__notice">
            <span>系统信息：${data.nickname}已加入群聊</span>
        </div>`;
      $chatContent.append(noticeHtml);

      setScrollBottom();
    });


    // Re Server: 退出提示
    chat.on('chat sign out user', function(data) {
      console.log('sign out user =>>', data);
      const noticeHtml = `<div class="chat__notice">
            <span>系统信息：${data.nickname}退出群聊</span>
        </div>`;
      $chatContent.append(noticeHtml);

      setScrollBottom();
    });


    // Re Server: 发送信息
    chat.on('chat receive message', function(data) {
      console.log('receive message =>>', data);

      const position = cookie.get('sessionKey') === data.id ? 'right' : 'left';
      const messageHtml = `<div class="chat__message" data-position="${position}">
          <div class="chat__message__avatar">
              <img src="${data.avatar}" />
          </div>
          <div class="chat__message__content">${data.message}</div>
      </div>`;

      $chatContent.append(messageHtml);

      setScrollBottom();
    });
    

  });


  // 发送信息
  
  $('.js-send').on('click', function() {
    sendMessage(chat);    
  });
  $(document).keydown(function(event){
    if(event.keyCode == 13){
      sendMessage(chat);
    }
  });





  // 退出用户
  $('.js-logout').on('click', function() {
    // To Server: 退出
    chat.emit('chat sign out');

    // 删除 cookie; 重新刷新页面;
    cookie.del('sessionKey');
    window.location.reload();
  });

});


/**
 * 发送信息
 * 
 * @returns 
 */
function sendMessage(ws) {
  const $messageTextarea = $('.js-textarea');
  const message = $messageTextarea.val().trim()
  if (message === '') {
    return;
  }

  // To Server: 发信息
  ws.emit('chat send message', {
    message: message,
  });
  $messageTextarea.val('');
}


/**
 * 设置滚动条到底部
 * 
 */
function setScrollBottom() {
  const $wrapper = $('.chat__content__wrapper');
  const $content = $('.chat__content');
  const contentHeight = $content.height();
  const contentMaxHeight = $wrapper.height();
  const scrollTop = $content.scrollTop();
  
  if (contentHeight > contentMaxHeight) {
    console.log(contentHeight - contentMaxHeight);
    $wrapper.scrollTop(contentHeight - contentMaxHeight);
  }

}