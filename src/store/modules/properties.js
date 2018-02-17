// import shop from '../../api/shop'
// import * as types from '../mutation-types'
import axios from 'axios'

// initial state
const state = {
  all: [],
  properties: [],
  pendingChanges: {},
  hasPendingChanges: false,
  currentProperty: {
    attributes: {}
  },
  fieldOptions: {},
  newProperty: {}
}

// getters
const getters = {
  // allProducts: state => state.all
}

// actions
const actions = {


  loadPropertyFieldOptions: function({ commit }, fieldNames) {
    axios.get('/api/v1/select_values', {
      params: {
        field_names: fieldNames
      }
    }).then((response) => {
      // this data isn't monitored so setting it directly
      state.fieldOptions = response.data
      // commit('setProperties', { result: response.data })
    }, (err) => {
      console.log(err)
    })
  },
  loadProperties: function({ commit }) {
    axios.get('/api/v2/properties', {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      }
    }).then((response) => {
      commit('setProperties', { result: response.data })
    }, (err) => {
      console.log(err)
    })
  },
  loadProperty: function({ commit }, propertyId) {
    let apiUrl = '/api/v2/properties/' + propertyId
    axios.get(apiUrl, {

    }).then((response) => {
      commit('setFeaturesPropertyId', { result: response.data.id })
      // commit('setPropertyFeatures', { result: response.data.features_list })
      commit('setCurrentProperty', { result: response.data })
    }, (err) => {
      console.log(err)
    })
  },
  updateProperty({ commit, state }) {
    let apiUrl = '/api/v2/properties/' + state.currentProperty.id
    if (state.hasPendingChanges) {
      Object.keys(state.pendingChanges).forEach(function(pendingChangeKey) {
        state.currentProperty[pendingChangeKey] = state.pendingChanges[pendingChangeKey]
      })
    }
    commit('setHasPendingChanges', false)
    state.pendingChanges = {}

    // console.log(axios.defaults.headers.common)
    axios.put(apiUrl, {
      property: state.currentProperty
    }, {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      }
    }).then(response => {
      commit('setCurrentProperty', { result: response.data })
    })
  },
  createProperty({ commit, state }) {
    // if (!state.newProperty) {
    //   return
    // }
    let apiUrl = '/api/v2/properties/'
    axios.post(apiUrl, {
      new_property: state.pendingChanges
    }).then(result => {
      // commit('setNewProperty', property)
    })
  },
  // Below will compare changes made to a field's value in a form
  // to the original value and decide if there are changes
  // yet to be saved to the server
  // If there are pending changes, an update button will display
  updatePendingChanges({ commit, state }, fieldDetails) {
    let fieldHasChanged = false
    // let pendingChange = {}
    let newValue = fieldDetails.newValue
    if (fieldDetails.fieldDbType === "int") {
      newValue = parseInt(fieldDetails.newValue)
      // fieldHasChanged = (parseInt(fieldDetails.newValue) !== state.currentProperty[fieldDetails.fieldName])
    }
    fieldHasChanged = (newValue !== state.currentProperty[fieldDetails.fieldName])
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
  },
  // setNewProperty(state, propertyObject) {
  //   state.properties.push(propertyObject)
  // },
  clearNewProperty(state) {
    state.newProperty = ''
  },
  setCurrentProperty: (state, { result }) => {
    state.currentProperty = result
  },
  setProperties: (state, { result }) => {
    state.properties = result
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
