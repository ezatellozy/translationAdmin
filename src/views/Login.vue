<template>
  <v-container fill-height fluid class="grey lighten-3">
    <v-row align="center" justify="center">
      <v-card class="mx-auto" :rounded="true" width="450">
        <v-card-title class="mb-4">
          <v-icon large left> mdi-lock </v-icon>
          <span class="title">{{ $t("headings.signin") }}</span>
        </v-card-title>

        <v-card-text class="headlines">
          <validation-observer ref="loginForm" v-slot="{ invalid }">
            <form @submit.prevent="login">
              <validation-provider
                name="email"
                rules="required|min:4|email"
                v-slot="{ errors }"
              >
                <v-text-field
                  v-model="user.email"
                  append-icon="mdi-email"
                  type="email"
                  outlined
                  name="email"
                  :label="$t('fields.email')"
                  :hint="$t('messages.min4Validation')"
                  :error-messages="errors"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </validation-provider>
              <validation-provider
                name="password"
                rules="required|min:4"
                v-slot="{ errors }"
              >
                <v-text-field
                  v-model="user.password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  outlined
                  name="password"
                  :label="$t('fields.password')"
                  :hint="$t('messages.min4Validation')"
                  :error-messages="errors"
                  counter
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </validation-provider>
              <v-btn
                type="submit"
                large
                class="mt-3"
                :color="loggedIn ? 'teal lighten-2' : 'primary'"
                :loading="loading"
                :disabled="invalid || loading"
                depressed
                :dark="loggedIn"
                block
              >
                <v-icon v-if="loggedIn">mdi-check</v-icon>
                <span v-else>{{ $t("buttons.signIn") }}</span>
              </v-btn>
            </form>
          </validation-observer>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import Cookies from "js-cookie";
import { localize } from "vee-validate";

export default {
  data: () => ({
    showPassword: false,
    loading: false,
    loggedIn: false,
    user: {
      email: "",
      password: ""
    }
  }),

  mounted() {
    localize(Cookies.get("locale") || "ar");
    setTimeout(() => {
      // alert(this.$store.getters.loggedIn);
      // if (this.$store.getters.loggedIn) {
      //   window.location.replace("/");
      // }
    }, 2000);
  },

  methods: {
    login: function () {
      //   let email = this.email;
      //   let password = this.password;
      this.$store
        .dispatch("login", this.user)
        .then(() => {
          // this.$router.push("/members");
          window.location.reload();
        })

        .catch((errors) => {
          if (
            errors.response &&
            errors.response.data &&
            errors.response.data.errors
          ) {
            console.log(errors.response.data.errors);
            // this.$refs.form.setErrors(errors.response.data.errors);
            this.$store.commit("danger", errors.response.data.errors.entity[0]);
          }
        });
    }
  }
};
</script>
