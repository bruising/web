var vue = new Vue({ //创建一个Vue的实例
    el: "#app", //挂载点是id="app"的地方
    data: {
        program: {},
        programRequireList: {},
        firmNameList: {},
        links: {},
        url: JSON.parse(sessionStorage.getItem('url'))
    },
    methods: {
        //加载数据
        getPrograms: function(programId) {
            var _this = this
            var params = new URLSearchParams();
            params.append('programId', programId);
            axios.post(_this.url + "program/searchProgramInfo", params).then(function(response) {
                _this.program = response.data.data;
                _this.programRequireList = response.data.data.programRequire.split('。');
                _this.firmNameList = response.data.data.firmNames[0].split(',');
                _this.links = response.data.data.links[0].split(',');
                console.log(JSON.stringify(_this.firmNameList))
                console.log(JSON.stringify(_this.links))
            })
        },
    },
    created() {
        var programId = localStorage.getItem("programId");
        console.log(programId);
        this.getPrograms(programId);
    },
    mounted() {
        //刷新当前用户
        // this.refresh_user()
    }
})