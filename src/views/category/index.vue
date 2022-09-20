<template>
	<div>
		<div class="mx-12 my-6 d-flex align-center justify-space-between">
			<!-- <h2>{{ categories }}</h2> -->
			<!-- <h2>{{ categoryName }}</h2> -->
			<!-- <template>
				<div class="text-center mx-12">
					<v-menu>
						<template v-slot:activator="{ on, attrs }">
							<v-btn v-bind="attrs" v-on="on"> {{ categoryName }} </v-btn>
						</template>

						<v-list>
							<v-list-item
								v-for="category in categoriesUrls"
								:key="category.id"
								@click="fetchItems(category)"
							>
								<v-list-item-title> {{ category.name }}</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
				</div>
			</template> -->

			<category-store-modal
				@created="fetchCategories"
				@updated="fetchCategories"
			/>
		</div>
		<div class="mx-12" v-if="loading">
			<v-progress-linear indeterminate color="primary"></v-progress-linear>
		</div>
		<v-simple-table class="mx-12 elevation-6">
			<template v-slot:default>
				<thead>
					<tr class="grey lighten-4">
						<th class="h4">الاسم</th>
						<th class="h4 text-center" style="width: 250px">اﻹجراءات</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in categories" :key="item.id">
						<td>
							{{ item.name }}
						</td>
						<td
							class="text-center d-flex justify-center align-center"
							style="width: 250px"
						>
							<category-edit-modal
								v-if="item.slug"
								:category="item"
								@updated="fetchCategories()"
							/>

							<delete-modal @deleted="deleteCategory(item)" />
						</td>
					</tr>
				</tbody>
				<tfoot class="grey lighten-2">
					<tr>
						<td colspan="9999">
							<div
								class="d-flex justify-space-between align-center"
								v-if="meta"
							>
								<div>
									<span v-if="meta && meta.current_page">
										{{ meta.total }} عنصر
									</span>
								</div>
								<div class="d-flex align-center">
									<div class="mr-2">
										صفحة <strong>{{ page }}</strong> من
										<strong>{{ meta.last_page }}</strong>
									</div>
									<v-pagination
										color="primary"
										v-model="page"
										@input="fetchCategories"
										:length="meta.last_page"
										:total-visible="6"
									></v-pagination>
								</div>
							</div>
						</td>
					</tr>
				</tfoot>
			</template>
		</v-simple-table>
	</div>
</template>

<script>
import CategoryEditModal from "@/components/CategoryEditModal.vue";
import CategoryStoreModal from "@/components/CategoryStoreModal.vue";
import DeleteModal from "@/components/DeleteModal.vue";
export default {
	components: { DeleteModal, CategoryEditModal, CategoryStoreModal },
	data() {
		return {
			categories: [],
			page: 1,
			meta: null,
			loading: true
		};
	},
	methods: {
		fetchCategories(withPagination = false) {
			this.loading = true;
			const params = { page: this.page };
			if (withPagination === true) {
				params.page = 1;
			}
			this.axios
				.get("categories", { params })
				.then(data => {
					this.categories = data.data.data;
					this.meta = data.data.meta;
					this.page = data.data.meta.current_page;
					console.log(this.meta);
				})
				.finally(() => (this.loading = false));
		},
		deleteCategory(item) {
			this.axios
				.delete(`admin/categories/${item.slug}`, {
					_method: "DELETE"
				})
				.then(data => {
					this.$store.commit("notify", data.data.message);
					this.fetchFeatures();
				});
		}
	},
	mounted() {
		this.fetchCategories();
	}
};
</script>

<style></style>
