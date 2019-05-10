import axios from 'axios'
// 不需要token
const loginreq = (method, url, params) => {
  return axios({
    method: method,
    url: url,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: params,
    traditional: true,
    transformRequest: [
      function(data) {
        let ret = ''
        for (let it in data) {
          ret +=
              encodeURIComponent(it) +
              '=' +
              encodeURIComponent(data[it]) +
              '&'
        }
        return ret
      }
    ]
  }).then(res => res.data);
};

// 需要token
const req = (method, url, params) => {
  return axios({
    method: method,
    url: url,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: params,
    traditional: true,

    // 发送之前改变请求数据
    //transformRequest allows changes to the request data before it is sent
    transformRequest: [
      function(data) {
        let ret = ''
        for (let it in data) {
          ret +=
            encodeURIComponent(it) +
            '=' +
            encodeURIComponent(data[it]) +
            '&'
        }
        return ret
      }
    ]
  }).then(res =>{ 
    return res.data
  });
};

export {
  req,
  loginreq
}