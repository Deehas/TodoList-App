<template>
  <div>
    <!-- <create-todo></create-todo> -->
    <router-view></router-view>
  </div>
</template>

<script>
import todos from "./components/todos.vue";

export default {
  components: {
    "create-todo": todos,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style></style>
