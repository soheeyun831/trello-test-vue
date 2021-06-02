<template>
  <div id="app">
    <h1>웹 어플리케이션 엔지니어 과제 (Trello) Vue version</h1>
    <trello msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import trello from "./components/trello";

export default {
  name: "App",
  components: {
    trello,
  },
};
</script>
