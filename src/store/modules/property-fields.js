import axios from 'axios'

// initial state
const state = {
  // features: [],
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
  // updatePendingTranslationChanges({ commit, state }, fieldDetails) {
  //   debugger
  //   // I store features on the server as a list of keys
  //   let fieldHasChanged = fieldDetails.newValue !== fieldDetails.originalValue
  //   if (fieldHasChanged) {
  //     state.pendingChanges[fieldDetails.fieldName] = fieldDetails.newValue
  //     // pendingChange[fieldDetails.fieldName] = fieldDetails.newValue
  //     // state.pendingChanges.push(pendingChange)
  //   } else {
  //     delete state.pendingChanges[fieldDetails.fieldName]
  //   }
  //   commit('setHasPendingChanges', Object.keys(state.pendingChanges).length > 0)
  // },
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
