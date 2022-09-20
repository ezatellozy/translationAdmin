<template>
  <div>
    <div class="mx-12 my-6 d-flex align-center justify-space-between">
      <h2>Page Title</h2>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [],
    page: 1,
    meta: {}
  }),

  mounted() {
    // this.fetchItems();
  },

  methods: {
    // fetchItems() {
    //   this.axios
    //     .get("admin/services", {
    //       params: { page: this.page }
    //     })
    //     .then(({ data }) => {
    //       this.items = data.data;
    //     });
    // }
  }
};
</script>
