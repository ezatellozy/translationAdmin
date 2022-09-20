<template>
	<v-row justify="end">
		<v-dialog v-model="dialog" persistent max-width="600px">
			<template v-slot:activator="{ on, attrs }">
				<v-btn color="blue" dark elevation="0" v-bind="attrs" v-on="on">
					<v-icon>mdi-plus</v-icon>
					<span class="ml-1">Sentence dictionary create</span>
				</v-btn>
			</template>

			<div id="create-sentense-dictionary">
				<validation-observer
					v-slot="{ invalid }"
					@submit.prevent="submit"
					ref="form"
				>
					<v-card>
						<v-card-title class="mb-4">
							<span class="headline">إضافة عنصر جديد</span>
						</v-card-title>
						<v-card-text>
							<div class="d-flex justify-content-between">
								<validation-provider
									v-slot="{ errors }"
									name="Sentence_dictionary"
									class="d-block mx-auto my-auto w-1/2"
									rules="required|mimes:csv,xlsx|max:32768"
									style="width: 50%"
								>
									<!-- prepend-icon="mdi-cloud-upload " -->
									<v-file-input
										v-model="dectionaryFile"
										name="dectionary_file"
										accept="mimes:csv,xlsx"
										label=""
										placeholder="Select file"
									>
									</v-file-input>

									<span class="error--text">{{ errors[0] }}</span>
								</validation-provider>
								<validation-provider
									name="categories"
									rules="required"
									v-slot="{ errors }"
									style="width: 40%"
								>
									<v-select
										:items="categories"
										item-text="name"
										item-value="id"
										v-model="selectedCategory"
										label="Select Category"
									></v-select>
									<div v-if="errors[0]">
										<p class="red--text">
											{{ errors[0] }}
										</p>
									</div>
								</validation-provider>
							</div>
							<validation-provider
								name="invalid_arabic_chars"
								rules="required"
								v-slot="{ errors }"
							>
								<v-text-field
									label="Invalid arabic chars"
									v-model="invalidArabicChars"
									name="name"
									outlined
								></v-text-field>
								<div v-if="errors[0]">
									<p class="red--text">
										{{ errors[0] }}
									</p>
								</div>
							</validation-provider>
							<validation-provider
								name="invalidEnglishChars"
								rules="required"
								v-slot="{ errors }"
							>
								<v-text-field
									label="Invalid english chars"
									v-model="invalidEnglishChars"
									name="name"
									outlined
								></v-text-field>
								<div v-if="errors[0]">
									<p class="red--text">
										{{ errors[0] }}
									</p>
								</div>
							</validation-provider>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="grey" text @click="close()"> إغلاق </v-btn>
							<v-btn
								color="primary"
								elevation="0"
								@click="submit"
								:loading="loading"
								:disabled="invalid || loading"
							>
								إضافة
							</v-btn>
						</v-card-actions>
					</v-card>
				</validation-observer>
			</div>
		</v-dialog>
	</v-row>
</template>

<script>
export default {
	data() {
		return {
			dialog: false,
			dectionaryFile: null,
			loading: false,
			categories: [],
			selectedCategory: "",
			invalidArabicChars: "",
			invalidEnglishChars: "",
			createSentens: false
		};
	},
	mounted() {
		this.getCategories();
	},
	methods: {
		submit() {
			this.loading = true;
			const data = new FormData();
			if (this.dectionaryFile instanceof File) {
				data.append("file", this.dectionaryFile);
			}
			data.append("category_id", this.selectedCategory);
			data.append(
				"invalid_arabic_chars",
				this.invalidArabicChars
					.replace(/\s/g, "")
					.split("")
					.join(" ")
			);
			data.append(
				"invalid_english_chars",
				this.invalidEnglishChars
					.replace(/\s/g, "")
					.split("")
					.join(" ")
			);
			this.axios
				.post("admin/sentence-dictionaries", data)
				.then(() => {
					this.$store.commit("notify", "success");
					this.close();
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
				.finally(() => (this.loading = false));
		},
		close() {
			this.$refs.form.reset();
			this.dectionaryFile = null;
			this.selectedCategory = "";
			this.invalidArabicChars = "";
			this.invalidEnglishChars = "";
			this.dialog = false;
		},
		getCategories() {
			this.axios
				.get("categories")
				.then(data => {
					this.categories = data.data.data;
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
};
</script>

<style></style>
