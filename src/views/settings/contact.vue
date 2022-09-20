<template>
	<div class="px-8">
		<h1 style="overflow: auto;">
			{{ $t("navs.contact") }}
		</h1>
		<v-divider />
		<div v-if="!loading">
			<v-divider />
			<!-- <v-select
				v-model="locale"
				:items="langs"
				:label="$t('fields.chooseLang')"
				@change="fetchGeneralSettings()"
			></v-select> -->
			<validation-observer ref="settingsUpdateForm" v-slot="{ invalid, reset }">
				<validation-provider
					v-slot="{ errors }"
					name="contacts_email"
					rules="required|email|max:150"
				>
					<v-text-field
						v-model="settings.contacts_email"
						:error-messages="errors"
						:label="$t('fields.contactEmail')"
						name="email"
						id="contact-email"
						type="email"
					></v-text-field>
				</validation-provider>
				<validation-provider
					v-slot="{ errors }"
					name="contacts_alt_email"
					rules="required|email|max:150"
				>
					<v-text-field
						v-model="settings.contacts_alt_email"
						:error-messages="errors"
						:label="$t('fields.contactEmailAlt')"
						name="email"
						id="contacts_alt_email"
						type="email"
					></v-text-field>
				</validation-provider>
				<validation-provider
					v-slot="{ errors }"
					name="phone"
					:rules="{
						required: true,
						max: 255,
						regex: /^[(+|00)](?:[0-9] ?){6,14}[0-9]$/
					}"
				>
					<v-text-field
						v-model="settings.contacts_phone"
						:error-messages="errors"
						:label="$t('fields.contactPhone')"
						name="phone"
						id="contact-phone"
						type="tel"
					></v-text-field>
				</validation-provider>
				<validation-provider
					v-slot="{ errors }"
					name="phone_alt"
					:rules="{
						required: true,
						max: 255,
						regex: /^[(+|00)](?:[0-9] ?){6,14}[0-9]$/
					}"
				>
					<v-text-field
						v-model="settings.contacts_phone_alt"
						:error-messages="errors"
						:label="$t('fields.contactPhoneAlt')"
						name="phone"
						id="contact-phone-alt"
						type="tel"
					></v-text-field>
				</validation-provider>

				<validation-provider
					v-slot="{ errors }"
					name="facebook"
					:rules="{
						required: true,
						max: 255,
						regex: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
					}"
				>
					<v-text-field
						v-model="settings.contacts_facebook"
						:error-messages="errors"
						:label="$t('fields.contactFacebook')"
						name="facebook"
						type="url"
						id="contact-facebook"
					></v-text-field>
				</validation-provider>
				<validation-provider
					v-slot="{ errors }"
					name="twitter"
					:rules="{
						required: true,
						max: 255,
						regex: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
					}"
				>
					<v-text-field
						v-model="settings.contacts_twitter"
						:error-messages="errors"
						:label="$t('fields.contactTwitter')"
						name="twitter"
						id="contact-twitter"
						type="url"
					></v-text-field>
				</validation-provider>
				<validation-provider
					v-slot="{ errors }"
					name="whatsapp"
					:rules="{
						required: true,
						max: 255,
						regex: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
					}"
				>
					<v-text-field
						v-model="settings.contacts_instagram"
						:error-messages="errors"
						:label="$t('fields.contactInstagram')"
						name="contacts_instagram"
						id="contact-whatsapp"
						type="url"
					></v-text-field>
				</validation-provider>

				<div class="ml-auto" style="width: fit-content">
					<v-btn
						type="reset"
						@click="
							reset();
							cancleEdit();
						"
						class="mr-4"
					>
						{{ $t("buttons.cancel") }}
					</v-btn>
					<v-btn
						color="blue lighten-1"
						class="white--text"
						:loading="loading"
						@click="updateGeneralSettings()"
						:disabled="invalid || loading"
					>
						{{ $t("buttons.update") }}
						<v-icon>mdi-pencil</v-icon>
					</v-btn>
				</div>
			</validation-observer>
		</div>
		<div class="mx-12" v-if="loading">
			<v-progress-linear
				indeterminate
				color="deep-purple darken-2"
			></v-progress-linear>
		</div>
	</div>
</template>

<script>
export default {
	name: "App",
	data: () => ({
		settings: null,
		loading: false
	}),
	mounted() {
		this.fetchGeneralSettings();
	},
	methods: {
		fetchGeneralSettings() {
			this.axios
				.get(`admin/settings`)
				.then(({ data }) => {
					this.settings = data.settings;

					// for (let i = 0; i < this.settings.length; i++) {
					// 	if (this.settings[i].key == "contacts_email") {
					// 		this.email = this.getTranslation(this.settings[i], "value");
					// 	} else if (this.settings[i].key == "contacts_main_phone") {
					// 		this.mainPhone = this.getTranslation(this.settings[i], "value");
					// 	} else if (this.settings[i].key == "contacts_fb") {
					// 		this.facebook = this.getTranslation(this.settings[i], "value");
					// 	} else if (this.settings[i].key == "contacts_twitter") {
					// 		this.twitter = this.getTranslation(this.settings[i], "value");
					// 	} else if (this.settings[i].key == "contacts_whatsup") {
					// 		this.whatsapp = this.getTranslation(this.settings[i], "value");
					// 	}
					// 	else if (this.settings[i].key == "about_us_description") {
					// 		this.whatsapp = this.getTranslation(this.settings[i], "value");
					// 	}
					// }
				})
				.finally(() => (this.loading = false));
		},
		updateGeneralSettings() {
			this.loading = true;
			const data = new FormData();
			data.append("contacts_email", this.settings.contacts_email);
			data.append("contacts_alt_email", this.settings.contacts_alt_email);
			data.append("contacts_phone", this.settings.contacts_phone);
			data.append("contacts_phone_alt", this.settings.contacts_phone_alt);
			data.append("contacts_facebook", this.settings.contacts_facebook);
			data.append("contacts_twitter", this.settings.contacts_twitter);
			data.append("contacts_instagram", this.settings.contacts_instagram);
			this.loading = true;
			this.axios
				.post(`admin/settings`, data, {
					headers: {
						"Content-Type": "multipart/formdata"
					}
				})
				.then(data => {
					this.$store.commit("notify", data.data.message);
					// window.location.reload();
				})
				.catch(errors => {
					if (
						errors.response &&
						errors.response.data &&
						errors.response.data.errors
					) {
						console.log(errors.response.data.errors);
						this.$refs.settingsUpdateForm.setErrors(
							errors.response.data.errors
						);
					}
				})
				.finally(() => (this.loading = false));
		},
		cancleEdit() {
			this.fetchGeneralSettings();
		}
	}
};
</script>
