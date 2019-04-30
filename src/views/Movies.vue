<template>
  <v-container fluid grid-list-xl>
    <v-layout wrap align-center>
      <v-progress-linear :indeterminate="loader" v-if="loader"></v-progress-linear>
      <div class="header-panel">
        <v-select
          v-model="requestType"
          :items="requestTypes"
          :ripple="false"
          class="top-selector"
          label="Select Request Type"
          value="popular"
          append-icon="more_vert"
          menu-props="offsetY"
          hide-details
          solo
          flat
          light
          item-text="name"
          item-value="value"
          @change="changeRequestType"
        ></v-select>
      </div>
      <v-flex xs6 sm4 pa-0 v-for="movie in results" :key="movie.id">
        <v-card :to="`/movies/${movie.id}`">
          <v-img v-if="movie.poster_path"
            :src="`${imageUrl}${movie.poster_path}`"
          ></v-img>
          <v-img v-if="!movie.poster_path && movie.backdrop_path"
            :src="`${imageUrl}${movie.backdrop_path}`"
          ></v-img>
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
