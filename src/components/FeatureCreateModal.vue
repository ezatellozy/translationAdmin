<template>
	<v-row justify="end" class="mr-4">
		<v-dialog v-model="dialog" persistent max-width="600px">
			<template v-slot:activator="{ on, attrs }">
				<v-btn color="primary" v-bind="attrs" v-on="on">
					{{ $t("buttons.createFeature") }}
				</v-btn>
			</template>
			<v-card>
				<v-card-title>
					<span class="headline">{{ $t("buttons.createFeature") }}</span>
				</v-card-title>

				<validation-observer
					ref="featureCreateForm"
					v-slot="{ invalid, reset }"
					style="width: 100%; height: 100%;"
				>
					<v-card-text>
						<div>
							<form
								@submit.prevent="createFeature()"
								class="d-flex flex-column"
								style="margin-left: 10px; height: 100%;"
								rules="image|mimes:png,jpeg,svg|size:2048"
							>
								<validation-provider
									v-slot="{ errors }"
									name="createimage"
									class="d-block mx-auto my-auto"
									style="width: 100%"
								>
									<v-file-input
										@change="previewCreatedImage($event)"
										v-model="image"
										ref="createImageUploader"
										class="d-none"
										name="createimage"
										accept="image/png, image/jpeg"
										label=""
										id="feature-create-image"
									>
									</v-file-input>
									<label for="feature-create-image" style="cursor: pointer">
										<v-icon
											v-if="!createdFeature.image"
											style="width: 100%; min-height: 200px;"
											>mdi-image-edit</v-icon
										>
										<v-img
											v-if="createdFeature.image"
											cover
											:src="previewUrl"
											:alt="createdFeature.title"
											:aspect-ratio="3.4"
										/>
									</label>
									<span
										class="error--text d-inline-block"
										style="margin-left: 50%; transform: translateX(-50%);"
										>{{ errors[0] }}</span
									>
								</validation-provider>

								<validation-provider
									v-slot="{ errors }"
									name="create-title"
									class="d-block"
									style="width:"
									rules="required"
								>
									<v-text-field
										v-model="createdFeature.title"
										:label="$t('fields.title')"
										:error-messages="errors"
										name="create-title-en"
										outlined
									></v-text-field>
								</validation-provider>
								<validation-provider
									v-slot="{ errors }"
									name="create-text"
									class="d-block"
									style="width:"
									rules="required|max:150"
								>
									<v-text-field
										v-model="createdFeature.text"
										:label="$t('fields.title')"
										:error-messages="errors"
										name="create-title-ar"
										outlined
									></v-text-field>
								</validation-provider>
							</form>
						</div>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							depressed
							tile
							@click="
								reset();
								cancled();
							"
						>
							{{ $t("buttons.cancel") }}
						</v-btn>
						<v-btn
							depressed
							tile
							color="blue lighten-1"
							class="white--text"
							:loading="loading"
							@click="createFeature()"
							:disabled="invalid || loading || !image"
						>
							{{ $t("buttons.create") }}
						</v-btn>
					</v-card-actions>
				</validation-observer>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
export default {
	data: () => ({
		dialog: false,
		loading: false,
		createdFeature: {
			text: "",
			title: "",

			image: null
		},
		previewUrl: null,
		image: null
	}),
	methods: {
		createFeature() {
			const feature = new FormData();
			feature.append("title", this.createdFeature.title);
			feature.append("text", this.createdFeature.text);
			feature.append("main_media", this.createdFeature.image);

			this.loading = true;
			this.axios
				.post(
					"admin/features",

					feature,
					{
						headers: {
							"Content-Type": "multipart/formdata"
						}
					}
				)
				.then(data => {
					this.$store.commit("notify", data.data.message);
					this.cancled();
					// this.dialog = false;
					this.$emit("created");
				})
				.catch(errors => {
					if (
						errors.response &&
						errors.response.data &&
						errors.response.data.errors
					) {
						console.log(errors.response.data.errors);
						this.$refs.featureCreateForm.setErrors(errors.response.data.errors);
					}
				})
				.finally(() => (this.loading = false));
		},
		previewCreatedImage(event) {
			this.createdFeature.image = event;
			this.previewUrl = URL.createObjectURL(this.image);
		},
		cancled() {
			this.createdFeature.title = "";
			this.createdFeature.text = "";

			this.createdFeature.image = null;
			this.image = null;
			this.previewUrl = null;
			this.dialog = false;
		}
	}
};
</script>
