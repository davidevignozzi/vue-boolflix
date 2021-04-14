var app = new Vue({

  el : '#app',

  data: {
    popularFilmList: [],
    popularSerieList: [],
    filmList: [],
    tvSeriesList: [],
    inSearch: "",
  },
    
  methods: {

    // popular
    popularContent: function(){
      // film
      axios.get('https://api.themoviedb.org/3/movie/popular', {
        params: {
          api_key: "11be422449662a8ede36c26b4599a9c8",
        }
      })
      .then((request)=>{
        const result = request.data.results;
        this.popularFilmList = result;
        this.voteInStar(this.popularFilmList);
        this.filmList = [];
        console.log(result)
      })

      // tv series
      axios.get('https://api.themoviedb.org/3/tv/popular', {
        params: {
          api_key: "11be422449662a8ede36c26b4599a9c8",
        }
      })
      .then((request)=>{
        const result = request.data.results;
        this.popularSerieList = result;
        this.voteInStar(this.popularSerieList);
        this.tvSeriesList = [];
        console.log(result)
      })
    },
    // end popular

    // search
    contentSearch: function() {

      // to search a film
      axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: "11be422449662a8ede36c26b4599a9c8",
          query: this.inSearch,
          include_adult: false,
        }
      })
      .then((request)=>{
        const result = request.data.results;
        this.filmList = result;
        this.voteInStar(this.filmList);
        console.log(result)
      })

      // to search a tv serie
      axios.get('https://api.themoviedb.org/3/search/tv', {
        params: {
          api_key: "11be422449662a8ede36c26b4599a9c8",
          query: this.inSearch,
        }
      })
      .then((request) => {
        this.tvSeriesList = request.data.results;
        this.voteInStar(this.tvSeriesList);
        console.log(this.tvSeriesList);
      });
      this.inSearch="";
    },
    // end search 
        
    // star vote Film
    voteInStar(array){
      array.forEach((item, i) => {
        if (!isNaN(item.vote_average)) {
          const vote = (item.vote_average/2);
          let starVote = Math.ceil(vote);
          item.vote_average = starVote;
        }
      });
    },

    // popular
    popular: function(array){
      let popular = false;
      array.forEach((item, i) => {
        if(item.vote_average>=4){
          popular = true;
        }
      });
      return popular;
    },
  }
})
Vue.config.devtools = true