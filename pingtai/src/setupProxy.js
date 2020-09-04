const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy("/api", {
      // target: 'http://192.168.8.71:19700',  
      target: 'https://ts.cvei.cn',  
      changeOrigin: true,
    }),
  );
/*  app.use(
    proxy('/api',{
      target:'http://192.168.1.9:19700'
    })
  )*/
};
