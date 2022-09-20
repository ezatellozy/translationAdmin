import Cookies from "js-cookie";
import Vue from "vue";
import Vuex from "vuex";
import request from "../plugins/axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    isLoading: false,
    notification: {
      display: false,
      text: ""
    },
    locale: Cookies.get("locale") || "en",
    countries: []
  },
  mutations: {
    setLoading(state, loading = false) {
      state.isLoading = loading;
    },
    setLocale(state, payload) {
      state.locale = payload;
    },
    setLoggedIn(state, loggedIn = false) {
      state.loggedIn = loggedIn;
    },
    notify(state, text) {
      state.notification.display = true;
      state.notification.text = text;
    },
    closeNotification(state) {
      state.notification.display = false;
    },
    insertCountries(state, payload) {
      state.countries = payload;
    }
  },
  actions: {
    fetchCountries({ commit, state }) {
      if (state && state.countries && state.countries.length) {
        return;
      }

      request.get("/admin/countries?per_page=all").then(({ data }) => {
        commit("insertCountries", data.data);
      });
    }
  },
  getters: {
    notification: (state) => state.notification,
    countries: (state) => state.countries,
    loggedIn: (state) => state.loggedIn,
    isLoading: (state) => state.isLoading
  },
  modules: {}
});
