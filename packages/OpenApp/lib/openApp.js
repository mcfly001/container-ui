/**
 * Created by zyj on 2017/12/19.
 */

import {isIos, isAndroid} from './client'

const openApp = (appurl, iosurl, androidurl, getLatestAndroidUrl) => {
  if(isIos){
    let loadDateTime = new Date()
    window.setTimeout(function() {
      let timeOutDateTime = new Date()
      if(timeOutDateTime - loadDateTime < 2000) {
        window.location = iosurl // ios客户端下载地址
      } else {
        window.close()
      }
    }, 500)
    window.location = appurl
  }
  else if(isAndroid) {
    let openTime = new Date()
    let ifr = document.createElement('iframe')
    ifr.style.cssText = "display:none;width:0px;height:0px"
    ifr.src = appurl
    document.body.appendChild(ifr)
    window.setTimeout(function () {
      document.body.removeChild(ifr)
      if (new Date() - openTime < 1500) {
        if (androidurl) {
          window.location = androidurl // 安卓客户端下载地址
          return
        }
        getLatestAndroidUrl(function (url) {
          window.location = url // 安卓客户端下载地址
        })
      }
    }, 1000)
  }
}

export default openApp
