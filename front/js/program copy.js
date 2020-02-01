var vue = new Vue({ //创建一个Vue的实例
    el: "#app", //挂载点是id="app"的地方
    data: {
        program: {},
        url: JSON.parse(sessionStorage.getItem('url'))
    },
    methods: {
        //加载数据
        getPrograms: function(programId) {
            var params = new URLSearchParams();
            params.append('programId', programId);
            axios.post(this.url + "program/searchProgramInfo", params).then(function(response) {
                this.program = response.data.data;
                console.log(this.program.programTitle)
            })

        },
    },
    created() {
        /*laypage分页*/
        // this.xinwen();
        /*element-ui 分页*/
        this.getPrograms(4)
    },
    mounted() {
        //刷新当前用户
        // this.refresh_user()
    }
})