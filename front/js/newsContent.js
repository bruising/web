var vue = new Vue({     //创建一个Vue的实例
    el:"#app",  //挂载点是id="app"的地方
    data:{
        news:{},
        url:JSON.parse(sessionStorage.getItem('url')),
        shang:true,//是否有上一页
        xia:true,//是否有下一页
        snew:"",//上一页的新闻
        xnew:"",//下一页的新闻
        count:-1//新闻总数
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
        //初始化数据
        xinwen: function () {
            var _this = this;
            var num = localStorage.getItem("num");//当前的展示的新闻的编号
            _this.count= localStorage.getItem("count");//新闻总数量  用于初始页面判断有没有下一页
            if (num  == null) {
                window.location.href = "index.html"
            }
            var params = new URLSearchParams();
            params.append("num",num );
            axios.post(_this.url+"/QueryByID",params).then(function (response) {
                var newss = JSON.parse(response.data.data)
                _this.news = newss;//初始化当前页面
                if (num ==_this.count){  //判断有没有下一页
                    _this.xia=false
                }
                if(_this.xia){//显示下一页的标题
                    params = new URLSearchParams();
                    var xnum= parseInt(num )+1
                    params.append("num",xnum);
                    axios.post(_this.url+"/QueryByID",params).then(function (response) {
                        var newss = JSON.parse(response.data.data)
                        console.log(newss)
                        _this.xnew = newss;

                    })
                }

                if (num ==1){  //判断有没有上一页
                    _this.shang=false
                }
                if(_this.shang){//显示上一页的标题
                    params = new URLSearchParams();
                    var snum= parseInt(num )-1
                    params.append("num",snum);
                    axios.post(_this.url+"/QueryByID",params).then(function (response) {
                        var newss = JSON.parse(response.data.data)
                        console.log(newss)
                        _this.snew = newss;

                    })
                }
            })

        },
        getxNews:function(news_id,num){
            var _this = this;
            var params=new URLSearchParams();
            params.append('news_id',news_id);
            axios.post(_this.url+"/addNewsIndex",params).then(function (response) {
                if(response.data.code==='0'){//下一页新闻点击量+1成功
                    var  params2 = new URLSearchParams();
                    params2.append("num",num );
                    axios.post(_this.url+"/QueryByID",params2).then(function (response) {//显示当前新闻
                        var newss = JSON.parse(response.data.data)
                        // console.log(newss)
                        _this.news = newss;
                        // console.log(_this.news)
                        if (num ==_this.count){  //如果是最后一条  就不显示  下一页
                            _this.xia=false
                        }else{
                            _this.xia=true
                        }
                        if(_this.xia){//显示下一页的标题
                            params = new URLSearchParams();
                            var num3= parseInt(num)+1
                            // alert(_this.num)
                            params.append("num",num3);
                            axios.post(_this.url+"/QueryByID",params).then(function (response) {
                                var newss = JSON.parse(response.data.data)
                                _this.xnew = newss;
                                console.log(newss)
                            })
                        }

                        if (num ==1){
                            _this.shang=false
                        }else{
                            _this.shang=true
                        }

                        if(_this.shang){//显示上一页的标题
                            params = new URLSearchParams();
                            var num4= parseInt(num)-1
                            // alert(_this.num)
                            params.append("num",num4);
                            axios.post(_this.url+"/QueryByID",params).then(function (response) {
                                var newss = JSON.parse(response.data.data)
                                _this.snew = newss;
                                console.log(newss)
                            })
                        }

                    })

                }
            })

        },
        getsNews:function(news_id,num){
            var _this = this;
            var params=new URLSearchParams();
            params.append('news_id',news_id);
            axios.post(_this.url+"/addNewsIndex",params).then(function (response) {
                if(response.data.code==='0'){//上一页新闻点击量+1成功

                  var  params3 = new URLSearchParams();
                    params3.append("num",num );
                    axios.post(_this.url+"/QueryByID",params3).then(function (response) {//显示当前数据
                        var newss = JSON.parse(response.data.data)
                        _this.news = newss;
                        if (num ==1){  //如果是第一条  就不显示  上一页
                            _this.shang=false
                        }else{
                            _this.shang=true
                        }
                        if(_this.shang){//显示上一页的标题
                          var  params5 = new URLSearchParams();
                            var num4= parseInt(num)-1

                            params5.append("num",num4);
                            axios.post(_this.url+"/QueryByID",params5).then(function (response) {
                                var newss = JSON.parse(response.data.data)
                                _this.snew = newss;
                                console.log(newss)
                            })
                        }

                        if (num ==_this.count){  //如果是最后一条  就不显示  下一页
                            _this.xia=false
                        }else{
                            _this.xia=true
                        }
                        if(_this.xia){//显示下一页的标题
                          var  params9 = new URLSearchParams();
                            var num3= parseInt(num)+1
                            // alert(_this.num)
                            params9.append("num",num3);
                            axios.post(_this.url+"/QueryByID",params9).then(function (response) {
                                var newss = JSON.parse(response.data.data)
                                _this.xnew = newss;
                                console.log(newss)
                            })
                        }

                    })

                }
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