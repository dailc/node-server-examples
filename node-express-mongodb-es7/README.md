# node-express-mongodb-es7

在上例`mongodb`的基础上使用`es7`

相比浏览器环境，无需转换`require`和`promise`，
因此，直接使用gulp打包即可

```js
// 语法转换
babel-plugin-transform-runtime

// default导出支持
babel-plugin-add-module-exports

// async/await,依赖于  babel-runtime与babel-preset-env
babel-runtime
// 使用env 而不是2015,state-3等，这样可以智能转换
babel-preset-env

```