/* eslint-disable eol-last */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    columns: [],
    last_column_no: 0,
    last_card_no: 0,
  },
  getters: {
    getColumnList: (state) => state.columns,
    getLastColumnNo: (state) => state.last_column_no,
    getLastCardNo: (state) => state.last_card_no,
  },
  mutations: {
    CREATE_COLUMN: (state) => {
      state.columns.push({
        no: state.last_column_no,
        name: "",
        cards: [],
        status: "new",
      });
      state.last_column_no++;
    },
    UPDATE_COLUMN: (state, data) => {
      state.columns = state.columns.reduce((pre, obj) => {
        if (obj.no === data.no) {
          obj.name = data.name;
          obj.status = "";
          pre.push(obj);
        } else {
          pre.push(obj);
        }
        return pre;
      }, []);
    },
    DELETE_COLUMN: (state, no) => {
      const idx = state.columns.findIndex((item) => {
        return item.no === no;
      });
      if (idx > -1) {
        state.columns.splice(idx, 1);
      }
    },
    CREATE_CARD: (state, no) => {
      for (let i = 0; i < state.columns.length; i++) {
        if (state.columns[i].no === no) {
          state.columns[i].cards.push({
            no: state.last_card_no,
            text: "",
            status: "new",
          });
        }
      }
      state.last_card_no++;
    },
    UPDATE_CARD: (state, data) => {
      for (let i = 0; i < state.columns.length; i++) {
        if (state.columns[i].no === data.column_no) {
          for (let j = 0; j < state.columns[i].cards.length; j++) {
            if (state.columns[i].cards[j].no === data.no) {
              state.columns[i].cards[j].text = data.text;
              state.columns[i].cards[j].status = "";
            }
          }
        }
      }
    },
    UPDATE_CARD_POSITION: (state, data) => {
      let change_column_index = 0;
      let card = {};

      for (let i = 0; i < state.columns.length; i++) {
        if (state.columns[i].no === Number(data.before_column_no)) {
          const idx = state.columns[i].cards.findIndex((item) => {
            return item.no === Number(data.card_no);
          });
          card = state.columns[i].cards[idx];
          if (idx > -1) {
            state.columns[i].cards.splice(idx, 1);
          }
        }
        if (state.columns[i].no === Number(data.change_column_no)) {
          change_column_index = i;
        }
      }

      if (data.type === "column") {
        state.columns[change_column_index].cards.push(card);
      } else if (data.type === "card") {
        state.columns[change_column_index].cards.splice(
          data.change_column_position,
          0,
          card
        );
      }
    },
    DELETE_CARD: (state, data) => {
      for (let i = 0; i < state.columns.length; i++) {
        if (state.columns[i].no === data.column_no) {
          const idx = state.columns[i].cards.findIndex((item) => {
            return item.no === data.card_no;
          });

          if (idx > -1) {
            state.columns[i].cards.splice(idx, 1);
          }
        }
      }
    },
  },
  actions: {
    createColumn({ commit }) {
      commit("CREATE_COLUMN");
    },
    updateColumn({ commit }, data) {
      commit("UPDATE_COLUMN", data);
    },
    deleteColumn({ commit }, no) {
      commit("DELETE_COLUMN", no);
    },
    createCard({ commit }, no) {
      commit("CREATE_CARD", no);
    },
    updateCard({ commit }, data) {
      commit("UPDATE_CARD", data);
    },
    updateCardPosition({ commit }, data) {
      commit("UPDATE_CARD_POSITION", data);
    },
    deleteCard({ commit }, data) {
      commit("DELETE_CARD", data);
    },
  },
});
