
export default {
  
  namespace: 'example',

  state: {
    aaa:1,
    bbb:'ahahah',
    ccc:false,
    ddd:{a:111,b:222}
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};

export let  a = 111
export let  b = 222
const c = 3333
const d = 4444
export {
  c,d
}