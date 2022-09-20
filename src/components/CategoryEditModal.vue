Skip to content Search or jump to… Pull requests Issues Marketplace Explore
@ezatellozy AbdElrahmaN31 / zahosts-admin Private Code Issues Pull requests
Actions Projects Wiki Security Insights
zahosts-admin/src/components/modals/CategoryEditModal.vue Ëman El-Swerky modify
Latest commit cdec2c9 on Aug 22, 2021 History 0 contributors 246 lines (228
sloc) 6.12 KB

<template>
	<v-row justify="center">
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
				v-slot="{ invalid }"
				@submit.prevent="submit"
				ref="form"
			>
				<v-card :loading="loading" rounded="50">
					<v-card-text>
						<validation-provider
							name="name"
							rules="required|min:2|max:250"
							v-slot="{ errors }"
						>
							<v-text-field
								label="الاسم"
								v-model="item.name"
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
						<v-btn color="grey" text @click="dialog = false"> إغلاق </v-btn>
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
	props: ["category"],
	data: () => ({
		item: {},
		loading: false,
		dialog: false
	}),
	methods: {
		getItem() {
			this.axios.get(`categories/${this.category.slug}`).then(data => {
				this.item = data.data.category;
			});
		},
		submit() {
			const data = new FormData();
			data.append("_method", "PUT");
			data.append("name", this.item.name);
			this.loading = true;
			this.axios
				.post(`admin/categories/${this.category.slug}`, data)
				.then(data => {
					this.$store.commit("notify", data.data.message);
					this.$emit("updated");
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
						this.$store.commit("notify", "error");
					}
				});
		}
	}
};
</script>
