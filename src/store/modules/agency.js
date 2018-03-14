import axios from 'axios'

// initial state
const state = {
  currentAgency: {}
}

// getters
const getters = {}

// actions
const actions = {
  updateAgency({ commit, state }) {
    let apiUrl = '/api/v1/agency'
     // + state.currentAgency.slug
    axios.put(apiUrl, {
      agency: state.currentAgency
    }, {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      }
    }).then(response => {
      commit('setCurrentAgency', { result: response.data })
    })
  },
}

// mutations
const mutations = {
  setCurrentAgency: (state, { result }) => {
    state.currentAgency = result
  },

}

export default {
  state,
  getters,
  actions,
  mutations
}
