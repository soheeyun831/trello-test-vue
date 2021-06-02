<template>
  <div
    class="column"
    :id="`column-${column.no}`"
    :data-no="column.no"
    @dragenter="onDragenter"
    @dragleave="onDragleave"
    @dragover="onDragover"
    @drop="onDrop"
  >
    <div class="column-header">
      <div v-if="column.status === 'new'">
        <input
          ref="column"
          v-model="column_name"
          class="input"
          type="text"
          placeholder="Add a list..."
        />
        <div class="btn-group">
          <button type="button" class="btn column-save" @click="updateColumn">
            Save
          </button>
          <button type="button" class="btn close" @click="cancelColumn" />
        </div>
      </div>
      <div v-else>
        <p class="head-copy">{{ column.name }}</p>
      </div>
    </div>
    <div
      v-if="column.status !== 'new'"
      class="column-contents"
      :data-no="column.no"
    >
      <trello-card
        v-for="card in column.cards"
        :key="card.no"
        :card="card"
        :column_no="column.no"
      />
      <p class="body-copy add" @click="createCard">Add a card...</p>
    </div>
  </div>
</template>

<script>
import trelloCard from "./card.vue";

export default {
  name: "column",
  components: {
    trelloCard,
  },
  props: {
    column: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      column_name: "",
    };
  },
  methods: {
    updateColumn() {
      if (this.column_name !== "") {
        this.$store.dispatch("updateColumn", {
          no: this.column.no,
          name: this.column_name,
        });
      } else {
        alert("컬럼 명을 입력해주세요.");
        this.$refs.column.focus();
      }
    },
    cancelColumn() {
      this.$store.dispatch("deleteColumn", this.column.no);
    },
    createCard() {
      this.$store.dispatch("createCard", this.column.no);
    },
    onDragenter(e) {
      e.preventDefault();
      if (e.target.className === "column-contents") {
        e.target.style.border = "1px dotted #1db1b5";
      } else if (e.target.className === "card-item") {
        e.target.style.border = "1px dotted #1db1b5";
      }
    },
    onDragleave(e) {
      e.preventDefault();
      e.target.style.borderColor = "transparent";
    },
    onDragover(e) {
      e.preventDefault();
    },
    onDrop(e) {
      e.preventDefault();
      if (e.target.className === "column-contents") {
        const card_id = e.dataTransfer.getData("cardId");

        this.$store.dispatch("updateCardPosition", {
          type: "column",
          change_column_no: e.target.getAttribute("data-no"),
          before_column_no: document
            .getElementById(card_id)
            .getAttribute("data-before-no"),
          card_no: document.getElementById(card_id).getAttribute("data-no"),
        });

        e.target.style.borderColor = "transparent";
      } else if (e.target.className === "card-item") {
        const card_id = e.dataTransfer.getData("cardId");
        this.$store.dispatch("updateCardPosition", {
          type: "card",
          change_column_position: this.getIndex(e.target.id),
          change_column_no: e.target.parentNode.getAttribute("data-no"),
          before_column_no: document
            .getElementById(card_id)
            .getAttribute("data-before-no"),
          card_no: document.getElementById(card_id).getAttribute("data-no"),
        });
        e.target.style.borderColor = "transparent";
      }
    },
    getIndex(selector) {
      let idx = 0;
      const el = document.getElementById(selector);
      for (let i = 0; i < el.parentNode.childNodes.length; i++) {
        if (el.parentNode.childNodes[i] === el) {
          idx = i;
        }
      }
      return idx;
    },
  },
};
</script>
