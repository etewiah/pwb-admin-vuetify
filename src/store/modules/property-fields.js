import axios from 'axios'

// initial state
const state = {
  features: [],
  // pendingChanges: {},
  // hasPendingChanges: false,
  propertyFieldTranslations: {}
}

// getters
const getters = {}

// actions
const actions = {
  loadFieldTranslations({ commit, state }) {
    let apiUrl = '/api/v2/translations/batch/extras/all'
    axios.get(apiUrl, {

    }).then((response) => {
      commit('setPropertyFieldTranslations', { result: response.data.translations })
    }, (err) => {
      console.log(err)
    })
  },
}

// mutations
const mutations = {
  // setHasPendingChanges: (state, result) => {
  //   state.hasPendingChanges = result
  //   if (!result) {
  //     state.pendingChanges = {}
  //   }
  // },
  setPropertyFieldTranslations: (state, { result }) => {
    state.propertyFieldTranslations = result
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
