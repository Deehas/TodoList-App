<template>
  <section class="greeting">
    <h2 class="title">
      What's up, <input type="text" placeholder="Name here" v-model="name" />
    </h2>
  </section>

  <section class="create-todo">
    <h3>CREATE A TODO</h3>

    <form @submit.prevent="addTodo">
      <h4>What's on your todo list?</h4>
      <input
        type="text"
        placeholder="e.g. make a video"
        v-model="input_content"
      />

      <h4>Pick a category</h4>
      <div class="options">
        <label>
          <input
            type="radio"
            name="category"
            value="business"
            v-model="input_category"
          />
          <span class="bubble business"></span>
          <div>Business</div>
        </label>

        <label>
          <input
            type="radio"
            name="category"
            value="personal"
            v-model="input_category"
          />
          <span class="bubble personal"></span>
          <div>Personal</div>
        </label>
      </div>

      <input type="submit" value="Add todo" />
    </form>
  </section>

  <section class="todo-list">
    <h3>TODO LIST</h3>

    <div class="header">
      <button @click="allTodos">All</button>
      <button @click="completedTodos">Completed</button>
      <button @click="uncompletedTodos">Uncompleted</button>
    </div>

    <div class="Todoslist">
      <div
        v-for="todo in todos_asc"
        :class="`todo-item ${todo.done && 'done'}`"
      >
        <label>
          <input type="checkbox" v-model="todo.done" />
          <span :class="`bubble ${todo.category}`"></span>
        </label>

        <div class="todo-content">
          <input type="text" v-model="todo.content" />
        </div>

        <div class="actions">
          <button class="delete" @click="removeTodo(todo)">Delete</button>
        </div>
      </div>
    </div>
    <div class="clear">
      <button class="clearDone" @click="clearDone(todos)">Clear done</button>

      <button class="clearAll" @click="clearAll(todo)">Clear all</button>
    </div>
    <div class="pendingTasks">
      <h4>Pending Tasks: {{ countTodo }}</h4>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";

const todos = ref([]);
// const todos = ref([
//   {
//     id: 1,
//     content: "Learn Vue JS",
//     category: "personal",
//     done: true,
//   },
//   {
//     id: 2,
//     content: "Watch netflix",
//     category: "business",
//     done: true,
//   },
//   {
//     id: 3,
//     content: "Go shopping",
//     category: "personal",
//     done: false,
//   },
//   {
//     id: 4,
//     content: "Learn guitar",
//     category: "business",
//     done: true,
//   },
//   {
//     id: 5,
//     content: "Send email",
//     category: "personal",
//     done: false,
//   },
// ]);
const name = ref("");

const input_content = ref("");
const input_category = ref(null);

const todos_asc = computed(() =>
  todos.value.sort((a, b) => {
    return b.createdAt - a.createdAt;
  })
);

const countTodo = computed(
  () => todos.value.filter((t) => t.done !== true).length
);

const addTodo = () => {
  if (input_content.value.trim() === "" || input_category.value === null) {
    return;
  }

  todos.value.push({
    content: input_content.value,
    category: input_category.value,
    done: false,
    createdAt: new Date().getTime(),
  });

  // todos.value.sort((a, b) => {
  //   return b.createdAt - a.createdAt;
  // })

  input_content.value = "";
  input_category.value = null;
};

const removeTodo = (todo) => {
  todos.value.splice(todos.value.indexOf(todo), 1 && todo.done == true);
};

const clearDone = (todo) => {
  todos.value = todos.value.filter((t) => t.done !== true);
};

const clearAll = (todo) => {
  todos.value = [];
};

var listTodos = ref(todos.value);
// listTodos.value.sort((a, b) => {
//     return b.createdAt - a.createdAt;
//   })

const allTodos = () => {
  // console.log("a");
  listTodos.value = todos.value;
  // console.log(listTodos);
};

const completedTodos = () => {
  // console.log("b");
  listTodos.value = todos.value.filter((t) => t.done == true);
  // console.log(listTodos);
};

const uncompletedTodos = () => {
  // console.log("c");
  listTodos.value = todos.value.filter((t) => t.done !== true);
  // console.log(listTodos);
};

watch(
  todos,
  (newVal) => {
    localStorage.setItem("todos", JSON.stringify(newVal));
  },
  { deep: true }
);

watch(name, (newVal) => {
  localStorage.setItem("name", newVal);
});

onMounted(() => {
  name.value = localStorage.getItem("name") || "";
  todos.value = JSON.parse(localStorage.getItem("todos")) || [];
});
</script>
