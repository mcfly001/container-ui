import axios from 'axios'

const request = function (url, options, headers, onUploadProgress) {
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url,
      headers,
      data: options,
      onUploadProgress
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export default request
