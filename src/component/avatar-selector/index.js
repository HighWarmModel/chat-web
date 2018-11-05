import React from 'react'
import { Grid } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import PropTypes from 'prop-types' // 属性检测

import './index.styl'
import draw from '../../assets/js/bg'
import '../../assets/font/iconfont.css'
class AvatarSelector extends React.Component {
  static propTypes = {
    handleGetAvatar: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      show: false,
      avatar: ''
    }
    this.showAvatorFunc = this.showAvatorFunc.bind(this)
    this.getAvatarFunc = this.getAvatarFunc.bind(this)
  }
  componentDidMount() {
    // 背景特效
    let canvas = document.getElementById("canvas")
    let w = canvas.width
    let h = canvas.height
    let can = canvas.getContext("2d")
    this.interval = setInterval(() => {draw(canvas, can, w, h)}, 50);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  // 显示隐藏头像组件
  showAvatorFunc () {
    this.setState({
      show: !this.state.show
    });
  }
  // 点击选择头像
  getAvatarFunc (obj) {
    this.setState({
      show: !this.state.show,
      avatar: obj.id
    })
    // 调用父级选中头像方法 进行头像传值
    this.props.handleGetAvatar(obj.id)
  }
  render () {
    const avatarList = ['518813', '518814', '518815', '518816', '518817'
    , '518818', '518819', '518820', '518821', '518822', '518823', '518824'
    , '536978', '536979', '536980', '536982', '536983', '561187', '561188'
    , '561189', '561190', '561191', '561192', '561193', '561194', '561195'
    , '561196', '561197', '561198']
    const data = Array.from(avatarList, v => ({
      icon: require(`../../assets/img/${v}.png`),
      text: '',
      id: v
    }))
    return (
      <div className='avatar-selector'>
      <canvas id='canvas' className='bg-canvas'></canvas>
        <div className='avatar-selector-top'>
          <div className='head-img' onClick={this.showAvatorFunc}>
            <img className='job-chat-web-icon-touxiang2-copy job-chat-web-iconfont' src={this.state.avatar === '' ? '' : require(`../../assets/img/${this.state.avatar}.png`)} alt='加载中'/>
          </div>
        </div>
        <QueueAnim type='scaleX'>
         {this.state.show ? <div key="a" className='head-img-chose'>
          <div className='head-img-chose-container'>
            <div className='title'>
              <span className='title-name'>选择头像</span>
              <span className='title-control'></span>
            </div>
            <Grid data={data}
            activeStyle={{backgroundColor: 'blue'}}
            onClick={this.getAvatarFunc}
            columnNum={5}
            renderItem={dataItem => (
              <div className='avatar-selector-img-container'>
                <img src={dataItem.icon} alt="" />
              </div>
            )}
            />
          </div>
        </div> : null }
       </QueueAnim>
       <QueueAnim type='alpha'>
          {this.state.show ? <div key="a" className='mark' onClick={this.showAvatorFunc}></div> : null }
      </QueueAnim>
    </div>
    )
  }
}
export default AvatarSelector