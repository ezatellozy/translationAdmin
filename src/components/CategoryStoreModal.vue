<template>
	<v-row justify="end">
		<v-dialog v-model="dialog" persistent max-width="600px">
			<template v-slot:activator="{ on, attrs }">
				<v-btn color="blue" dark elevation="0" v-bind="attrs" v-on="on">
					<v-icon>mdi-plus</v-icon>
					<span class="ml-1">إضافة</span>
				</v-btn>
			</template>

			<validation-observer
				v-slot="{ invalid }"
				@submit.prevent="submit"
				ref="form"
			>
				<v-card :loading="loading" rounded="50">
					<v-card-title class="mb-4">
						<span class="headline">إضافة عنصر جديد</span>
					</v-card-title>
					<v-card-text>
						<validation-provider
							name="name"
							rules="required|min:2|max:250"
							v-slot="{ errors }"
						>
							<v-text-field
								label="name"
								v-model="name"
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
							إضافة
						</v-btn>
					</v-card-actions>
				</v-card>
			</validation-observer>
		</v-dialog>
	</v-row>
</template>

<script>
export default {
	// props: ["categoryUrl"],
	data: () => ({
		name: " ",
		loading: false,
		dialog: false
	}),
	methods: {
		submit() {
			const data = new FormData();
			data.append("name", this.name);
			this.loading = true;
			this.axios
				.post(`admin/categories `, data)
				.then(data => {
					this.$store.commit("notify", data.data.message);
					this.$emit("updated");
					this.dialog = false;
					// window.location.reload();
				})
				.catch(errors => {
					if (
						errors.response &&
						errors.response.data &&
						errors.response.data.errors
					) {
						console.log(errors.response.data.errors);
						this.$refs.form.setErrors(errors.response.data.errors);
					}
				});
		}
	}
};
</script>
