<template>
	<section class="px-8">
		<div class="d-flex justify-space-between align-center mt-6">
			<h2 class=" ">{{ $t("navs.sentenses") }}</h2>
		</div>
		<div>
			<sentenses-store-modal @created="getCategories()" />
			<sentense-update-bluck :lang="lang" @created="getCategories()"/>
		</div>
		<div v-if="loading">
			<v-progress-linear indeterminate color="primary"></v-progress-linear>
		</div>
		<div class="search d-flex justify-content-center align-center">
			<v-select
				style="max-width:100px"
				name="lang"
				:items="lang"
				item-text="name"
				item-value="value"
				v-model="selectedLang"
				label="Select language"
			></v-select>
			<v-text-field
				v-model="searchInput"
				@input="getSentences('search')"
				label="Enter word to search"
				class="mx-10"
			></v-text-field>
		</div>
		<v-simple-table class="elevation-6">
			<template v-slot:default>
				<thead>
					<tr class="grey lighten-4">
						<th class="h4">English Sentenses</th>
						<th class="h4 col-5">Arabic Sentenses</th>
						<th class="h4 text-center">اﻹجراءات</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="sentence in sentences" :key="sentence.id">
						<td>
							{{ sentence.english_sentence }}
						</td>
						<td>
							{{ sentence.arabic_sentence }}
						</td>
						<td class="text-center">
							<sentense-update
								v-if="sentence.id"
								:id="sentence.id"
								@update="getSentences"
							/>
							<!-- <deleter v-if="item.id" name="products" :id="item.id" /> -->
						</td>
					</tr>
				</tbody>
				<tfoot class="grey lighten-2">
					<tr>
						<td colspan="9999">
							<div class="d-flex justify-space-between align-center">
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
										@input="getSentences"
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
	</section>
</template>

<script>
import SentensesStoreModal from "@/components/SentensesStoreModal.vue";
import SentenseUpdateBluck from "@/components/SentenseUpdateBluck.vue";
import SentenseUpdate from "@/components/SentenseUpdate.vue";
export default {
	components: { SentensesStoreModal, SentenseUpdate, SentenseUpdateBluck },
	data() {
		return {
			lang: [
				{ id: 1, name: "Arabic", value: "arabic" },
				{ id: 2, name: "English", value: "english" }
			],
			selectedLang: "english",
			dectionaryFile: null,
			loading: false,
			sentences: [],
			selectedCategory: "",
			invalidArabicChars: "",
			invalidEnglishChars: "",
			createSentens: false,
			meta: [],
			page: 1,
			searchInput: ""
		};
	},
	mounted() {
		this.getSentences();
	},
	methods: {
		getSentences(search = null, withPagination = false) {
			this.loading = true;
			const params = { page: this.page };
			if (withPagination === true) {
				params.page = 1;
			}
			let url = `sentence-dictionaries`;

			if (search && this.searchInput != "") {
				url += `?${this.selectedLang}=${this.searchInput}`;
			}

			this.axios
				.get(url, { params })
				.then(data => {
					this.sentences = [];
					this.sentences = data.data.data;
					this.meta = data.data.meta;
					this.page = data.data.meta.current_page;
				})
				.finally(() => (this.loading = false));
		}
	}
};
</script>

<style></style>
