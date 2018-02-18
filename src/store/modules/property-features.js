import axios from 'axios'

// initial state
const state = {
  features: [],
  pendingChanges: {},
  hasPendingChanges: false,
  currentPropertyId: null
}

// getters
const getters = {}

// actions
const actions = {
  updatePropertyFeatures({ commit, state }) {
    let apiUrl = '/api/v2/properties/' + state.currentPropertyId + '/update_features'
    // console.log(axios.defaults.headers.common)
    axios.put(apiUrl, {
      features: state.pendingChanges
    }, {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      }
    }).then(response => {
      commit('setHasPendingChanges', false)
    })
  },
  // Below will compare changes made to a field's value in a form
  // to the original value and decide if there are changes
  // yet to be saved to the server
  // If there are pending changes, an update button will display
  updatePendingPropertyFeatureChanges({ commit, state }, fieldDetails) {
    // I store features on the server as a list of keys
    let fieldHasChanged = fieldDetails.newValue !== fieldDetails.originalValue
    if (fieldHasChanged) {
      state.pendingChanges[fieldDetails.fieldName] = fieldDetails.newValue
      // pendingChange[fieldDetails.fieldName] = fieldDetails.newValue
      // state.pendingChanges.push(pendingChange)
    } else {
      delete state.pendingChanges[fieldDetails.fieldName]
    }
    commit('setHasPendingChanges', Object.keys(state.pendingChanges).length > 0)
  },
}

// mutations
const mutations = {
  setHasPendingChanges: (state, result) => {
    state.hasPendingChanges = result
    if (!result) {
      state.pendingChanges = {}
    }
  },
  setFeaturesPropertyId: (state, { result }) => {
    state.currentPropertyId = result
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
