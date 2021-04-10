var app = new Vue({

    el : '#app',

    data: {
        filmList : [],
        inSearch: "",
    },
    
    methods: {

        filmSearch: function() {
            axios.get('https://api.themoviedb.org/3/search/movie', {
              params: {
                api_key: "11be422449662a8ede36c26b4599a9c8",
                query: this.inSearch,
                language: "it-IT",
              }
            })

            .then((request)=>{
                const result = request.data.results;
                this.filmList = result;
                console.log(result)
            })
            this.inSearch = "";
        }        

    },


})
Vue.config.devtools = true