import axios from 'axios'


axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'text/plain;charset=UTF-8'
let baseURL = ''
if(process.env.NODE_ENV == "development"){
  if (process.server) {
    baseURL = 'http://localhost:9093/api/'  //设置通用的请求地址
  }else{
    baseURL = '/api'
  }
}else{
    baseURL = 'https://www.fancystore.cn/api/'  //设置通用的请
}

let http = axios.create({
   baseURL,
   timeout: 10000
})

 // 请求拦截 可在请求头中加入token等
 http.interceptors.request.use(config => {

  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截 对响应消息作初步的处理
http.interceptors.response.use(resp => {
  if (resp.data) {
    if (resp.data.code !== 0) {
      
    }
    return resp
  } else {
    return resp
  }
}, error => {
  if (error.response) {
    switch (error.response.states) {
      case 400: {
        if (error.response && error.response.data && error.response.data.message) {
          
        }
        break
      }
    }
  }
})

export default http
