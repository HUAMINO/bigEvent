

// 拦截器执行流程：只要html页面引入了apiBase.js，通过axios发送的所有ajax请求都会自动触发拦截器
// 在某个页面中使用axios()发生ajax请求 
// ------------- 先触发请求拦截器里的第一个方法 
// --------拿到return config发送ajax请求 
// -----------浏览器拿到响应
// -----------触发响应拦截器（如果请求成功触发第一个函数，失败触
// 发第二个函数）
// -------- 触发页面中axios()的then里的函数或catch()里的函数

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
         console.log(config);
    // 在发送请求之前做些什么
        let token = localStorage.getItem('Authorization');
        if(config.url.startsWith('/my')&&!token){
          location.href = '/page/login/login.html'
          return
        }
      
        config.url = 'http://big-event-api-t.itheima.net' + config.url
        config.headers.Authorization = token;
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
// 添加响应拦截器  当浏览器拿到响应后都会先自动调用这个方法，然后再调用then或catch里的方法
axios.interceptors.response.use(
  function (response) {
    // 只要url路径以 /my 开头的，但是又没有token的，通通跳转到登录页面
    if (
      response.data.status === 1 &&
      response.data.message === '身份认证失败！'
    ) {
      localStorage.removeItem('token')
      location.href = '/page/login/login.html'
      return
    }
    // 放行
    return response
  },
  function (error) {
    layer.msg('网络异常，请稍后再试')
    // 对响应错误做点什么
    return Promise.reject(error)
  },
)