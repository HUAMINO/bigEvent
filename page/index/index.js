function getUserInfo(){
    if(!localStorage.getItem('Authorization')){
        location.href = '../login/login.html'
    }
    axios({
        method:'get',
        url:'http://big-event-api-t.itheima.net/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('Authorization'),
        },
       
    })
    .then(res=>{
        if(res.data.status === 0){
            let {username} = res.data.data;
            $('.username').html(username)
        }else{
            layer.msg('未登录');
            location.href = '../login/login.html';
            $('.username').html(username)
        }
    })
    .catch(err=>{
        layer.msg('网络异常')
        
    })
}
getUserInfo();