import axios from 'axios'
import i18n from '@/i18n'
import _ from 'lodash'

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
  updateFieldTranslations({ commit, state }, pendingChanges) {
    let apiUrl = '/api/v2/translations/update'
    axios.put(apiUrl, pendingChanges, {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      }
    }).then(response => {
      commit('updatePropertyFieldTranslation', { result: response.data })
    })
  },
  loadFieldTranslations({ commit, state }, fieldNames) {
    let apiUrl = '/api/v2/translations/batch/' + fieldNames + '/all'
    axios.get(apiUrl, {

    }).then((response) => {
      commit('setPropertyFieldTranslations', { results: response.data.translations })
    }, (err) => {
      console.log(err)
    })
  },
}

// mutations
const mutations = {
  updatePropertyFieldTranslation: (state, { result }) => {
    // result is a set of locale translations for one of the
    // array of propertyFieldTranslations
    // Find that set and update it
    let target = _.find(state.propertyFieldTranslations, {key: result[0].i18n_key})
    // console.log(target)
    target.translations = result
  },
  setPropertyFieldTranslations: (state, { results }) => {
    if (results) {
      results.forEach(function(result) {
        result.title = i18n.t(result.key)
      })
    }
    state.propertyFieldTranslations = results
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
