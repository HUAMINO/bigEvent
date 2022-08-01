function getUserInfo(){
    if(!localStorage.getItem('Authorization')){
        location.href = '../login/login.html'
    }
    $('#login').on('click',function(){
        localStorage.setItem('Authorization','');
        location.href = '../login/login.html';
    })
    axios({
        method:'get',
        url:'/my/userinfo',
       
    })
    .then(res=>{
        if(res.data.status === 0){
            let {username, nickname,user_pic} = res.data.data;

            let x = null;
            if(user_pic){
                $('.layui-nav-img').attr('src',user_pic).show();
                $('.user-span').hide();
    
            }else if(nickname){
                x = nickname.slice(0,1);
                $('.layui-nav-img').attr('src',user_pic).hide();
                $('.user-span').html(x).show();
            }else{
                x = username.slice(0,1);
                $('.layui-nav-img').attr('src',user_pic).hide();
                $('.user-span').html(x).show();

            }
            if(nickname){
                $('.username').html(nickname)
            }else{
                $('.username').html(username);

            }
           
        }else{
            layer.msg('未登录');
            location.href = '../login/login.html';
        }
    })
    .catch(err=>{
        layer.msg('网络异常')
        
    })
}
getUserInfo();