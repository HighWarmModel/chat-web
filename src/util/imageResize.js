// (function (global, factory) {
//   typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (window.imageResizeTools = factory())
// }(this, function () {
//   'use strict'

var methods = {}

/* 通过一个图片的url加载所需要的图片对象
 * url参数传入图片的url
 * fn为回调方法包含，一个Image对象的参数
 */
methods.urltoImage = function (url, fn) {
  var img = new Image()
  img.src = url
  img.onload = function () {
    fn(img)
  }
}

/* 将一个Image对象转变为一个Canvas类型对象
 * image参数传入一个Image对象
 */
methods.imagetoCanvas = function (image) {
  var cvs = document.createElement('canvas')
  var ctx = cvs.getContext('2d')
  cvs.width = image.width
  cvs.height = image.height
  ctx.drawImage(image, 0, 0, cvs.width, cvs.height)
  return cvs
}

/* 将一个Canvas对象压缩转变为一个Blob类型对象
 * canvas参数传入一个Canvas对象
 * quality参数传入一个0-1的number类型，表示图片压缩质量
 * fn为回调方法，包含一个Blob对象的参数
 */
methods.canvasResizetoFile = function (canvas, quality = 1, fn, type = 'image/jpeg') {
  canvas.toBlob(function (blob) {
    fn(blob)
  }, 'image/jpeg', quality)
}

/* 将一个Canvas对象压缩转变为一个dataURL字符串
 * canvas参数传入一个Canvas对象
 * quality参数传入一个0-1的number类型，表示图片压缩质量
 */
methods.canvasResizetoDataURL = function (canvas, quality) {
  return canvas.toDataURL('image/jpeg', quality)
}

/* 将File（Blob）类型文件转变为dataURL字符串
 * file参数传入一个File（Blob）类型文件
 * fn为回调方法，包含一个dataURL字符串的参数
 */
methods.filetoDataURL = function (file, fn) {
  var reader = new FileReader()
  var type = file.type
  reader.onloadend = function (e) {
    fn(e.target.result, type)
  }
  reader.readAsDataURL(file)
}

/* 将一串dataURL字符串转变为Image类型文件
 * dataurl参数传入一个dataURL字符串
 * fn为回调方法，包含一个Image类型文件的参数
 */
methods.dataURLtoImage = function (dataurl, fn) {
  var img = new Image()
  img.onload = function () {
    fn(img)
  }
  img.src = dataurl
}

/* 将一串dataURL字符串转变为Blob类型对象
 * dataurl参数传入一个dataURL字符串
 */
methods.dataURLtoFile = function (dataurl) {
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {
    type: mime
  })
}

// 缩小图片进行图片压缩
methods.canvasImageResize = function (img, width, height) {
  // 缩放图片需要的canvas
  var canvas = document.createElement('canvas')
  var context = canvas.getContext('2d')
  // 图片原始尺寸
  var originWidth = img.width
  var originHeight = img.height
  // 最大尺寸限制
  var maxWidth = width
  var maxHeight = height
  // 目标尺寸
  var targetWidth = originWidth
  var targetHeight = originHeight
  // 图片尺寸超过400x400的限制
  if (originWidth > maxWidth || originHeight > maxHeight) {
    if (originWidth / originHeight > maxWidth / maxHeight) {
      // 更宽，按照宽度限定尺寸
      targetWidth = maxWidth
      targetHeight = Math.round(maxWidth * (originHeight / originWidth))
    } else {
      targetHeight = maxHeight
      targetWidth = Math.round(maxHeight * (originWidth / originHeight))
    }
  }

  // canvas对图片进行缩放
  canvas.width = targetWidth
  canvas.height = targetHeight
  // 清除画布
  context.clearRect(0, 0, targetWidth, targetHeight)
  // 图片压缩
  context.drawImage(img, 0, 0, targetWidth, targetHeight)
  return canvas
}

/** *以下是进一步封装***/

/* 将File（Blob）类型文件压缩后再返回Blob类型对象
 * file参数传入一个File（Blob）类型文件
 * quality参数传入一个0-1的number类型，表示图片压缩质量
 * fn为回调方法，包含一个Blob类型文件的参数
 * 使用示例：
 * var file = document.getElementById('demo').files[0];
 * imageResizeTool.fileResizetoFile(file,0.6,function(res){
 *     console.log(res);
 *     //做出你要上传的操作；
 * })
 */
methods.fileResizetoFile = function (file, fn, quality, width, height) {
  methods.filetoDataURL(file, function (dataurl, type) {
    methods.dataURLtoImage(dataurl, function (image) {
      if (width && height) {
        methods.canvasResizetoFile(methods.canvasImageResize(image, width, height), quality, fn, type)
      } else {
        methods.canvasResizetoFile(methods.imagetoCanvas(image), quality, fn, type)
      }
    })
  })
}
const imageResizeTool = methods
export default imageResizeTool
// }))
