// import shop from '../../api/shop'
// import * as types from '../mutation-types'
import axios from 'axios'

// initial state
const state = {
  currentPage: {}
}

// getters
const getters = {}

// actions
const actions = {
  updatePage({ commit, state }) {
    let apiUrl = '/api/v1/pages'
     // + state.currentPage.slug
    axios.put(apiUrl, {
      page: state.currentPage
    }, {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      }
    }).then(response => {
      commit('setCurrentPage', { result: response.data })
    })
  },
  loadPage: function({ commit }, pageId) {
    let apiUrl = '/api/v1/pages/' + pageId
    axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      }
    }).then((response) => {
      commit('setCurrentPage', { result: response.data })
    }, (err) => {
      console.log(err)
    })
  },
}

// mutations
const mutations = {
  setCurrentPage: (state, { result }) => {
    state.currentPage = result
  },

}

export default {
  state,
  getters,
  actions,
  mutations
}
