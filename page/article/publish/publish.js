var form = layui.form;
getCateList()
function getCateList(){
    axios({
        method:'get',
        url:'/my/article/cates',
    })
    .then(res => {
        console.log(res);
        let option_arr = res.data.data.map(item =>{
            return `
            <option value="${item.Id}">${item.name}</option>`
        })
        console.log($('#select-cate'));

        $('#select-cate').html(option_arr.join(''));

        form.render('select')
    })
}




tinymce.init({
    selector: '#mytextarea',
    language:'zh_CN',
    toolbar: 'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
    styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
    table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs',
    height: 650, //编辑器高度
    min_height: 400,
    /*content_css: [ //可设置编辑区内容展示的css，谨慎使用
        '/static/reset.css',
        '/static/ax.css',
        '/static/css.css',
    ],*/
    fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
    font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
    link_list: [
        { title: '预置链接1', value: 'http://www.tinymce.com' },
        { title: '预置链接2', value: 'http://tinymce.ax-z.cn' }
    ],
    image_list: [
        { title: '预置图片1', value: 'https://www.tiny.cloud/images/glyph-tinymce@2x.png' },
        { title: '预置图片2', value: 'https://www.baidu.com/img/bd_logo1.png' }
    ],
    image_class_list: [
    { title: 'None', value: '' },
    { title: 'Some class', value: 'class-name' }
    ],
    importcss_append: true,
    //自定义文件选择器的回调内容
    file_picker_callback: function (callback, value, meta) {
        if (meta.filetype === 'file') {
          callback('https://www.baidu.com/img/bd_logo1.png', { text: 'My text' });
        }
        if (meta.filetype === 'image') {
          callback('https://www.baidu.com/img/bd_logo1.png', { alt: 'My alt text' });
        }
        if (meta.filetype === 'media') {
          callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.baidu.com/img/bd_logo1.png' });
        }
    },
    toolbar_sticky: true,
    autosave_ask_before_unload: false,

  });

  const image = document.getElementById('big_img');
  const cropper = new Cropper(image, {
    aspectRatio: 40 / 28,
    
    crop(event) {
        const canvasData = cropper.getCroppedCanvas({
            width: 200,
            height: 140,     
          });
          $('#preview_img_box').html(canvasData)
    },
  });

  $('#select_img').on('click',function(){
    $('#input_file').click()
  })

  $('#input_file').on('change',function(){
    let img_url = URL.createObjectURL(this.files[0]);
    cropper.replace(img_url);
    
  })

  $('#submit').on('submit',function(e){
    e.preventDefault();
})

$('#publish').on('click',function(){
   publish('已发布')
    
})

$('#draft').on('click',function(){
    publish('已存为草稿')
})

function publish(state){
    let fd = new FormData();
    fd.append('title',$('#title').val());
    fd.append("cate_id",$("#select-cate").val());
    var activeEditor = tinymce.activeEditor;
    var editBody = activeEditor.getBody();
    activeEditor.selection.select(editBody);
    var text = activeEditor.selection.getContent( { format: 'text' } );
    fd.append("content",text);    
    cropper.getCroppedCanvas().toBlob(blob =>{
        fd.append('cover_img',blob)
        fd.append('state', state)

        axios({
            method:'post',
            url:'/my/article/add',
            data: fd
        })
        .then(res => {
            console.log(res);
            if(res.data.status===0){
                layer.msg('发布成功')
            }else{
                layer.msg('发布失败')

            }
        })
    })    
}