

let total = 0;
let article_list = [];
  // 示例

getCateList()
function getCateList(){
    axios({
        method:'get',
        url:'/my/article/cates',
    })
    .then(res => {
        console.log(res);
        let new_arr = res.data.data.map(item =>{
            return `
            <option value="${item.Id}">${item.name}</option>`
        })
        $('#select_cate').append(new_arr.join(''));

        layui.form.render()
    })
}

// 获取文章列表

let q = {
    pagenum:1,
    pagesize:4,
    cate_id:"",
    state: "",
}
getArticleList();
function getArticleList()
{
axios({
    method: 'get',
    url: '/my/article/list',
    params:q,
})
    .then(res => {
        console.log(res);
        // console.log(res.data.data.Id);
        // let Id = res.data.data.Id;
        
        // 方法一：
            // 解决当页面删完时数据不更新
            // if(res.data.data.length === 0 && q.pagenum > 1){
            //     q.pagenum--;
            //     getArticleList();
            // }

        // 方法二：在删除中 delCate
        total = res.data.total;
        article_list =res.data.data;

        let list_new = res.data.data.map(item => {
            return `
                <tr>
                    <td>${item.title}</td>
                    <td>${item.cate_name}</td>
                    <td>${item.pub_date}</td>
                    <td>${item.state}</td>
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
        
        // 渲染分页
        layui.use('laypage', function(){
            var laypage = layui.laypage;
            
            //执行一个laypage实例
            laypage.render({
              elem: 'page' //注意，这里的 test1 是 ID，不用加 # 号
              ,count: res.data.total //数据总数，从服务端得到
              ,layout:['count','limit','prev','page','next','skip'],
              limit: q.pagesize,
              curr: q.pagenum,
              limits:[2,4,6,8]
              ,jump: function(obj, first){
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                     // console.log(obj.limit); //得到每页显示的条数
                
                //首次不执行
                if(!first){
                    q.pagenum = obj.curr
                    q.pagesize=obj.limit;
                    getArticleList();   
                }
              }
            });
          });

        // 删除文章类容
        $('tbody').on('click','#delCate',function(e){
            let id = e.target.dataset.id
            layer.open({
                title:'删除文章',
                content:'确认删除',
                btn:['确定','取消'],
                    yes: function(index,layero){
                        delCate(id);
                    },

                    btn2: function(index,layero){
                    }
            })
        })

          // 编辑功能
        //  $('tbody').on('click','#editCate',function(e){
        //     let id = parseInt(e.target.dataset.id);   
        //     let editName =  $(e.target.parentNode.parentNode).children()[0].innerHTML;
        //     let editAlias =  $(e.target.parentNode.parentNode).children()[1].innerHTML;
        //     layer.open({
        //         title:'在线调试',
        //         content: `<form class="layui-form" action="">
        //         <div class="layui-form-item">
        //             <label class="layui-form-label">分类名称</label>
        //             <div class="layui-input-block">
        //                 <input type="text" 
        //                 name="title" 
        //                 required  
        //                 lay-verify="required" 
        //                 placeholder="请输入名称" 
        //                 value="${editName}"
        //                 autocomplete="off" 
        //                 class="layui-input"
        //                 id="editName"
        //                 >
        //             </div>
        //         </div>

        //         <div class="layui-form-item">
        //             <label class="layui-form-label">分类别名</label>
        //             <div class="layui-input-block">
        //                 <input 
        //                 type="text" 
        //                 name="title" 
        //                 required  
        //                 lay-verify="required" 
        //                 placeholder="请输入别名" 
        //                 autocomplete="off" 
        //                 value="${editAlias}"
        //                 class="layui-input"
        //                 id="editAlias">
        //             </div>
        //         </div>

        //         <div class="layui-form-item">
        //             <div class="layui-input-block">
        //              <button type="button" class="layui-btn 
        //              layui-btn-normal" 
        //              lay-filter="formDemo"
        //              id="editSure"
        //              >确认修改</button>
        //              <button type="reset" class="layui-btn">重置</button>
        //             </div>
        //         </div>
        //             </form>`,
        //         btn:null,
        //         area: ['500px', '300px'],
        //     })

        //     $('#editSure').on('click',function(){
        //         axios({
        //             method: 'post',
        //             url: '/my/article/edit',
        //             // `name=${$('#addName').val()}&alias=${$("#addAlias").val()}`
        //             data: `Id=${id}&name=${$('#editName').val()}&alias=${$("#editAlias").val()}`
        //         })
        //             .then(res => {
        //                 if(res.data.status ===0){
        //                     layer.close(layer.index)
        //                     layer.msg('修改成功')
        //                 }
        //                 getArticleList();
        //             })  
        //     })
             

        // })


    });

}


// 删除方法
function delCate(id){
    axios({
        method: 'GET',
        url: '/my/article/delete/'+ id ,
        // `name=${$('#addName').val()}&alias=${$("#addAlias").val()}`
    })
        .then(res => {
            if(res.data.status ===0){
                layer.close(layer.index);

                layer.msg('删除成功');

                if(Math.ceil(total /q.pagesize) === q.pagenum && article_list.length ===1){
                    q.pagenum--
                }      
            }
            getArticleList();
        })
}


// 筛选filter
$("#filter").on('submit',function(e){
    e.preventDefault();
    q.cate_id = $('#select_cate').val();
    console.log(q.cate_id);
    q.state = $('#select_state').val();
     
    getArticleList();
})