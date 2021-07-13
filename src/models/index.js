// 通过webpack的依赖管理实现全models加载

// request 含有表达式(expressions)，就会创建一个上下文(context)--导入单个模块
let moduleOne = require('./example')
console.log(moduleOne)

// require.context(request) 函数来创建自己的 context。-- 导入多个模块
// 函数传入三个参数：一个要搜索的目录，一个标记表示是否还搜索其子目录， 以及一个匹配文件的正则表达式。
// require.context()返回值为一个require函数:含有resolve, keys, id属性
let allModule = require.context('./',false,/^.*\.js$/)
console.dir(allModule)
console.log(allModule.keys()) //  require.keys() 返回所有加载模块的key
console.log(allModule.resolve('./example.js')) // require.resolve(key) 解析改模块得到的 id
console.log(allModule.id) // require.id 被解析后得到的模块 id
console.log(allModule('./example.js')) // require.(key) 解析改模块加载得到值

let allModuleObj = allModule.keys().filter(item=> item !== './index.js').map(key=> allModule(key))
console.log(allModuleObj)

export default allModuleObj
export const aaa = 111;