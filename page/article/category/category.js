function getCategory() {
    if (!localStorage.getItem('Authorization')) {
        location.href = '../login/login.html'
    }
    $('#login').on('click', function () {
        localStorage.setItem('Authorization', '');
        location.href = '../login/login.html';
    })
    axios({
        method: 'get',
        url: '/my/article/cates',
    })
        .then(res => {
            // console.log(res);
            // console.log(res.data.data.Id);
            // let Id = res.data.data.Id;
            
            let list_new = res.data.data.map(item => {
                return `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.alias}</td>
                        <td>
                            <button type="button" 
                            class="layui-btn"
                            id="editCate"
                            data-id="${item.Id}"
                            >
                            编辑</button>

                            <button type="button" 
                            class="layui-btn layui-btn-danger"
                            id="delCate"
                            data-id="${item.Id}"
                            >
                            删除</button>
                        </td>
                    </tr>
                        `
            })
            $("tbody").html(list_new.join(''));
            // 删除功能
            
            $('tbody').on('click','#delCate',function(e){
                let id = e.target.dataset.id
                layer.open({
                    title:'在线调试',
                    content:'确认删除',
                    btn:['确定','取消'],
                        yes: function(index,layero){
                            delCate(id);
                        },

                        btn2: function(index,layero){
                        }
                })

                function delCate(id){
                    axios({
                        method: 'GET',
                        url: '/my/article/deletecate/'+ id ,
                        // `name=${$('#addName').val()}&alias=${$("#addAlias").val()}`
                    })
                        .then(res => {
                            if(res.data.status ===0){
                                layer.close(layer.index)
                                layer.msg('删除成功')
                            }
                            getCategory();
                        })
                }
            })

            // 编辑功能
            $('tbody').on('click','#editCate',function(e){
                let id = parseInt(e.target.dataset.id);   
                let editName =  $(e.target.parentNode.parentNode).children()[0].innerHTML;
                let editAlias =  $(e.target.parentNode.parentNode).children()[1].innerHTML;
                layer.open({
                    title:'在线调试',
                    content: `<form class="layui-form" action="">
                    <div class="layui-form-item">
                        <label class="layui-form-label">分类名称</label>
                        <div class="layui-input-block">
                            <input type="text" 
                            name="title" 
                            required  
                            lay-verify="required" 
                            placeholder="请输入名称" 
                            value="${editName}"
                            autocomplete="off" 
                            class="layui-input"
                            id="editName"
                            >
                        </div>
                    </div>

                    <div class="layui-form-item">
                        <label class="layui-form-label">分类别名</label>
                        <div class="layui-input-block">
                            <input 
                            type="text" 
                            name="title" 
                            required  
                            lay-verify="required" 
                            placeholder="请输入别名" 
                            autocomplete="off" 
                            value="${editAlias}"
                            class="layui-input"
                            id="editAlias">
                        </div>
                    </div>

                    <div class="layui-form-item">
                        <div class="layui-input-block">
                         <button type="button" class="layui-btn 
                         layui-btn-normal" 
                         lay-filter="formDemo"
                         id="editSure"
                         >确认修改</button>
                         <button type="reset" class="layui-btn">重置</button>
                        </div>
                    </div>
                        </form>`,
                    btn:null,
                    area: ['500px', '300px'],
                })

                $('#editSure').on('click',function(){
                    axios({
                        method: 'post',
                        url: '/my/article/updatecate',
                        // `name=${$('#addName').val()}&alias=${$("#addAlias").val()}`
                        data: `Id=${id}&name=${$('#editName').val()}&alias=${$("#editAlias").val()}`
                    })
                        .then(res => {
                            if(res.data.status ===0){
                                layer.close(layer.index)
                                layer.msg('修改成功')
                            }
                            getCategory();
                        })  
                })
                 

            })

        })

}
getCategory();


// 添加文章类别
$('#addcates').on('click', function () {
    layer.open({
        area: ['500px', '300px'],
        title: '添加文章分类',
        btn: null,
        content: `<form class="layui-form" action="">
                    <div class="layui-form-item">
                        <label class="layui-form-label">分类名称</label>
                        <div class="layui-input-block">
                            <input type="text" 
                            name="title" 
                            required  
                            lay-verify="required" 
                            placeholder="请输入名称" 
                            autocomplete="off" 
                            class="layui-input"
                            id="addName"
                            >
                        </div>
                    </div>

                    <div class="layui-form-item">
                        <label class="layui-form-label">分类别名</label>
                        <div class="layui-input-block">
                            <input 
                            type="text" 
                            name="title" 
                            required  
                            lay-verify="required" 
                            placeholder="请输入别名" 
                            autocomplete="off" 
                            class="layui-input"
                            id="addAlias">
                        </div>
                    </div>

                    <div class="layui-form-item">
                        <div class="layui-input-block">
                         <button type="button" class="layui-btn 
                         layui-btn-normal" 
                         lay-filter="formDemo"
                         id="addSure"
                         >确认添加</button>
                         <button type="reset" class="layui-btn">重置</button>
                        </div>
                    </div>
                </form>`
    });

    // 添加
    $('#addSure').on('click',function(){
        axios({
            method: 'post',
            url: '/my/article/addcates',
            // `name=${$('#addName').val()}&alias=${$("#addAlias").val()}`
            data: `name=${$('#addName').val()}&alias=${$("#addAlias").val()}`
        })
            .then(res => {
                console.log(res);
                layer.close(layer.index)
                layer.msg('添加成功');
                getCategory();
            })
    })

})




