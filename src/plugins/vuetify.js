import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		options: {
			customProperties: true
		},
		themes: {
			light: {
				primary: "#1d5e83",
				secondary: "#e7cdac",
				accent: "#82B1FF",
				error: "#e36968",
				info: "#2196F3",
				success: "#61bca1",
				warning: "#f4be5e"
			}
		}
	}
});
