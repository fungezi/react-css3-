---
## 基于reactjs的个人博客静态页面，练手。

### 开始

    //安装依赖
    npm install 
    
    //开发环境
    1.npm start
    2.open localhost:3000/react-blog
    
    //生产环境，dist目录
    npm run build 
    
    //js代码规格检测
    npm run eslint

### 框架 / 类库

+ [react](https://github.com/facebook/react)
+ [redux](https://github.com/reactjs/redux)
+ [react-redux](https://github.com/reactjs/react-redux)
+ [react-router](https://github.com/reactjs/react-router)
+ [react-router-redux](https://github.com/reactjs/react-router-redux)
+ [immutable](https://facebook.github.io/immutable-js/)
+ [normalizr](https://github.com/gaearon/normalizr)
+ [classnames](https://www.npmjs.com/package/classnames)
+ [react-markdown-to-html](https://www.npmjs.com/package/react-markdown-to-html)
+ [font-awesome](https://fortawesome.github.io/Font-Awesome/)

### 工具

+ [webpack](https://github.com/webpack/webpack)
+ [webpack-config](https://github.com/mdreizin/webpack-config)
+ [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
+ [babel-loader](https://github.com/babel/babel-loader)
+ [style-loader](https://github.com/webpack/style-loader)
+ [css-loader](https://github.com/webpack/css-loader)
+ [sass-loader](https://github.com/jtangelder/sass-loader)
+ [postcss-loader](https://github.com/postcss/postcss-loader)
+ [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin)
+ [markdown-it-loader](https://www.npmjs.com/package/markdown-it-loader)


### 配置文件说明

1. webpack.base.config.js，生产和开发环境共用配置
2. webpack.dev.config.js，开发环境配置
3. webpack.prod.config.js，生产环境配置