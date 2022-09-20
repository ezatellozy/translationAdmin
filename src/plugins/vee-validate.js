import attributesAr from "@/locales/strings/validator/attributes/ar.js";
import attributesEn from "@/locales/strings/validator/attributes/en.js";
import {
	extend,
	localize,
	ValidationObserver,
	ValidationProvider
} from "vee-validate";
import ar from "vee-validate/dist/locale/ar.json";
import en from "vee-validate/dist/locale/en.json";
import * as rules from "vee-validate/dist/rules";
import Vue from "vue";

// Install English and Arabic locales.
localize({
	en: {
		...en,
		attributes: attributesEn
	},
	ar: {
		...ar,
		attributes: attributesAr
	}
});

Object.keys(rules).forEach(rule => {
	extend(rule, rules[rule]);
});

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
