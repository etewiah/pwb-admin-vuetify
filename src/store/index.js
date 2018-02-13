import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import propertiesStore from './modules/properties'
import navigationStore from './modules/navigation'
// import pagesStore from './modules/pages'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    propertiesStore,
    navigationStore,
    // pagesStore
  },
  state: {
    newProperty: "",
    pages: [],
    currencies: [],
  },
  actions: {
    // loadSetupInfo: function({ commit }) {
    //   axios.get('/api/v2/agency').then((response) => {
    //     let token = response.headers["x-csrf-token"]
    //     axios.defaults.headers.common['X-CSRF-Token'] = token
    //     commit('setSiteData', { result: response.data })
    //   }, (err) => {
    //     console.log(err)
    //   })
    // },
  },
  mutations: {
    setSiteData: (state, { result }) => {
      state.pages = result.website.admin_page_links
      state.currencies = result.setup.currencyFieldKeys
    }
  },
  getters: {

  }
})
export default store
