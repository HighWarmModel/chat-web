import React from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'
import {withRouter} from 'react-router-dom'

class TabLinkBar extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }
  render () {
    const {pathname} = this.props.location
    return (
      <div className={this.props.className}>
        <TabBar tintColor='#108ee9'
        tabBarPosition='bottom'
        >
          {this.props.data.map(v => (
            <TabBar.Item 
            title={v.title}
            key={v.path}
            icon={
              <div className={ClassNames(v.icon, 'job-chat-web-iconfont', 'tab-item-container')}></div>
            }
            selectedIcon={
              <div className={ClassNames(v.icon, 'job-chat-web-iconfont', 'tab-item-container')}></div>
            }
            selected={pathname === v.path}
            onPress={() => (pathname === v.path ? null : this.props.history.push(v.path))}
            ></TabBar.Item>
          ))}
        </TabBar>
      </div>
    )
  }
}
export default withRouter(TabLinkBar)