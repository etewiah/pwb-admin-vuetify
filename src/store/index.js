import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import propertiesStore from './modules/properties'
import propertyFeaturesStore from './modules/property-features'
import propertyFieldsStore from './modules/property-fields'
import navigationStore from './modules/navigation'
import pagesStore from './modules/pages'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    propertiesStore,
    navigationStore,
    propertyFeaturesStore,
    propertyFieldsStore,
    pagesStore
  },
  state: {
    newProperty: "",
    pages: [],
    currencies: [],
    supportedLocales: [],
  },
  actions: {
    loadSetupInfo: function({ commit }) {
      axios.get('/api/v2/agency').then((response) => {
        let token = response.headers["x-csrf-token"]
        axios.defaults.headers.common['X-CSRF-Token'] = token
        commit('setSiteData', { result: response.data })
      }, (err) => {
        console.log(err)
      })
    },
  },
  mutations: {
    setSiteData: (state, { result }) => {
      state.pages = result.website.admin_page_links
      state.currencies = result.setup.currencyFieldKeys
      state.supportedLocales = result.website.supported_locales
    }
  },
  getters: {

  }
})
export default store
