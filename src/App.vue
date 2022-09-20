<template>
  <div>
    <v-app style="overflow-y: auto;">
      <v-app-bar fixed color="primary" dark flat>
        <h2 class="text-center" style="width: 256px;">
          <router-link to="" class="white--text text-decoration-none"
            >لوحة التحكم</router-link
          >
        </h2>
        <v-spacer></v-spacer>

        <a
          href="https://beta.saadaahnews.com"
          target="_blank"
          style="color: white;"
          >{{ $t("labels.goToWebsite") }}</a
        >
        <locale-switcher />
      </v-app-bar>

      <v-container
        style="
          overflow-x: hidden;
          overflow-y: auto;
          margin-top: 64px;
          height: calc(100vh - 64px);
        "
        class="pa-0"
        fluid
        fill-height
      >
        <v-row style="flex-wrap: nowrap;" v-if="this.$route.path !== '/login'">
          <side-menu />
          <router-view
            class="flex-grow-1 grey lighten-4"
            style="
              overflow-x: hidden;
              overflow-y: auto;
              max-width: calc(100vw - 256px);
            "
            fill-height
          />
        </v-row>

        <router-view v-else style="margin: 0 auto;" />
      </v-container>
      <input
        id="x-copier"
        type="text"
        style="
          position: fixed;
          top: -100vh;
          z-index: -9999999;
          max-width: 1px;
          max-height: 1px;
          opacity: 0;
        "
        ref="copier"
      />
      <v-snackbar
        v-if="$store && $store.getters.notification"
        v-model="$store.getters.notification.display"
        :color="$store.getters.notification.color"
      >
        <div class="d-flex align-center">
          <v-icon v-if="$store.getters.notification.status === 'success'">
            mdi-check
          </v-icon>
          <strong class="white--text mx-2">{{
            $store.getters.notification.text
          }}</strong>
        </div>
        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="$store.commit('closeNotification')"
          >
            Dismiss
          </v-btn>
        </template>
      </v-snackbar>
    </v-app>
  </div>
</template>

<script>
import SideMenu from "@/components/SideMenu";
import LocaleSwitcher from "@/components/LocaleSwitcher";
export default {
  name: "App",

  components: {
    LocaleSwitcher,
    SideMenu
  },

  data: () => ({
    snackbar: true
  })
};
</script>
