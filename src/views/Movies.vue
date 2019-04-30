<template>
  <v-container fluid grid-list-xl>
    <v-layout wrap align-center>
      <v-progress-linear :indeterminate="loader" v-if="loader"></v-progress-linear>
      <v-flex xs12 sm12>
        <v-select
          v-model="requestType"
          :items="requestTypes"
          label="Select Request Type"
          value="popular"
          item-text="name"
          item-value="value"
          @change="changeRequestType"
        ></v-select>
      </v-flex>
      <v-flex xs12 sm4 v-for="movie in results" :key="movie.id">
        <v-card>
          <v-img v-if="movie.backdrop_path"
            :src="`${imageUrl}${movie.backdrop_path}`"
          ></v-img>
          <v-img v-if="!movie.backdrop_path && movie.poster_path"
            :src="`${imageUrl}${movie.poster_path}`"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{movie.title}} <span v-if="movie.title !== movie.original_title">({{movie.original_title}} /{{movie.original_language}}/)</span></h3>
              <h4>Release Date: {{movie.release_date}}</h4>
              <div> {{ movie.overview }} </div>
              <h4>Average Vote: {{ movie.vote_average }} </h4>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange" :to="`/movies/${movie.id}`">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 v-if="page !== totalPages && results.length > 0">
        <v-btn @click="loadMoreMovies">More...</v-btn>
        <v-progress-circular
          :indeterminate="loader"
          color="primary"
          v-if="loader"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'Movies',
  data: () => ({
    requestType: 'popular',
    requestTypes: [{ name: 'Popular', value: 'popular' }, { name: 'Top Rated', value: 'top_rated' }],
    page: 1,
    nextPage: 1,
    results: [],
    totalResults: 0,
    totalPages: 0,
    imageUrl: process.env.VUE_APP_BASE_IMAGE_URL + 'w500',
    selectedPages: [],
    loader: false
  }),
  methods: {
    resetData () {
      this.page = 1
      this.nextPage = 1
      this.results = []
      this.totalResults = 0
      this.totalPages = 0
      this.selectedPages = []
    },
    changeRequestType (value) {
      if (!['popular', 'top_rated'].includes(value)) {
        return
      }
      this.resetData()
      this.getMovies(value, 1)
    },
    getMovies (requestType, page) {
      if (this.selectedPages.includes(page)) {
        return
      }
      this.loader = true
      this.$store.dispatch('common/getMovies', { requestType: requestType, page: page })
        .then(moviesData => {
          if (moviesData && moviesData.data) {
            this.page = moviesData.data.page
            this.results = this.results.concat(moviesData.data.results)
            this.totalResults = moviesData.data.total_results
            this.totalPages = moviesData.data.total_pages
            this.selectedPages.push(page)
            this.nextPage = moviesData.data.page + 1
          }
          this.loader = false
        })
        .catch(console.error)
    },
    loadMoreMovies () {
      this.getMovies(this.requestType, this.nextPage)
    }
  },
  created () {
    this.getMovies('popular', this.page)
  }
}
</script>
