<template>
  <section class="column-group">
    <trello-column
      v-for="column in columns"
      :key="column.no"
      :column="column"
    />
    <div class="column add" @click="addColumn">Add a list</div>
  </section>
</template>

<script>
import trelloColumn from "./column.vue";
import { mapGetters } from "vuex";

export default {
  name: "index",
  components: {
    trelloColumn,
  },
  computed: {
    ...mapGetters({ columns: "getColumnList" }),
  },
  methods: {
    addColumn() {
      this.$store.dispatch("createColumn");
    },
  },
};
</script>
