import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import { Route, HashRouter, Switch } from 'react-router-dom'

// import api from './api'
import AuthRoute from './component/authroute'
import reducers from './redux/reducers/index'
// 登录页面
// import Login from './container/login/'
// 注册页面
// import Register from './container/register/'
// 领导详情页面
import LeaderInfo from './container/leaderinfo'
// 普职人员页面
import ClerkInfo from './container/clerkinfo'
// 登录之后的页面
import DashBoard from './container/dashboard'
import UserStart from './container/user-start'
import Chat from './container/chat'
import './assets/stylus/common.styl'
import './assets/css/common.css'
const reduxDevtools = window.devToolsExtension ? window.devToolsExtension : () => {}
let store
if(process.env.NOT_ENV!=="production"&&window.devToolsExtension){
  store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxDevtools()
  ))
}else{
  store = createStore(reducers, compose(
    applyMiddleware(thunk)
  ))
}
function Other () {
  return <h2>其它页面</h2>
}
ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div className='main'>
        <AuthRoute />
        {/* Switch 匹配到一个下面就不管了 */}
        <Switch>
        <Route exact={true} path='/' />
        <Route path='/leaderinfo' component={LeaderInfo} />
        <Route path='/clerkinfo' component={ClerkInfo} />
        <Route path='/login' component={UserStart} />
        <Route path='/register' component={UserStart} />
        <Route path='/chat/:user' component={Chat} />
        {/* <Route path='/login' component={Login} /> */}
        <Route path='/other' component={Other} />
        {/* <Route path='/register' component={Register} /> */}
        <Route component={DashBoard} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)