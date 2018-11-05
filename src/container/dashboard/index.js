import React from 'react'
import { NavBar } from 'antd-mobile'
import {Switch, Route} from 'react-router-dom'

import TabLinkBar from '../../component/tab-link-bar'
import './index.styl'
import UserList from '../../component/user-list'
import Message from '../../component/message'
import Mine from '../../component/mine'
function Home () {
  return (
    <h2>首页</h2>
  )
}
function Friend () {
  return (
    <h2>朋友</h2>
  )
}
class Dashboard extends React.Component {
  render () {
    const pathname = this.props.location.pathname
    const pathArr = {
      1: '/home',
      2: '/list',
      3: '/message',
      4: '/friend',
      5: '/mine'
    }
    const navList = [
      {
        path: pathArr[1],
        title: '首页',
        icon: 'job-chat-web-icon-shouye',
        component: Home,
        select: pathname === pathArr[1] ? true : false
      },
      {
        path: pathArr[2],
        title: '人员列表',
        icon: 'job-chat-web-icon-info',
        component: UserList,
        select: pathname === pathArr[2] ? true : false
      },
      {
        path: pathArr[3],
        title: '消息列表',
        icon: 'job-chat-web-icon-test',
        component: Message,
        select: pathname === pathArr[3] ? true : false
      },
      {
        path: pathArr[4],
        title: '朋友',
        icon: 'job-chat-web-icon-tongxunlu',
        component: Friend,
        select: pathname === pathArr[4] ? true : false
      },
      {
        path: pathArr[5],
        title: '我',
        icon: 'job-chat-web-icon-weibiaoti1',
        component: Mine,
        select: pathname === pathArr[5] ? true : false
      }
    ]
    return (
      <div className='dashboard'>
        <NavBar className='fixed-header' mode='dark'>{navList.find(v => v.path === pathname).title}</NavBar>
        <div className='container'>
          <Switch>
            {navList.map(v => (
              <Route key={v.path} path={v.path} component={v.component}></Route>
            ))}
          </Switch>
        </div>
        <TabLinkBar className='fixed-footer' data={navList}></TabLinkBar>
      </div>
    )
  }
}
export default Dashboard