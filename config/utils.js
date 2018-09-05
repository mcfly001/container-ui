const os = require('os')

// 获取本机 ip
const getLocalIp = function () {
  let en0 = os.networkInterfaces().en0
  try{
    for(let i=0; i<en0.length; i++){
      if(en0[i].family === 'IPv4'){
        return en0[i].address
      }
    }
  }
  catch(err){
    return 'localhost'
  }
}

module.exports = {
  getLocalIp
}
