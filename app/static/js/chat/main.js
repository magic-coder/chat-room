$(document).ready(function() {

  // 底部菜单
  $('.js-dropdown-toggle').on('click', function(ev) {
    ev.stopPropagation();
    $('.chat__enter').removeClass('focus');

    var target = $(this).attr('data-dropdown-target');
    var $allTarget = $('[data-dropdown-name]');
    var $target = $('[data-dropdown-name='+ target +']');
    var expanded = $target.attr('aria-expanded');
    var isExpanded = expanded === 'true';

    $allTarget.hide().attr({
      'aria-expanded': 'false',
    });

    if (isExpanded) {
      $target.hide().attr({
        'aria-expanded': 'false',
      });
    } else {
      $target.show().attr({
        'aria-expanded': 'true',
      });
    }
  });

  // 高亮输出区域
  $('.js-textarea').on('click', function(ev) {
    ev.stopPropagation();
    $(this).parents('.chat__enter').addClass('focus');

    var $allTarget = $('[data-dropdown-name]');
    $allTarget.hide().attr({
      'aria-expanded': 'false',
    });
  });

  // 点击空白
  // 关闭全部二级菜单; 
  $(document).on('click', function() {
    var $allTarget = $('[data-dropdown-name]');
    $allTarget.hide().attr({
      'aria-expanded': 'false',
    });

    $('.chat__enter').removeClass('focus');
  }); 




  /* // 退出
  $('.js-logout').on('click', function() {
    cookie.del('sessionKey');
    window.location.reload();
  }); */

});


// Cookit 操作
var cookie = {
  get: function(name) {
    var arr,
        reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
     return unescape(arr[2]);
    } else {
      return null;
    }
  },
  del: function(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.get(name);
    if (cval != null) {
      document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    }
  }
};
