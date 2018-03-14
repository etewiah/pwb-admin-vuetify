import axios from 'axios'

// initial state
const state = {
  currentWebsite: {}
}

// getters
const getters = {}

// actions
const actions = {
  updateWebsite({ commit, state }) {
    let apiUrl = '/api/v1/website'
     // + state.currentWebsite.slug
    axios.put(apiUrl, {
      website: state.currentWebsite
    }, {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      }
    }).then(response => {
      commit('setCurrentWebsite', { result: response.data })
    })
  },
}

// mutations
const mutations = {
  setCurrentWebsite: (state, { result }) => {
    state.currentWebsite = result
  },

}

export default {
  state,
  getters,
  actions,
  mutations
}
