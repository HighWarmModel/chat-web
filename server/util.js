const utils = require('utility')
class WorkerChat {
  // 加密cookie
  static get secret() {
    return 'secret-hhf'
  }
  // 用来防止密码md5暴力反编译
  static md5Pwd (pwd) {
    const salt = 'first-react-2018/07/18!@#$%HaifengHu~~'
    return utils.md5(utils.md5(pwd + salt))
  }
  // 计算周岁
  static getAge (birth) {
    if (new Date(birth) === 'Invalid Date') {
      return -1 // 不是正确的时间格式
    }
  const birthDate = new Date(birth)
  const nowDate = new Date()
  const birthYear = birthDate.getFullYear()
  const birthMonth = birthDate.getMonth()
  const birthDay= birthDate.getDate()

  const nowYear = nowDate.getFullYear()
  const nowMonth = nowDate.getMonth()
  const nowDay= nowDate.getDate()
  if (new Date(nowDate) - new Date(birthDate) >= 0) {
    let years = nowYear - birthYear
    let months = nowMonth - birthMonth
    let days = nowDay - birthDay
    if ((months === 0 && days > 0) || months > 0) {
      return years
    }
    return years - 1
  } else {
    return -2 // 出生日期超出当前时间日期
  }
  }
}
module.exports = WorkerChat