<template>
	<div>
		<v-row justify="center" class="d-inline-block mx-4">
			<v-dialog v-model="dialog" persistent max-width="600px">
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						color="blue lighten-1"
						class="white--text"
						v-bind="attrs"
						v-on="on"
					>
						{{ $t("buttons.update") }}
						<v-icon>mdi-pencil</v-icon>
					</v-btn>
				</template>
				<v-card>
					<v-card-title>
						<span class="headline">{{ $t("headings.updateFeature") }}</span>
					</v-card-title>
					<validation-observer
						ref="featureUpdateForm"
						v-slot="{ invalid, reset }"
						style="width: 100%; height: 100%;"
					>
						<v-card-text>
							<div>
								<form
									@submit.prevent="updateFeature()"
									class="d-flex flex-column"
									style="margin-left: 10px; height: 100%;"
								>
									<validation-provider
										v-slot="{ errors }"
										name="updateimage"
										class="d-block mx-auto my-auto"
										style="width: 100%"
										rules="image|mimes:png,jpeg,svg|size:2048"
									>
										<v-file-input
											@change="previewUpdatedImage($event)"
											v-model="image"
											ref="updateImageUploader"
											name="updateimage"
											accept="image/png, image/jpeg"
											label="change"
										>
											fdsfdsfsd
										</v-file-input>
										<label style="cursor: pointer">
											<v-icon
												v-if="!updatedFeature.image"
												style="width: 100%; min-height: 200px;"
												>mdi-image-edit</v-icon
											>
											<v-img
												v-if="updatedFeature.image"
												cover
												:src="previewUrl"
												:alt="updatedFeature.title"
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
										name="update-title"
										class="d-block"
										style="width:"
										rules="required|max:150"
									>
										<v-text-field
											v-model="updatedFeature.title"
											:label="$t('fields.title')"
											:error-messages="errors"
											name="update-title-en"
											outlined
										></v-text-field>
									</validation-provider>
									<validation-provider
										v-slot="{ errors }"
										name="update-text"
										class="d-block"
										style="width:"
										rules="required"
									>
										<v-textarea
											v-model="updatedFeature.text"
											:label="$t('fields.title')"
											:error-messages="errors"
											name="update-text"
											outlined
										></v-textarea>
									</validation-provider>
								</form>
							</div>
						</v-card-text>
						<v-card-actions>
							<delete-modal @deleted="deleteFeature(updatedFeature)" />
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
								@click="updateFeature()"
								:disabled="invalid || loading"
							>
								{{ $t("buttons.update") }}
								<v-icon>mdi-pencil</v-icon>
							</v-btn>
						</v-card-actions>
					</validation-observer>
				</v-card>
			</v-dialog>
		</v-row>
	</div>
</template>

<script>
import DeleteModal from "@/components/DeleteModal.vue";
export default {
	components: { DeleteModal },
	props: ["feature"],
	data: () => ({
		dialog: false,
		loading: false,
		updatedFeature: {
			text: "",
			title: "",

			is_visible: true,
			image: null,
			id: ""
		},
		previewUrl: null,
		image: null
	}),
	methods: {
		updateFeature() {
			const editFeature = new FormData();
			editFeature.append("_method", "PUT");

			editFeature.append("text", this.updatedFeature.text);
			editFeature.append("title", this.updatedFeature.title);
			if (this.updatedFeature.image instanceof File) {
				editFeature.append("main_media", this.updatedFeature.image);
			}
			this.loading = true;
			this.axios
				.post(`admin/features/${this.updatedFeature.id}`, editFeature, {
					headers: {
						"Content-Type": "multipart/formdata"
					}
				})
				.then(data => {
					this.$store.commit("notify", data.data.message);
					this.dialog = false;
					this.$emit("updated");
				})
				.catch(errors => {
					if (
						errors.response &&
						errors.response.data &&
						errors.response.data.errors
					) {
						console.log(errors.response.data.errors);
						this.$refs.featureUpdateForm.setErrors(errors.response.data.errors);
					}
				})
				.finally(() => (this.loading = false));
		},
		deleteFeature(feature) {
			this.axios
				.post(`admin/features/${feature.id}`, {
					_method: "Delete"
				})
				.then(data => {
					this.$store.commit("notify", data.data.message);
					// this.fetchFeatures();
					this.$emit("deleted");
				});
		},
		previewUpdatedImage(event) {
			this.updatedFeature.image = event;
			this.previewUrl = URL.createObjectURL(this.image);
		},
		cancled() {
			this.updatedFeature.title = this.feature.title;
			this.updatedFeature.text = this.feature.text;
			this.updatedFeature.image = this.feature.main_media;
			this.updatedFeature.id = this.feature.id;
			this.previewUrl = this.updatedFeature.image.path;
			this.dialog = false;
		}
	},
	mounted() {
		this.cancled();
	}
};
</script>
