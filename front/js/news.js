    var vue = new Vue({     //创建一个Vue的实例
        el:"#app",  //挂载点是id="app"的地方
        data:{
            newsList:{},
            url:JSON.parse(sessionStorage.getItem('url'))
        },
        methods:{
            search: function() {
                if (this.keyword === '') {
                    // window.location = "/mint/search"
                    console.log(this.keyword);
                } else {
                    let keyword = encodeURIComponent(this.keyword)
                    // window.location = "/mint/search?keyword="+keyword
                    console.log(keyword);
                }
            },
            getNews: function (news_id,num) {
                localStorage.setItem("num",num);
                var params=new URLSearchParams();
                params.append('news_id',news_id);
                axios.post(this.url+"/addNewsIndex",params).then(function (response) {
                    if(response.data.code==='0'){
                        window.location.href = "newsContent.html"
                    }
                })

            },
            //初始化数据
            xinwen: function () {
                var _this = this;
                axios.post(_this.url+"/showNews").then(function (response) {
                    _this.newsList = response.data.data;
                    console.log(_this.newsList)
                    layui.use('laypage', function(){
                        var laypage = layui.laypage;
                        laypage.render({
                            elem: 'test-laypage-demo2'
                            ,count: response.data.count
                            ,first: "首页"
                            , last: "尾页"
                            ,limit:5
                            ,layout: ['prev', 'page', 'next', 'skip']
                            ,jump: function(obj,first){
                                //obj包含了当前分页的所有参数，比如：
                                console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                                console.log(obj.limit); //得到每页显示的条数
                                localStorage.setItem("count",response.data.count);
                                //首次不执行
                                if(!first){
                                    //do something
                                    var params = new URLSearchParams();
                                    params.append('limit', obj.limit);
                                    params.append('page', obj.curr);
                                    axios.post(_this.url+"/showNews",params).then(function (response) {
                                        _this.newsList = response.data.data;
                                    })
                                }
                            }
                        });
                    });


                })
            },
            //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
            dateFormat:function(time) {
                var date=new Date(time);
                var year=date.getFullYear();
                /* 在日期格式中，月份是从0开始的，因此要加0
                 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
                 * */
                var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
                var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
                var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
                var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
                var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
                // 拼接
                return year+"-"+month+"-"+day;
            }
        },
        created() {
            this.xinwen();
        },
        mounted(){
            //刷新当前用户
            // this.refresh_user()
        }
    })


