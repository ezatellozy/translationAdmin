<template>
	<section class="pa-md-4">
		<div class="d-flex justify-space-between align-center mx-12 mt-6">
			<h2>
				{{ $t("navs.abstract") }}
			</h2>
		</div>
		<validation-observer ref="ABSTRACT" v-slot="{ invalid }">
			<div class="d-flex justify-space-around align-end mx-6 mt-6">
				<div style="width: 100%">
					<validation-provider
						v-slot="{ errors }"
						name="abstractDescription"
						rules="required|max:1500"
					>
						<v-textarea
							outlined
							:label="$t('fields.description')"
							v-model="settings.about_us_description"
							:error-messages="errors"
							name="abstractDescription"
							id="abstractDescription"
						>
						</v-textarea>
					</validation-provider>
					<div class="d-flex align-end flex-column mb-6">
						<v-btn
							:disabled="invalid"
							class="white--text"
							color="blue lighten-1"
							@click="Update()"
						>
							{{ $t("buttons.update") }}
							<v-icon>mdi-pencil</v-icon>
						</v-btn>
					</div>
				</div>
			</div>
		</validation-observer>
	</section>
</template>

<script>
export default {
	components: {},
	data: () => ({
		settings: [],
		page: 1,
		meta: {},
		aboutUsVideo: "",
		loading: true
	}),
	mounted() {
		this.fetchSwtting();
	},
	methods: {
		fetchSwtting() {
			this.axios
				.get("admin/settings")
				.then(({ data }) => {
					this.settings = data.settings;
					// for (let i = 0; i < this.settings.length; i++) {
					//   if (this.settings[i].key == "about_us_description") {
					//     this.aboutUsDescription_en = this.settings[i].value_en;
					//     this.aboutUsDescription_ar = this.settings[i].value_ar;
					//   } else if (this.settings[i].key == "about_us_video") {
					//     this.aboutUsVideo = this.getTranslation(
					//       this.settings[i],
					//       "value"
					//     );
					//   } else {
					//     console.log(this.settings[i].key);
					//   }
					// }
				})

				.then(data => {
					this.$store.commit("notify", data.data.message);
					window.location.reload();
				})
				.catch(errors => {
					if (
						errors.response &&
						errors.response.data &&
						errors.response.data.errors
					) {
						console.log(errors.response.data.errors);
						this.$refs.ABSTRACT.setErrors(errors.response.data.errors);
					}
				})
				.finally(() => (this.loading = false));
		},
		Update() {
			const data = new FormData();

			data.append("about_us_description", this.settings.about_us_description);

			this.axios.post("admin/settings", data);
		}
	}
};
</script>
