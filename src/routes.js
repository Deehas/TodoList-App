import { createRouter, createWebHashHistory } from "vue-router";
import todos from "./components/todos.vue";

const Routes = [
  {
    path: "/",
    component: todos,
  },
];

const router = createRouter({
  routes: Routes,
  history: createWebHashHistory(),
  mode: history,
});

export default router;
