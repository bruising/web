var vue = new Vue({     //创建一个Vue的实例
    el:"#app",  //挂载点是id="app"的地方
    data:{
        keyword:'',
        logined:false, //判断是否登录
        firms:{},
        user:{},
        news:{},
        newsList:{},
        url:JSON.parse(sessionStorage.getItem('url')),
        imgs: [


            { img: 'http://q3rk917br.bkt.clouddn.com/20180330234706_stfoo.jpg',id: '热门项目1' },
            { img: 'http://q3rk917br.bkt.clouddn.com/20180330234706_stfoo.jpg',id: '热门项目2' },
            { img: 'http://q3rk917br.bkt.clouddn.com/20180330234706_stfoo.jpg',id: '热门项目3' }
        ]
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
        logout: function () {
            this.$confirm('确认退出吗?', '提示', {
            }).then(() => {
                sessionStorage.removeItem("user");
                sessionStorage.removeItem("token");
                //跳转到首页
                window.location = "index.html"
            }).catch(() => {

            });
        },
        test:function(id){
            alert(id)
        },
        refresh_user:function(){
            //从sessionStorage中取出当前用户
            let activeUser= JSON.parse(sessionStorage.getItem("user"));
            //取出sessionStorage中的token
            let token = sessionStorage.getItem("token");
            //判断是不是空
            if (activeUser == null || token == null) {
                this.logined =false;
            }
            //通过token获取缓存中的用户
            var params = new URLSearchParams();
            params.append('token', token);
            // alert(this.url)
            axios.post(this.url+"/isLogin",params,{
                headers: {
                    token:token
                }
            }).then((response)=>{
                var tokenuser = JSON.parse(response.data.data);
                console.log(response.data)
                if(activeUser.id == tokenuser.id){
                    this.logined = true;
                    this.user = tokenuser;
                }
                console.log(this.user)
            }).catch(function (err) {
                console.log(err)
            })

        },
        //首页初始化数据
        init: function () {
            var _this = this;
            // axios.post(_this.url+"/indexInit").then(function (response) {
                // var map = JSON.parse(response.data.data)
                // _this.programs = map.programsContent;
                // _this.firms = map.firmsByProgramId;
                // _this.news = map.newestNews;
                // _this.newsList = response.data.data;

            // })
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
            return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
        }
    },
    created() {
        this.init();
    },
    mounted(){
        //刷新当前用户
        this.refresh_user();
    }
})