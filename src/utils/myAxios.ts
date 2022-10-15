import axios from "axios";
import {notification} from 'antd'
const cookie = {
  read: function read(name:string) {
    var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
    return match ? decodeURIComponent(match[3]) : null;
  }
};



function getBaseUrl(apiUrl:string) {
  // console.log()
  //   const env = cookie.read('env') || '';
  //   const baseURL = "http://localhost:8000/".concat(apiUrl);
  
  //   if (env && env !== 'prod') {
  //     const baseURL = "http://localhost:8000/".concat(apiUrl);
  //   }
    return `${process.env.REACT_APP_baseURL}/`.concat(apiUrl);
  }

const axiosObejct = axios.create({
  timeout: 12000,
  responseType: 'json',
  withCredentials: false,
  validateStatus:  (status) => (status >= 100 && status < 600) // status >= 100 && status < 600; 都从 resolve 获取
});

// req拦截器
axiosObejct.interceptors.request.use(function (config) {
  config.headers = Object.assign(config.headers ? config.headers : {}, {
    // 'app-id': '1314520',
    // 'app-platform': 'web'
  });
  return config;
});

// res拦截器
axiosObejct.interceptors.response.use( 
  response => response,
  error => Promise.reject(error) // reject这个错误信息 让catch捕获 /
);

function myRequest(apiName: string, data?: object, option?: object, getCookieArr?: Array<string>) {
    let result:any;
    return new Promise(function (resolve, reject) {
        axiosObejct({
          method: 'POST',
          url: getBaseUrl(apiName),
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          },
          data,
          ...option
        }).then(function (res) {
          let data = res.data;

          if (data.success) {
            //网关
            if (data.result.success) {
              //业务
              if (data.result.hasOwnProperty('result')) {
                resolve({
                  success: true,
                  result: data.result.result,
                  code: 200,
                  message: '请求成功'
                });
              } else {
                resolve({
                  success: true,
                  result: data.result,
                  code: 200,
                  message: '请求成功'
                });
              }
            } else {
              var _data$result, _data$result$error, _data$result2, _data$result3, _data$result3$error, _data$result4;

              resolve({
                success: false,
                result: data.result,
                code: (data === null || data === void 0 ? void 0 : (_data$result = data.result) === null || _data$result === void 0 ? void 0 : (_data$result$error = _data$result.error) === null || _data$result$error === void 0 ? void 0 : _data$result$error.code) || ((_data$result2 = data.result) === null || _data$result2 === void 0 ? void 0 : _data$result2.code) || 0,
                message: (data === null || data === void 0 ? void 0 : (_data$result3 = data.result) === null || _data$result3 === void 0 ? void 0 : (_data$result3$error = _data$result3.error) === null || _data$result3$error === void 0 ? void 0 : _data$result3$error.message) || (data === null || data === void 0 ? void 0 : (_data$result4 = data.result) === null || _data$result4 === void 0 ? void 0 : _data$result4.message) || '系统异常'
              });
            }
          } else {
            return Promise.reject(res)
          }
        }).catch(function (error) {
          var message = '系统异常';
          var code = -1000;
          if (error?.message?.includes('timeout')) {
            message = '接口请求超时';
            code = -9999;
          }
          if( error?.data && error.status){
            message = error.data;
            code = error.status;
          }

          result = {
            success: false,
            code: code,
            message: message,
            result: {}
          };


          notification.error({
            message: result.code,
            description:result.message,
            duration: 2.8,
          })
          resolve(result); 
        });
    });
}

export default myRequest