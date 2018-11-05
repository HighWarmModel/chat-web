import React from 'react'
import { NavBar } from 'antd-mobile'

// 选择头像组件
import AvatarSelector from '../../component/avatar-selector'
// 完善普通职员页面
class ClerkInfo extends React.Component {
  // constructor (props) {
  //   super(props)
  // }
  render () {
    return (
      <div>
        <NavBar mode="dark">信息完善</NavBar>
        <AvatarSelector />
      </div>
    )
  }
}
export default ClerkInfo