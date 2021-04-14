var app = new Vue({

  el : '#app',

  data: {
    popularFilmList: [],
    popularSerieList: [],
    topRatedFilmList: [],
    topRatedSerieList: [],
    filmList: [],
    tvSeriesList: [],
    inSearch: "",
  },
    
  methods: {

    // topRated
    topRatedContent: function(){
      // film
      axios.get('https://api.themoviedb.org/3/movie/top_rated', {
        params: {
          api_key: "11be422449662a8ede36c26b4599a9c8",
        }
      })
      .then((request)=>{
        const result = request.data.results;
        this.topRatedFilmList = result;
        this.voteInStar(this.topRatedFilmList);
        this.filmList = [];
        this.popularFilmList = [];
        console.log(result)
      })

      // tv series
      axios.get('https://api.themoviedb.org/3/tv/top_rated', {
        params: {
          api_key: "11be422449662a8ede36c26b4599a9c8",
        }
      })
      .then((request)=>{
        const result = request.data.results;
        this.topRatedSerieList = result;
        this.voteInStar(this.topRatedSerieList);
        this.tvSeriesList = [];
        this.popularSerieList = [];
        console.log(result)
      })
    },
    // end topRated 

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
        this.topRatedFilmList = [];
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
        this.topRatedSerieList = [];
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
  },

  created: function(){
    this.topRatedContent()
  }

})
Vue.config.devtools = true