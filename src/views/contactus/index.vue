<template>
  <section>
    <div class="d-flex justify-space-between align-center mx-12 mt-6">
      <h2>
        {{ $t("navs.ContactUs") }}
      </h2>
    </div>
    <div class="d-flexj justify-space-between align-center mx-12 mt-6">
      <v-simple-table>
        <template>
          <thead>
            <tr>
              <th class="">
                {{ $t("fields.name") }}
              </th>
              <th class="">
                {{ $t("fields.email") }}
              </th>

              <th class="text-center" style="width: 300px">
                {{ $t("headings.action") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="message in messages" :key="message.id">
              <td class="flex">
                {{ message.name }}
              </td>
              <td class="flex">
                {{ message.email }}
              </td>
              <td
                class="d-flex justify-center align-center"
                style="width: 300px"
              >
                <!-- <v-btn
                  color="red accent-2"
                  dark
                  class="mx-6"
                  @click="deleteStage(client)"
                >
                  Delete
                  <v-icon> mdi-delete </v-icon>
                </v-btn> -->

                <!-- <v-btn
                  color="blue lighten-1"
                  class="pa-4"
                  dark
                  @click="Updatemessage(message)"
                >
                  <v-icon>mdi-eyes</v-icon></v-btn
                > -->

                <v-btn
                  @click="Updatemessage(message)"
                  depressed
                  small
                  class="mx-11"
                >
                  <v-icon> mdi-eye </v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <v-dialog v-model="open" max-width="600px">
      <v-card-text style="background-color: #fff">
        <v-container>
          <p class="font-weight-bold mb-0">{{ $t("fields.name") }}</p>

          <p class="my-3">
            {{ name }}
          </p>
          <p class="font-weight-bold mb-0">{{ $t("fields.email") }}</p>

          <p class="my-3">
            {{ email }}
          </p>
          <p class="font-weight-bold mb-0">{{ $t("fields.phone") }}</p>

          <p class="my-3">
            {{ phone }}
          </p>
          <p class="font-weight-bold mb-0">{{ $t("fields.message") }}</p>

          <p class="my-3">
            {{ message }}
          </p>
          <p class="font-weight-bold mb-0">
            {{ $t("fields.CareerId") }}
          </p>

          <p class="my-3">
            <!-- {{ careerTitle }} -->
            {{ career_id }}
          </p>
          <p class="font-weight-bold mb-0">
            {{ $t("fields.ServiceId") }}
          </p>

          <p>
            {{ service_id }}
          </p>

          <v-img
            accept="image/png, image/jpeg"
            v-model="media"
            max-width="150"
            max-height="150"
            contain
            :src="media"
          />
          <div class="mx-3 d-flex justify-end">
            <v-btn @click="open = false"> {{ $t("buttons.cancel") }} </v-btn>
          </div>
        </v-container>
      </v-card-text>
    </v-dialog>
    <v-pagination
      color="primary"
      v-model="page"
      @input="fetchcontactus"
      :length="meta.last_page"
      :total-visible="6"
    ></v-pagination>
  </section>
</template>
<script>
export default {
  components: {},
  data: () => ({
    messages: [],
    page: 1,
    meta: {},
    selectedmessage: {},
    icons: {},
    name: "",
    email: "",
    phone: "",
    message: "",
    open: false,
    careerTitle: "",
    service_id: "",
    media: "",
    career_id: ""
  }),
  mounted() {
    this.fetchcontactus();
  },

  methods: {
    fetchcontactus() {
      this.axios
        .get("admin/contact-us", {
          params: { page: this.page }
        })
        .then(({ data }) => {
          this.meta = data.meta;
          this.messages = data.data;
          this.page = data.meta.current_page;
          console.log(data);
        });
    },
    Updatemessage(message) {
      this.selectedmessage = message;
      this.open = true;
      this.name = this.selectedmessage.name;

      this.email = this.selectedmessage.email;
      this.phone = this.selectedmessage.phone;
      this.message = this.selectedmessage.message;
      this.service_id = this.selectedmessage.service.id;
      this.career_id = this.selectedmessage.career.id;

      this.careerTitle = this.selectedmessage.career.title_en;
      this.careerTitle = this.selectedmessage.career.title_ar;

      this.media = this.selectedmessage.main_media.main_media[0].path;
    }
  }
};
</script>
