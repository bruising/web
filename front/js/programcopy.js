var vue = new Vue({ //创建一个Vue的实例
    el: "#app", //挂载点是id="app"的地方
    data: {
        program: {},
        url: JSON.parse(sessionStorage.getItem('url'))
    },
    methods: {
        //加载数据
        getPrograms: function(programId) {
            var _this=this
            var params = new URLSearchParams();
            params.append('programId', programId);
            axios.post(_this.url + "program/searchProgramInfo", params).then(function(response) {
                _this.program = response.data.data;
                console.log(JSON.stringify(_this.program))
            })

        },
    },
    created() {

        this.getPrograms(4)
    },
    mounted() {
        //刷新当前用户
        // this.refresh_user()
    }
})