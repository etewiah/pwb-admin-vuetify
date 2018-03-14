import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import propertiesStore from "./modules/properties";
import propertyFeaturesStore from "./modules/property-features";
import propertyFieldsStore from "./modules/property-fields";
import navigationStore from "./modules/navigation";
import pagesStore from "./modules/pages";
import agencyStore from "./modules/agency";
import { app } from "../main";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    propertiesStore,
    navigationStore,
    propertyFeaturesStore,
    propertyFieldsStore,
    pagesStore,
    agencyStore
  },
  state: {
    newProperty: "",
    pages: [],
    currencies: [],
    supportedLocales: [],
    currentLocale: "en",
    // currentAgency: {},
    // Below allows invalidating the localstorage store
    // by incrementing it
    lsVersion: "0.0.2"
  },
  actions: {
    loadSetupInfo: function({ commit }) {
      commit("initialiseStore");
      axios.get("/api/v2/agency").then(
        response => {
          let token = response.headers["x-csrf-token"];
          axios.defaults.headers.common["X-CSRF-Token"] = token;
          localStorage.csrfToken = token;
          commit('setCurrentAgency', { result: response.data.agency })
          // above in the agency store
          commit("setSiteData", { result: response.data });
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  mutations: {
    initialiseStore(state) {
      localStorage.SiteData = undefined;
      localStorage.WebSiteData = undefined; // Joe Vago's use of storing data in localStorage instead of Vuex
      let validLsPresent = false;
      let lsStore = {};
      // Check if the store exists
      // 14 March 2018 - disabling this - premature optimisation that causes confusion while developing
      // if (localStorage.getItem("pwb_store")) {
      //   lsStore = JSON.parse(localStorage.getItem("pwb_store"));
      //   // Check the version stored against current. If different, don't
      //   // load the cached version
      //   if (lsStore.lsVersion === state.lsVersion) {
      //     validLsPresent = true;
      //   }
      // }
      if (validLsPresent) {
        this.replaceState(
          // If there is a valid localStore, use it to populate state
          Object.assign(state, lsStore)
        );
      } else {
        // or else create a valid localStore
        localStorage.setItem("pwb_store", JSON.stringify(state));
        // state.lsVersion = lsVersion;
      }
    },
    setSiteData: (state, { result }) => {
      // state.currentAgency = result.agency;
      state.pages = result.website.admin_page_links;
      state.currencies = result.setup.currencyFieldKeys;
      state.supportedLocales = result.website.supported_locales;
      if (localStorage.WebSiteData.length < 20) {
        localStorage.SiteData = JSON.stringify(result);
        result.website.hasChanges = false;
        localStorage.WebSiteData = JSON.stringify(result.website); // !!remember to use JSON.parse() to read the values back
      }
    },
    setCurrentLocale: (state, locale) => {
      state.currentLocale = locale;
      // app.$i18n.locale = locale
      // localStorage.setItem('pwb_store.currentLocale', JSON.stringify(locale));
    }
  },
  getters: {}
});
export default store;
