let user_id;

// ! 通过required属性来验证每个输入框的类容
// 示例
// ! 注册表单验证
var form = layui.form;
form.verify({
    nickname: function(value, item){ //value：表单的值、item：表单的DOM对象
        let reg = /^[\u4d00-\u9fa5s-z\d_-]{2,10}$/i;
        if(reg.test(value) === false){
            return '用户昵称只能是字母、数组、-_的组合,且是2-10位'

        }
    }
    });

function getUserInfo(){
    if(!localStorage.getItem('Authorization')){
        location.href = '../login/login.html'
    }
    axios({
        method:'get',
        url:'/my/userinfo',
    })
    .then(res=>{
            let {username, nickname,email} = res.data.data;
            user_id =res.data.data.id;
            $('#username').val(username);
            $('#nickname').val(nickname);
            $('#email').val(email);
           
    })
}
getUserInfo();


$('#submit').on('submit',function(e){
    e.preventDefault();
    axios({
        method:'post',
        url:'/my/userinfo',
        data: `id=${user_id}&nickname=${$('#nickname').val()}&email=${$('#email').val()}`,
       
    })
    .then(res=>{
        console.log(res.data);

        window.parent.getUserInfo();
        layer.msg('修改成功')
       
    })
})

// 重置
$('#reset').on('click',function () { 
    getUserInfo();
 })