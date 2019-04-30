<template>
  <v-container fluid grid-list-xl>
    <v-layout wrap align-center>
      <v-progress-linear :indeterminate="loader" v-if="loader"></v-progress-linear>
      <v-btn to="/movies">Movies</v-btn>
      <v-flex xs12 sm4 v-if="movie.id">
        <v-card>
          <v-img
            :src="`${imageUrl}${movie.poster_path}`"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{movie.title}} <span v-if="movie.title !== movie.original_title">({{movie.original_title}} /{{movie.original_language}}/)</span></h3>
              <h4>Status: {{movie.status}}</h4>
              <h4>Release Date: {{movie.release_date}}</h4>
              <div> {{ movie.overview }} </div>
              <h4>Average Vote: {{ movie.vote_average }} </h4>
              <h4>Vote Count: {{ movie.vote_count }} </h4>
              <h4>Popularity: {{ movie.popularity }} </h4>
              <h5 v-if="movie.homepage">Homepage: <a :href="`${movie.homepage}`" target="_blank">{{movie.homepage}}</a></h5>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
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
