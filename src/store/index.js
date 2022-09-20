import Cookies from "js-cookie";
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
// import request from "../plugins/axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notification: {
      display: false,
      status: null,
      color: "",
      text: ""
    },
    countries: [],
    locale: "ar",
    status: "",
    token: Cookies.get("token") || "",
    user: JSON.parse(localStorage.getItem("user")) || {}
  },
  mutations: {
    notify(state, text) {
      state.notification.display = true;
      state.notification.text = text;
    },
    success(state, text) {
      state.notification.display = true;
      state.notification.status = "success";
      state.notification.color = "green accent-3";
      state.notification.text = text;
    },
    danger(state, text) {
      state.notification.display = true;
      state.notification.status = "danger";
      state.notification.color = "red accent-3";
      state.notification.text = text;
    },
    closeNotification(state) {
      state.notification.display = false;
    },
    insertCountries(state, payload) {
      state.countries = payload;
    },
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state) {
      state.status = "success";
      state.token = Cookies.get("token");
      state.user = JSON.parse(localStorage.getItem("user"));
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
    setLocale(state, payload) {
      state.locale = payload;
    }
  },
  actions: {
    fetchCountries({ commit, state }) {
      if (state && state.countries && state.countries.length) {
        return;
      }

      axios.get("/admin/countries?per_page=all").then(({ data }) => {
        commit("insertCountries", data.data);
      });
    },

    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "admin/signin",
          data: user,
          method: "POST"
        })
          .then((resp) => {
            const token = resp.data.token;
            const user = resp.data.user;
            Cookies.set("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            // axios.headers.common["Authorization"] = "Bearer " + token;
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            commit("auth_success");
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            Cookies.remove("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("logout");
        axios({
          url: "/signout",
          method: "POST"
        });
        Cookies.remove("token");
        localStorage.removeItem("user");
        this.state.user = {};
        delete axios.defaults.headers.common["Authorization"];
        resolve();
        console.log(reject);
      });
    }
  },
  getters: {
    notification: (state) => state.notification,
    countries: (state) => state.countries,
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status
  },
  modules: {}
});
