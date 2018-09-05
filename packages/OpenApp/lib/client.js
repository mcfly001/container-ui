/**
 * Created by zyj on 2017/12/20.
 */

const UA = window.navigator.userAgent
const iosVersion = /OS\s+(\d+)_(\d+)/
const isIos = /(iPhone|iPod|iPad);?/i.test(UA)
const isAndroid = /android/i.test(UA)
const isInWeiXin = UA.toLowerCase().match(/MicroMessenger/i) == "micromessenger"
const isQQ = UA.match(/QQ\//i) == "QQ/"
const isDingDing = UA.match(/DingTalk/i) == 'DingTalk'

export {
  iosVersion,
  isIos,
  isAndroid,
  isInWeiXin,
  isQQ,
  isDingDing
}