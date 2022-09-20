<template>
	<v-row justify="center" class="ma-0">
		<v-dialog v-model="dialog" persistent max-width="450">
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					:block="block"
					depressed
					tile
					color="error"
					v-bind="attrs"
					v-on="on"
				>
					{{ $t("buttons.delete") }}
					<v-icon> mdi-delete</v-icon>
				</v-btn>
			</template>
			<v-card>
				<v-card-title class="headline">
					Are you sure you want delete it?
				</v-card-title>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn @click="dialog = false" depressed tile>
						{{ $t("buttons.cancel") }}
					</v-btn>
					<v-btn color="error" depressed tile @click="agree()">
						{{ $t("buttons.delete") }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>
<script>
export default {
	props: {
		block: { default: false, required: false }
	},
	data() {
		return {
			dialog: false
		};
	},
	methods: {
		agree() {
			this.$emit("deleted");
			this.dialog = false;
		}
	}
};
</script>
