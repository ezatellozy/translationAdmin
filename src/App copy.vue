<template>
  <div>
    <!-- <v-app
			v-if="isLoading || !loggedIn || $route.path === '/login'"
			style="overflow-y: auto"
		>
			<v-container v-if="isLoading" fill-height fluid>
				<v-row align="center" justify="center">
					<v-progress-circular
						indeterminate
						:size="50"
						color="primary"
					></v-progress-circular>
				</v-row>
			</v-container>
			<router-view v-else />
		</v-app> -->
    <!-- <v-app v-else style="overflow-y: auto"> -->
    <v-app style="overflow-y: auto;">
      <v-app-bar
        fixed
        color="#fcb69f"
        dark
        flat
        src="https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/12f45e115938129.60587ebe52b8e.png"
      >
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
          ></v-img>
        </template>
        <h2>Almasrad</h2>
        <v-spacer></v-spacer>
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
        <v-row style="flex-wrap: nowrap;">
          <login v-if="auth" />
          <side-menu v-if="!auth" />
          <router-view
            v-if="!auth"
            class="flex-grow-1 grey lighten-4"
            style="
              overflow-x: hidden;
              overflow-y: auto;
              max-width: calc(100vw - 256px);
            "
            fill-height
          />
        </v-row>
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
      >
        {{ $store.getters.notification.text }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="$store.commit('closeNotification')"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-app>
  </div>
</template>

<script>
import SideMenu from "@/components/SideMenu";
import LocaleSwitcher from "@/components/LocaleSwitcher";
// import Login from "@/views/Login";
import Login from "@/components/Login";
import { mapGetters } from "vuex";

export default {
  name: "App",

  components: {
    Login,
    LocaleSwitcher,
    SideMenu
  },

  data: () => ({
    auth: false,
    snackbar: true
  }),

  computed: {
    ...mapGetters(["loggedIn", "isLoading"])
  }
};
</script>
