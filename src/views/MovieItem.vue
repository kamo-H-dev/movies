<template>
  <v-container fluid grid-list-xl>
    <v-layout wrap align-center>
      <v-progress-linear :indeterminate="loader" v-if="loader"></v-progress-linear>
      <div class="header-panel">
        <v-btn
          class="def-btn"
          color="transparent"
          small
          to="/movies"
        >
          <i class="material-icons">
            arrow_back
          </i>
        </v-btn>
        <p>Movie Detail</p>
      </div>
      <div class="sub-header-panel">
        <h3 class="headline mb-0">{{movie.title}} <span v-if="movie.title !== movie.original_title">({{movie.original_title}} /{{movie.original_language}}/)</span></h3>
      </div>
      <v-layout v-if="movie.id" pa-3 wrap row>
        <v-flex xs6 sm4>
          <v-card>
            <v-img
              :src="`${imageUrl}${movie.poster_path}`"
            ></v-img>
          </v-card>
        </v-flex>
        <v-flex xs6 sm4>
          <div>
            <h4 class="release-date">{{movie.release_date}}</h4>
            <h4 class="vote-txt">Average Vote: {{ movie.vote_average }} </h4>
            <h4 class="vote-txt">Vote Count: {{ movie.vote_count }} </h4>
            <h4 class="vote-txt">Popularity: {{ movie.popularity }} </h4>
          </div>
        </v-flex>
        <v-flex xs12>
          <p class="desc-txt">{{ movie.overview }}</p>
        </v-flex>
      </v-layout>
      <v-flex xs12 sm4 v-if="notFoundMovie !== ''">
        <h3 class="headline mb-0">{{notFoundMovie}}</h3>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'MovieItem',
  data: () => ({
    movie: {},
    imageUrl: process.env.VUE_APP_BASE_IMAGE_URL + 'original',
    loader: false,
    notFoundMovie: ''
  }),
  methods: {
    getMovie (movieId) {
      if (!movieId) {
        this.$router.push('/movies')
        return
      }
      this.loader = true
      this.notFoundMovie = ''
      this.$store.dispatch('common/getMovie', { id: movieId })
        .then(movieData => {
          if (movieData && movieData.data) {
            if (!movieData.data.id) {
              this.notFoundMovie = 'The resource you requested could not be found'
            } else {
              this.movie = movieData.data
            }
          } else {
            this.$router.push('/movies')
          }
          this.loader = false
        })
        .catch(console.error)
    }
  },
  created () {
    const movieId = this.$route.params && this.$route.params.id
    if (!movieId) {
      this.$router.push('/movies')
      return
    }
    this.getMovie(movieId)
  }
}
</script>
