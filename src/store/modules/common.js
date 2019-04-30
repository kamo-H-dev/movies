import axiosApi from '../../axiosApi'

// initial state
const state = {

}

// getters
const getters = {

}

// actions
const actions = {
  getMovies ({ commit }, payload) {
    const requestType = payload && payload.requestType
    const page = payload && payload.page
    console.log('payload', payload)
    return axiosApi.get(`/${requestType}?page=${page}`)
      .then(response => { return response })
      .catch(err => { return err.response })
  },
  getMovie ({ commit }, payload) {
    const id = payload && payload.id
    return axiosApi.get(`/${id}?m=`)
      .then(response => { return response })
      .catch(err => { return err.response })
  }
}

// mutations
const mutations = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
