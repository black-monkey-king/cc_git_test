import dva from 'dva';
import './index.css';

// import和require,webPack都能解析加载全部模块,然而require更实用,import只能第一在头部
import allM from './models'
let allModels = require('./models/index').default
console.log(allM,allModels)

// 1.dva 首先是一个基于 redux 和 redux-saga 的数据流方案
// 2.dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架
// 3.elm 概念，通过 reducers, effects 和 subscriptions 组织 model
// 4.插件机制，比如 dva-loading 可以自动处理 loading 状态，不用一遍遍地写 showLoading 和 hideLoading
// 5.支持 HMR，基于 babel-plugin-dva-hmr 实现 components、routes 和 models 的 HMR(热重载)

// dva 基于 redux 和 redux-saga 的数据流方案,而且自带的router和fetch
// 此项目为通过dva cli脚手架创建的项目,不同于create-react-app所创建的项目.
// 项目创建时已经绑定了root元素,不需要(但是可以)手动ReactDOM.render(根react元素,根dom)

// 1. Initialize 
// opts: history(路由模式)),initialState(store处室数据,优先级高于 model 中的 state),各类hooks
const app = dva();

// 2. Plugins 
// 配置 hooks 或者注册插件。（插件最终返回的是 hooks ）
// app.use({});

// 3. Model
// 导入并挂载model,可以多个一并挂载,注意model的namespace挂载时候不能重复
// app.model(require('./models/example').default); // 单模块挂载
require('./models/index').default.forEach(item=> app.model(item.default) ); // 多模块挂载

// 4. Router
app.router(require('./router').default);

// 5. Start
// 将虚拟dom挂载的根节点dom,无需手动挂载ReactDOM.render()
app.start('#root');
