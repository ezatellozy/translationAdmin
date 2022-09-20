<template>
	<v-row justify="end" class="mx-2">
		<v-dialog v-model="dialog" persistent max-width="600px">
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					color="primary"
					small
					depressed
					@click.native="getItem"
					v-bind="attrs"
					v-on="on"
				>
					<v-icon small>mdi-pencil</v-icon>
					<span class="ml-2">تعديل</span>
				</v-btn>
			</template>
			<validation-observer
				v-if="item"
				v-slot="{ invalid }"
				@submit.prevent="submit"
				ref="serviceEditForm"
			>
				<v-card :loading="loading" rounded="50">
					<v-card-title class="mb-4 d-flex justify-space-between align-center">
						<span class="headline">تعديل خدمة</span>
					</v-card-title>
					<v-card-text>
						<validation-provider
							name="englishSentense"
							rules="required"
							v-slot="{ errors }"
						>
							<v-textarea
								label="English Sentense"
								v-model="item.english_sentence"
								name="englishSentense"
								outlined
							></v-textarea>

							<div v-if="errors[0]">
								<p class="red--text">
									{{ errors[0] }}
								</p>
							</div>
						</validation-provider>
						<validation-provider
							name="arabicSentense"
							rules="required"
							v-slot="{ errors }"
						>
							<v-textarea
								label="Arabic Sentense"
								v-model="item.arabic_sentence"
								name="arabicSentense"
								outlined
							></v-textarea>

							<div v-if="errors[0]">
								<p class="red--text">
									{{ errors[0] }}
								</p>
							</div>
						</validation-provider>
					</v-card-text>
					<v-card-actions>
						<!-- <deleter big name="services" :id="id" /> -->
						<v-spacer></v-spacer>
						<v-btn color="grey" text @click="close()"> إغلاق </v-btn>
						<v-btn
							color="primary"
							elevation="0"
							@click="submit"
							:disabled="invalid"
						>
							تحديث
						</v-btn>
					</v-card-actions>
				</v-card>
			</validation-observer>
		</v-dialog>
	</v-row>
</template>

<script>
export default {
	props: ["id"],

	data: () => ({
		item: [],
		loading: false,
		dialog: false
	}),

	methods: {
		getItem() {
			this.axios.get(`sentence-dictionaries/${this.id}`).then(data => {
				this.item = data.data.sentence_dictionary;
				console.log(this.item);
			});
		},
		submit() {
			this.loading = true;
			const item = new FormData();
			item.append("_method", "PUT");
			item.append("english_sentence", this.item.english_sentence);
			item.append("arabic_sentence", this.item.arabic_sentence);
			item.append("category_id", this.item.category.id);

			this.axios
				.post(`admin/sentence-dictionaries/${this.id}`, item)
				.then(() => {
					this.$emit("updated");
					this.$store.commit("success", "تم التعديل بنجاح");
					this.dialog = false;
				})
				.catch(errors => {
					if (
						errors.response &&
						errors.response.data &&
						errors.response.data.errors
					) {
						console.log(errors.response.data.errors);
						this.$refs.form.setErrors(errors.response.data.errors);
						this.$store.commit("danger", "error");
					}
				})
				.finally(() => {
					this.loading = false;
				});
		},
		close() {
			this.item = null;
			this.spicific = "";
			this.specifications = [];
			this.mainMedia = null;
			this.mainPreviewUrl = null;
			this.$refs.serviceEditForm.reset();
			this.dialog = false;
		}
	},
	mounted() {}
};
</script>
