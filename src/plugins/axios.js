// import { getMainService } from "@/helpers";
import axios from "axios";
import Vue from "vue";
import VueAxios from "vue-axios";
import Cookies from "js-cookie";

window.apiurl = `https://translation.api.shrbat.com/api`;
if (Cookies.get("token")) {
	axios.defaults.headers.common["Authorization"] =
		"Bearer " + Cookies.get("token");
}
const request = axios.create({
	baseURL: window.apiurl,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	}
});

request.interceptors.request.use(
	config => {
		if (config.method.toLocaleLowerCase() !== "get") {
			if (config.data instanceof FormData) {
				let haveLocale;
				for (var pair of config.data.entries()) {
					if (pair[0] === "locale") {
						haveLocale = true;
					}
				}
				haveLocale ? "" : config.data.append("locale", Cookies.get("locale"));
			} else {
				if (config.data) {
					config.data.locale = Cookies.get("locale");
				}
			}
		} else {
			if (config.headers["X-Locale"]) {
				// console.log("we have x-locale", config.headers["X-Locale"]);
			} else {
				config.headers["X-Locale"] = Cookies.get("locale");
			}
		}
		return config;
	},
	err => {
		return Promise.reject(err);
	}
);

axios.defaults.baseURL = `https://translation.api.shrbat.com/api`;

Vue.use(VueAxios, request);

export default request;
