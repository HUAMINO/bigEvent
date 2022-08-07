
//! 1.绑定去登录去注册点击事件
$('#to-register').on('click',function(){
    $('.login-box').hide();
    $('.reg-box').show();
})

$('#to-login').on('click',function(){
    $('.login-box').show();
    $('.reg-box').hide();

})

// ! 通过required属性来验证每个输入框的类容
// 示例
// ! 注册表单验证
var form = layui.form;
form.verify({
   
    username: function(value, item){ //value：表单的值、item：表单的DOM对象
        let reg = /^[a-z\d_-]{2,10}$/i;
        if(reg.test(value) === false){
            return '用户名只能是字母、数组、-_的组合,且是2-10位'

        }
    },
    password: function(value, item){ //value：表单的值、item：表单的DOM对象
        let reg = /^[a-z\d_-]{6,16}$/i;
        if(reg.test(value) === false){
            return '密码只能是数字和字母且是6-16位'

        }
    },
    suerPwd: function(value,item){
        if(value !==$('#pwd').val())
        return '密码不一致'
    }
    
  });

//! 
$('#reg-form').on('submit',function(e){
    e.preventDefault();
    axios({
        method:'post',
        url:'http://big-event-api-t.itheima.net/api/reguser',
        data: `username=${$('#username').val()}&password=${$('#password').val()}`,
       
    })
    .then(res=>{
        console.log(res.data);
        if(res.data.status ===0){
            layer.msg('注册成功');
            // $('#to-login').click();
        }else{
            layer.msg('注册失败')
        }
    })
    .catch(err=>{
        layer.msg('网络异常')
        
    })


})

$('#login-form').on('submit',function(e){
    e.preventDefault();
    axios({
        method:'post',
        url:'http://big-event-api-t.itheima.net/api/login',
        data: `username=${$('#login-user').val()}&password=${$('#login-pwd').val()}`,
       
    })
    .then(res=>{
        console.log(res.data);
        if(res.data.status === 0){
            layer.msg('登录成功');
            localStorage.setItem('Authorization',res.data.token);
            location.href = '../index/index.html'
        }else{
            layer.msg('登录失败')
        }
    })
    .catch(err=>{
        layer.msg('网络异常');
        console.log(err);
    })


})