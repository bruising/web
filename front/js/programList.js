    var vue = new Vue({ //创建一个Vue的实例
        el: "#app", //挂载点是id="app"的地方
        data: {
            programsList: {},
            url: JSON.parse(sessionStorage.getItem('url')),
            //下面三个是 element-ui 分页组件 的三个参数
            currentPage: 1, //初始页
            pagesize: 5,
            count: 1
        },
        methods: {
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
            getProgram: function(programId) {
                localStorage.setItem("programId", programId);
                window.location.href = "program.html";
            },
            // element-ui 分页组件
            // 获取每页记录数
            handleSizeChange: function(size) {
                this.pagesize = size;
                console.log(this.pagesize) //每页下拉显示数据
                this.handleProgramsList(this.pagesize, this.currentPage)
            },
            //获取当前所在页
            handleCurrentChange: function(currentPage) {
                this.currentPage = currentPage;
                console.log(this.currentPage) //点击第几页
                this.handleProgramsList(this.pagesize, this.currentPage)
            },
            //加载数据
            handleProgramsList: function(pagesize, currentPage) {
                var _this = this;
                var params = new URLSearchParams(); //拼接参数
                if (pagesize == undefined || currentPage == undefined) { //第一次加载判空
                    pagesize = _this.pagesize
                    currentPage = _this.currentPage
                } else {
                    params.append('limit', pagesize);
                    params.append('page', currentPage);
                }
                axios.post(this.url + "program/searchPrograms", params).then(function(response) {
                    _this.programsList = response.data.data;
                    _this.count = response.data.count;
                })
            }
        },
        created() {
            this.handleProgramsList();
        },
        mounted() {
            //刷新当前用户
            // this.refresh_user()
        }
    })