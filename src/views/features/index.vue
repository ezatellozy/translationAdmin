<template>
	<div class="px-8">
		<div class="d-flex justify-space-between align-center mt-6">
			<h2 class=" ">{{ $t("navs.features") }}</h2>
			<feature-creat-modal @created="fetchFeatures()" />
		</div>
		<div>
			<v-row v-if="features.length">
				<v-col
					cols="4"
					v-for="feature in features"
					:key="feature.id"
					style="height: auto"
				>
					<v-card
						class="mx-auto "
						max-width="374"
						style="position: static; height:100%;display: flex; flex-direction: column;"
					>
						<div>
							<v-img
								height="250"
								v-if="feature.main_media"
								:src="feature.main_media.path"
							></v-img>
						</div>
						<v-card-title>{{ feature.title }}</v-card-title>
						<v-card-text>
							<p>{{ feature.text }}</p>
						</v-card-text>

						<v-divider class="mx-4 mb-4"></v-divider>
						<v-card-actions>
							<div class="d-flex">
								<feature-update-modal
									:feature="feature"
									@updated="fetchFeatures()"
									@deleted="fetchFeatures()"
								/>

								<delete-modal @deleted="deleteFeature(feature)" />
							</div>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</div>

		<div class="mx-12" v-if="loading">
			<v-progress-linear
				indeterminate
				color="deep-purple darken-2"
			></v-progress-linear>
		</div>
		<div v-if="features.length" class="d-flex justify-end mx-12 mt-6">
			<v-pagination
				color="deep-purple"
				v-model="page"
				@input="fetchFeatures"
				:length="meta.last_page"
				:total-visible="6"
			></v-pagination>
		</div>
	</div>
</template>

<script>
import FeatureCreatModal from "@/components/FeatureCreateModal";
import FeatureUpdateModal from "@/components/FeatureUpdateModal";
import DeleteModal from "@/components/DeleteModal.vue";
export default {
	data: () => ({
		features: [],
		page: 1,
		meta: {},
		loading: true
	}),
	components: {
		FeatureCreatModal,
		FeatureUpdateModal,
		DeleteModal
	},

	mounted() {
		this.fetchFeatures();
	},

	methods: {
		fetchFeatures() {
			this.loading = true;
			this.features = [];
			this.axios
				.get(`admin/features?page=${this.page}`)
				// .then(({ data, meta }) => {
				.then(({ data }) => {
					this.features = data.data;
					this.meta = data.meta;
				})
				.finally(() => (this.loading = false));
		},

		updateFeature(feature) {
			const featured = new FormData();
			featured.append("_method", "PUT");
			featured.append("title_en", feature.title_en);
			featured.append("title_ar", feature.title_ar);
			featured.append("description_en", feature.description_en);
			featured.append("description_ar", feature.description_ar);
			featured.append("index", feature.index);
			featured.append("is_visible", feature.is_visible);
			this.loading = true;
			this.axios
				.post(`admin/features/${feature.key}`, featured, {
					headers: {
						"Content-Type": "multipart/formdata"
					}
				})
				.then(data => {
					this.$store.commit("notify", data.data.message);
					// this.close(true);
					window.location.reload();
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
		deleteFeature(feature) {
			this.axios
				.post(`admin/features/${feature.id}`, {
					_method: "Delete"
				})
				.then(data => {
					this.$store.commit("notify", data.data.message);
					this.fetchFeatures();
				});
		},
		getDate(date) {
			return date && date.date ? date.date : date;
		}
		// paginate(page) {
		//   console.log(page);
		// }
	}
};
</script>
