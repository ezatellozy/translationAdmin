<template>
	<v-select
		:items="locales"
		v-model="locale"
		prepend-inner-icon=""
		append-icon=""
		dense
		light
		hide-selected
		hide-details
		style="max-width: 120px"
		class="mx-3 text-uppercase"
		solo
		@change="changeLocale"
	>
		<template v-slot:selection="{ item }">
			<div class="d-flex align-center">
				<img
					v-if="item === 'en'"
					src="@/assets/images/en.svg"
					width="22"
					alt=""
				/>
				<img
					v-if="item === 'ar'"
					src="@/assets/images/ar.svg"
					width="22"
					alt=""
				/>
				<span class="mx-1"></span>
				<span>{{ $t(`locales.${item}`) }}</span>
			</div>
		</template>
		<template v-slot:item="{ item }">
			<div class="d-flex align-center">
				<img
					v-if="item === 'en'"
					src="@/assets/images/en.svg"
					width="22"
					alt=""
				/>
				<img
					v-if="item === 'ar'"
					src="@/assets/images/ar.svg"
					width="22"
					alt=""
				/>
				<span class="mx-1"></span>
				<span>{{ $t(`locales.${item}`) }}</span>
			</div>
		</template>
	</v-select>
</template>

<script>
import Cookies from "js-cookie";
import { localize } from "vee-validate";

export default {
	data: () => ({
		locales: ["ar", "en"],
		locale: "en"
	}),

	mounted() {
		this.locale = this.$i18n.locale;
		this.$vuetify.rtl = this.$i18n.locale === "ar";
		localize(this.locale);
		Cookies.set("locale", this.$store.state.locale);
	},

	methods: {
		changeLocale(locale) {
			Cookies.set("locale", locale);
			this.$store.commit("setLoading", true);
			this.$store.commit("setLocale", locale);

			setTimeout(() => {
				window.location.reload();
			}, 300);
		}
	}
};
</script>
