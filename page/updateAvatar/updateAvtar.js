// ! 重置表单验证
var form = layui.form;
form.verify({
   
    originPwd: function(value, item){ //value：表单的值、item：表单的DOM对象
        let reg = /^[a-z\d_-]{2,10}$/i;
        if(reg.test(value) === false){
            return '用户名只能是字母、数组、-_的组合,且是2-10位'

        }
    },
    newPwd: function(value, item){ //value：表单的值、item：表单的DOM对象
        let reg = /^[a-z\d_-]{6,16}$/i;
        if(reg.test(value) === false){
            return '密码只能是数字和字母且是6-16位'

        }
    },
    SuerPwd: function(value,item){
        if(value !==$('#newPwd').val())
        return '密码不一致'
    }
    
  });

  $('#submit').on('submit',function(e){
    e.preventDefault();
    console.log('dsdsd');
    axios({
        method:'post',
        url:'/my/updatepwd',
        data: `oldPwd=${$('#originPwd').val()}&newPwd=${$('#newPwd').val()}`,
       
    })
    .then(res=>{
        console.log(res.data);
        if(res.data.status ===0){
            layer.msg('修改成功');
            // $('#to-login').click();
        }else{
            layer.msg('注册失败')
        }
    })
    .catch(err=>{
        layer.msg('网络异常')
        
    })


})

$('#reset').on('click',function(){

    $('#originPwd').val() = "";
    $('#newPwd').val() = "";
    $('#SuerPwd').val() = "";
})
