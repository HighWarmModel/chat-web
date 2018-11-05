import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Logo from '../../component/logo'
import Login from '../login'
import Register from '../register'
class UserStart extends React.Component {
  render () {
    return (
      <div>
        <Logo/>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
        </Switch>
      </div>
    )
  }
}
export default UserStart