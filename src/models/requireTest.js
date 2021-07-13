import request from '../utils/request';
async function Request(options) {
  const {url, ...res} = options;
  return request(url, res);
}
export const delay = (ms,action )=> new Promise(resolve => 
  setTimeout(()=>{
    action.user = action.user+'11';
    resolve(action)
  }, ms)
);

export default {
  namespace: 'requireTest',
  state: {
    number:0,
    userInfo:{
      user:['ya'],
      isFetching:false,
      userData:{},
      error:null
    },
    userData:'hahahah'
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },
  effects: {
    // effcts中的函数提供两个参数,action和saga对象中所有参数
    *asyncAddUser(action,sageParams){
      console.log(action,sageParams)
      let {call,put} = sageParams
      let {user,cb} = action
      // call处理后的,调用的promise函数,返回不再是promise类型了
      const response = yield call(delay,1000,action);
      console.dir(response)
      if(typeof cb === 'function') {cb();}
      yield put({
        type: 'addUser',
        user: response.user
      });
    },
    *getUserData(action,{put,call}){
      const response = yield call(Request, action.payload.options);
      yield put({
        type: 'changeUserData',
        userData: response.user
      });
    }
  },
  // 需要保证数据的不可变性
  reducers: {
    addNumber(state, action) {
      return { ...state, number:state.number + action.num }
    },
    reducerNumber(state, action) {
      return { ...state, number:state.number - action.num }
    },
    addUser(state,action){
      state.userInfo.user = state.userInfo.user .concat(action.user)
      return {...state}
    },
    changeUserData(state,action){
      return {...state}
    }
  },
};
