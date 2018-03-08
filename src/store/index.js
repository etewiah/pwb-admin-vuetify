import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import propertiesStore from "./modules/properties";
import propertyFeaturesStore from "./modules/property-features";
import propertyFieldsStore from "./modules/property-fields";
import navigationStore from "./modules/navigation";
import pagesStore from "./modules/pages";
import { app } from "../main";
Vue.use(Vuex);

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
    currentLocale: "en",
    // Below allows invalidating the localstorage store
    // by incrementing it
    lsVersion: "0.0.1"
  },
  actions: {
    loadSetupInfo: function({ commit }) {
      commit("initialiseStore");
      axios.get("/api/v2/agency").then(
        response => {
          let token = response.headers["x-csrf-token"];
          axios.defaults.headers.common["X-CSRF-Token"] = token;
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
      let validLsPresent = false;
      let lsStore = {};
      // Check if the store exists
      if (localStorage.getItem("pwb_store")) {
        lsStore = JSON.parse(localStorage.getItem("pwb_store"));

        // Check the version stored against current. If different, don't
        // load the cached version
        if (lsStore.lsVersion === state.lsVersion) {
          validLsPresent = true;
        }
      }
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
      state.pages = result.website.admin_page_links;
      state.currencies = result.setup.currencyFieldKeys;
      state.supportedLocales = result.website.supported_locales;
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
