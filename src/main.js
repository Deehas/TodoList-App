import { createApp } from "vue";
import "./assets/main.css";
import App from "./App.vue";
// import VueRouter from "vue-router";
import router from "./routes";

// Vue.use(VueRouter);

createApp(App).use(router).mount("#app");
