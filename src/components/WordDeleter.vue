<template>
  <!-- delete modal -->
  <v-dialog light v-model="show" max-width="520">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        @click="show = true"
        class="ml-2"
        :small="big === false"
        depressed
        :text="big !== false"
        color="red lighten-1"
        dark
      >
        <v-icon v-if="big === false" small>mdi-delete</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        Are you sure you want to delete this item?
      </v-card-title>
      <v-card-text>
        by deleting this item you won't be able to access it again.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" text @click="cancel"> Cancel </v-btn>
        <v-btn :loading="loading" color="red darken-1" text @click="remove">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- delete modal -->
</template>
<script>
import axios from "axios";
export default {
  name: "Deleter",
  props: {
    name: {
      type: String,
      required: true
    },
    id: {
      type: [String, Number],
      required: true
    },
    big: {
      default: false
    }
  },
  data: () => ({
    show: false,
    loading: false,
    source: null,
    request: null
  }),
  methods: {
    cancel() {
      if (this.source) {
        this.source.cancel("canceled by use");
      }
      this.show = false;
    },
    remove() {
      const CancelToken = axios.CancelToken;
      this.source = CancelToken.source();
      this.loading = true;
      this.axios
        .delete(`${this.name}/${this.id}`, {
          _method: "Delete",

          cancelToken: this.source.token
        })
        .then(() => {
          this.$store.commit("success", "Deleted successfully");
          window.location.reload();
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("Request canceled", err.message);
          } else {
            console.log(err);
          }
        })
        .finally(() => {
          this.loading = false;
          this.source = null;
          this.$emit("deleted");
          this.show = false;
        });
    }
  }
};
</script>
