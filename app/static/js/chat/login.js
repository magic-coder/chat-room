$(document).ready(function() {

  // 登录按钮
  $('.js-button-login').on('click', function(ev) {
    ev.stopPropagation();
    var isValidate = true;
    var userName = $('.js-name').val().trim();
    var password = $('.js-password').val().trim();

    if (userName === '') {
      alert('请输入用户名');
      return;
    } else if (password === '') {
      alert('请输入密码');
      return;
    } else {
      sendRequestLogin(userName, password, function(res) {
        if (res.success) {
          window.location.replace(res.redirectUrl);
        } else {
          alert(res.msg);
        }
      }, function() {
        alert('登录失败');
      });
    }
  });


  // 登录请求
  function sendRequestLogin(userName, password, successCallback, errorCallback, completeCallback) {
    const loginUrl = '/chat/login';
    const data = {
      userName: userName,
      password: password,
    }

    $.ajax({
      url: loginUrl,
      method: 'POST',
      async: false,
      data: data,
      complete: function(result) {
        completeCallback && completeCallback(result);
      },
      success: function(res) {
        successCallback && successCallback(res);
      },
      error: function(err) {
        errorCallback && errorCallback(err);
      },
    });
  }


});