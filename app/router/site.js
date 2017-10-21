exports.index = function(req, res) {

  res.redirect('/chat');
  return;

  res.render('index.html', {
    pageTitle: '首页',
    user: {
      name: 'aui',
      tags: ['art', 'template', 'nodejs'],
    }
  });

};
