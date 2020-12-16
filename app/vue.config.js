//配置vue项目---注意事项:修改完配置文件需要重新启动项目才能生效
module.exports = {
  publicPath: './',
  devServer: {
    // host: "localhost"
    host: '0.0.0.0',
    port: '9527',
    open: true, //自动在浏览器地址栏中打开项目
    proxy: {
      //配置跨域请求
      '/api': {
        //以后再使用数据请求的时候用 /api 代替  https://x.dscmall.cn/api
        target: 'https://x.dscmall.cn/api', //配置要代理的域名
        changeOrigin: true, //允许跨域
        pathRewrite: {
          //路径重写
          '^/api': '',
        },
      },
    },
  },
};
