import request from '../utils/request';
async function Request(options) {
  const {url, ...res} = options;
  return request(url, res);
}

function loadImage(url) {
  return new Promise((resolve, reject)=>{
    const img = new Image();
    img.onload = function () {
      resolve(img);
    };
    img.onerror = reject;
    img.src = url;
  })
};

function asyncLoadImages(urls) {
  return urls.reduce((promise, url)=>{
    return promise
      .then(()=>{
        return loadImage(url);
      })
      .then((res)=>{console.log(res);console.log(url + ': loaded completed!')});

  }, Promise.resolve())
}

// model是基于redux和saga的实现,在model中无需单独的建立action文件夹,来连接 ui和store
export default {
  namespace: 'commonModel',
  state: {
    remote: [],
    loading: true
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const {options, cb} = payload;
      const response = yield call(Request, {...options});
      const {data} = response;
      const urls = data.map((item, index)=>{
        return item.urls.regular;
      });
      const result = data.map((item, index)=>{
        return {
          bg: item.urls.regular,
          title: "Page " + (index + 1),
          description: 'What amazing about this!',
          content: "I'm page content!"
        };
      });
      yield call(asyncLoadImages, urls);
      if(typeof cb === 'function') {cb();}
      yield put({
        type: 'save',
        payload: {
          remote: result,
          loading: false
        }
      });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
