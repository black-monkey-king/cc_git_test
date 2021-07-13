
import React, { Component } from 'react';
import { connect } from 'dva';

/* 不需要引入这些并手动挂载
  import { connect, } from 'react-redux'
  import { bindActionCreators } from 'redux';
  import { addNumber,reduceNumber,addUser,asyncAddUser, getUserData } from './actions/action.js' 
*/

class testPage extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    console.log(222222222222222)
    dispatch({
      type: 'requireTest/getUserData',
      payload: {
        options: { // 开启代理proxy,/api对应"https://unsplash.com"
          url: 'http://iwenwiki.com/api/blueberrypai/getChengpinDetails.php',
          method: 'get',
          mode: 'cors',
        },
        cb: this.afterLoaded
      }
    });
  }
  afterLoaded = e => {
    console.log('asyncEnd')
  }
  render() {
    let {dispatch} = this.props;
    let isFetching,isInterErr;
    let showMstg = ()=>{
      if(isFetching){
        return '请求中......'
      }else if(isInterErr){
        return '请求出错请稍后继续....'
      } else {
        return this.props.userData
      }
    }
    return (
      <div>
         <h1 className="jumbotron-heading text-center">这是一个dva测试页面</h1>
         <h1 className="jumbotron-heading text-center">{this.props.number}</h1>
          <p className="text-center">
            <button onClick={()=>{ dispatch({ type:'requireTest/addNumber',num:10}) }} className='btn btn-primary'>increasment</button>  
            <button onClick={()=>{ dispatch({ type:'requireTest/reducerNumber',num:4}) }} className='btn btn-success'>decreasment</button>
          </p>
          <br/>
          <h1 className="jumbotron-heading text-center">{this.props.user}</h1>
          <p className="text-center">
              <button onClick={()=>{ dispatch({ type:'requireTest/addUser',user:'cctest'})  }} className='btn btn-primary'>addUer</button>  
              <button onClick={()=>{ dispatch({ type:'requireTest/asyncAddUser', user:'cchaha', cb:this.afterLoaded}) }} className='btn btn-primary'>asyncAddUser</button>  
          </p>
          <br/>
          <h1 className="jumbotron-heading text-center">{showMstg()}</h1>
          <p className="text-center">
              <button onClick={()=>{ 
                dispatch({
                  type: 'requireTest/getUserData',
                  payload: {
                    options: { // 开启代理proxy,/api对应"https://unsplash.com"
                      url: 'http://iwenwiki.com/api/blueberrypai/getChengpinDetails.php',
                      method: 'get',
                      mode: 'cors',
                    },
                    cb: this.afterLoaded
                  }
                })
               }} className='btn sagaTest'>fetchUserData</button>  
          </p>
      </div>
    );
  }
}

// state上面有app.model()挂载的全部model
const mapStateToProps = (state)=>{
  console.log(state)
  return {
    userData:state.requireTest.userData,
    number:state.requireTest.number,
    user:state.requireTest.userInfo.user
  }
}

// connect 是一个函数，绑定 State 到 View,onnect 方法传入的第一个参数是 mapStateToProps 函数，mapStateToProps 函数会返回一个对象，用于建立 State 到 Props 的映射关系。
// dva中舍弃了action无需mapDistecchToProps,dispatch自己已经挂在到props上了,不用维护action

// 挂载state的方式:
// export default connect(({example,dispatch}) => ({example}))(testPage);
export default connect(mapStateToProps)(testPage) 