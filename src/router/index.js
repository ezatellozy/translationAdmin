// import request from "@/plugins/axios";
import store from "@/store";
// import Cookies from "js-cookie";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

let routes = [
  {
    path: "/",
    name: "main",
    meta: {
      auth: true
    },
    component: () => import("@/views/main/index")
  },

  {
    path: "/abstracts",
    name: "abstracts",
    meta: {
      auth: true
    },
    component: () => import("@/views/abstracts/index")
  },
  {
    path: "/features",
    name: "features",
    meta: {
      auth: true
    },
    component: () => import("@/views/features/index")
  },
  {
    path: "/categories",
    name: "Categories",
    meta: {
      auth: true
    },
    component: () => import("@/views/category/index")
  },
  {
    path: "/sentenses",
    name: "Sentenses",
    meta: {
      auth: true
    },
    component: () => import("@/views/sentenseDectionary/index")
  },
  {
    path: "/words",
    name: "words",
    meta: {
      auth: true
    },
    component: () => import("@/views/wordDectionary/index")
  },

  {
    path: "/settings/contact",
    name: "ContactSettingsSpecific",
    meta: {
      auth: true
    },
    component: () => import("@/views/settings/contact")
  },

  {
    path: "/login",
    name: "login",
    meta: {
      layout: "login",
      guest: true,
      auth: false
    },
    component: () => import("@/views/Login")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// router.beforeEach((to, from, next) => {
//   if (to.meta.auth && !Cookies.get("token")) {
//     store.commit("setLoading", false);
//     store.commit("setLoggedIn", false);
//     next("/login");
//   } else if (to.meta.guest && Cookies.get("token")) {
//     store.commit("setLoading", false);
//     store.commit("setLoggedIn", true);
//     next("/");
//   } else {
//     next();
//   }

//   if (to.meta && to.meta.auth) {
//     // store.commit("setLoading", false);
//     // store.commit("setLoggedIn", true);
//     // return next();
//     if (!Cookies.get("token")) {
//       store.commit("setLoading", false);
//       store.commit("setLoggedIn", false);
//       return next({
//         name: "login"
//       });
//     } else {
//       return next("/");
//     }

// 	request
// 		.get(`user`, { noOverride: true })
// 		.then(() => {
// 			store.commit("setLoading", false);
// 			store.commit("setLoggedIn", true);
// 			next();
// 		})
// 		.catch(() => {
// 			store.commit("setLoading", false);
// 			store.commit("setLoggedIn", false);
// 			return next({
// 				name: "login"
// 			});
// 		});
// } else {
// 	if (to.meta && to.meta.guest && Cookies.get("token")) {
// 		request
// 			.get(`user`, { noOverride: true })
// 			.then(() => {
// 				store.commit("setLoading", false);
// 				store.commit("setLoggedIn", true);
// 				return next({
// 					path: "/"
// 				});
// 			})
// 			.catch(() => {
// 				store.commit("setLoading", false);
// 				store.commit("setLoggedIn", false);
// 				return next();
// 			});
// 	} else {
// 		store.commit("setLoading", false);
// 		store.commit("setLoggedIn", true);
// 		return next();
// 	}
//   }
// });
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isLoggedIn) {
      next("/");
      return;
    }
  }
});

export default router;
