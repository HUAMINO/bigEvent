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


 const cropper = new Cropper(document.getElementById
    ('avatar_big_img'), {
    aspectRatio: 1,//长宽比例 1:1
    // 只要改变这个裁剪框里的图片就会触发crop这个方法
    // crop() {
    //     // 这时我们应该要获取裁剪框的图片
    
   
    //   // 这里为什么要用全局变量，因为下面也要用
    //   let img_100 = cropper.getCroppedCanvas({
    //     width: 100,
    //     height: 100,
    //   });
    //   $('#preview_img_100').html(img_100);
    //   let img_50 = cropper.getCroppedCanvas({
    //     width: 50,
    //     height: 50,
    //   });
    //   console.log(img_100);
     
    //   $('#preview_img_50').html(img_50);
    // },
    crop: _.throttle(function(){
          let img_100 = cropper.getCroppedCanvas({
        width: 100,
        height: 100,
      });
      $('#preview_img_100').html(img_100);
      let img_50 = cropper.getCroppedCanvas({
        width: 50,
        height: 50,
      });
    
      $('#preview_img_50').html(img_50);
    })
  })

  $('#select_img').on('click',function(){
    $('#input_file').click();
  })


  $('#input_file').on('change',function(){
    let img_url = URL.createObjectURL(this.files[0]);
    $('#avatar_big_img').attr('src',img_url);
    cropper.replace(img_url)
  })

  
  $('#submit').on('click',function(){
    let img_100 = cropper.getCroppedCanvas({
        width: 100,
        height: 100,
      });
      let img_base64 =  img_100.toDataURL('image/jpeg')
        encodeURIComponent(img_base64)
      axios({
        method:'post',
        url:'/my/update/avatar',
        data:`avatar=${encodeURIComponent(img_base64)}`

    })
    .then(res=>{
        if(res.data.status ===0){
            window.parent.getUserInfo();
        }
    })
  })