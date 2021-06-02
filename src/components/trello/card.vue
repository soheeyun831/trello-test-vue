<template>
  <div
    class="card-item"
    :id="`card-${card.no}`"
    :data-no="card.no"
    :data-before-no="column_no"
    draggable="true"
    @dragstart="ondragstart"
  >
    <p v-if="card.status !== 'new'" class="body-copy">{{ card.text }}</p>
    <div v-else>
      <input
        ref="card"
        v-model="card_text"
        class="input"
        type="text"
        placeholder="Add a card..."
      />
      <div class="btn-group">
        <button type="button" class="btn column-save" @click="updateCard">
          Save
        </button>
        <button type="button" class="btn close" @click="cancelCard" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    column_no: {
      type: Number,
      default: NaN,
    },
    card: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      card_text: "",
    };
  },
  methods: {
    updateCard() {
      if (this.card_text !== "") {
        this.$store.dispatch("updateCard", {
          column_no: this.column_no,
          no: this.card.no,
          text: this.card_text,
        });
      } else {
        alert("카드 내용을 입력해주세요.");
        this.$refs.card.focus();
      }
    },
    cancelCard() {
      this.$store.dispatch("deleteCard", {
        column_no: this.column_no,
        card_no: this.card.no,
      });
    },
    ondragstart(e) {
      e.dataTransfer.setData("cardId", `card-${this.card.no}`);
    },
  },
};
</script>
