var app = new Vue({

  el : '#app',

  data: {
    filmList: [],
    tvSeriesList: [],
    inSearch: "",
  },
    
  methods: {

    // to search a film
    filmSearch: function() {
      axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: "11be422449662a8ede36c26b4599a9c8",
          query: this.inSearch,
          language: "it-IT",
          include_adult: false,
        }
      })

      .then((request)=>{
        const result = request.data.results;
        this.filmList = result;
        this.starVote();
        console.log(result)
      })
      this.inSearch = "";
    },
        
    // to search a tv serie


    // star
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