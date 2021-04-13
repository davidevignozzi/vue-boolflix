var app = new Vue({

  el : '#app',

  data: {
    filmList: [],
    tvSeriesList: [],
    inSearch: "",
  },
    
  methods: {

    filmSearch: function() {

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
        this.starVote();
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
        console.log(this.tvSeriesList);
      });
      // to empty the input
      this.inSearch="";
    },
        
    // star vote
    starVote: function() {
      this.filmList.forEach((film) => {
        const voteRound = (film.vote_average / 2);
        let vote = Math.ceil(voteRound);
        film.vote_average = vote;
      });
    }

  },


})
Vue.config.devtools = true