export function utilGetRedirectPath ({type, avatar}) {
  // 根据用户信息 返回跳转地址
  // user.type / leader / clerk
  // 根据是否有头像  返回指定地址
  // user.avatar / leaderinfo / clerkinfo
  let url = (type === 'leader') ? '/leader' : '/clerk'
  if (!avatar) {
    url += 'info'
  } else {
    url = '/mine'
  }
  return url
}