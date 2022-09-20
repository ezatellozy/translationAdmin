<template>
  <v-card class="" height="100vh" width="256">
    <v-navigation-drawer
      style="
        top: 64px;
        max-height: calc(100vh - 64px);
        padding-top: 15px;
        border-radius: 0;
      "
      fixed
      dark
      clipped
      :right="$i18n.locale === 'ar'"
      permanent
    >
      <v-list class="py-1" dense nav v-for="item in items" :key="item.title">
        <v-list-item
          v-if="!item.children"
          color="primary"
          :to="item.link"
          :class="{
            'primarys deep-orange saccent-1 lighten-5s':
              item.title === 'Models Filling'
          }"
          class="px-4 py-1s mt-2s my-0"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content
            :class="{
              'white--text ': item.title === 'Models Filling'
            }"
          >
            <!-- <v-list-item-title>{{ item.title }}</v-list-item-title> -->
            <v-list-item-title>{{
              $t(`navs.${item.title}`)
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          v-else
          :selected="true"
          :value="$route.path.includes(item.link)"
          :prepend-icon="item.icon"
        >
          <template v-slot:activator>
            <v-list-item-content class="py-1 px-4">
              <!-- <v-list-item-title>{{ item.title }}</v-list-item-title> -->
              <v-list-item-title>{{
                $t(`navs.${item.title}`)
              }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.children"
            :key="child.id"
            :to="child.link"
            class="px-4s py-1 pl-6"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <!-- <v-list-item-title>{{ child.title }}</v-list-item-title> -->
              <v-list-item-title>{{
                $t(`navs.${child.title}`)
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      <template v-slot:append>
        <div class="pa-3">
          <small class="d-block my-1 grey--text text-center"
            >version {{ version }}</small
          >
          <v-btn @click="logout" block dark color="red lighten-2">
            <v-icon>mdi-logout</v-icon>
            <span class="mx-2"> {{ $t("buttons.signOut") }} </span>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import Cookies from "js-cookie";

export default {
  mounted() {
    this.version = require("../../package.json").version;
  },

  data: () => ({
    version: "1.0.0",
    items: [
      // {
      //   title: "Main",
      //   icon: "mdi-briefcase",
      //   link: "/"
      // },

      { title: "categories", icon: "mdi-information", link: "/categories" },
      { title: "sentenses", icon: "mdi-information", link: "/sentenses" },
      { title: "words", icon: "mdi-information", link: "/words" },
      { title: "abstracts", icon: "mdi-information", link: "/abstracts" },
      { title: "features", icon: "mdi-information", link: "/features" },

      {
        title: "settings",
        icon: "mdi-vector-selection",
        link: "/settings",
        children: [
          {
            title: "contact",
            icon: "mdi-view-dashboard",
            link: "/settings/contact"
          }
        ]
      }
    ]
  }),

  methods: {
    logout() {
      Cookies.remove("token");
      setTimeout(() => {
        window.location.replace("login");
      }, 300);
    }
  }
};
</script>
