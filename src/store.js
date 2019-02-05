import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    nodes: [],
    rcs: [],
    UserName: 'root'
  },
  mutations: {
    setNodes(state, nodes) {
      state.nodes = nodes;
    },
    setRcs(state, rcs) {
      state.rcs = rcs;
    },
    setUserName(state, UserName) {
      state.UserName = UserName;
    },
  },
  actions: {
    // async addTodo({ commit }, todo) {
    //   console.log('Action: Trying to add todo');
    //   if (!todo || !todo.title) {
    //     console.error('Invalid todo item');
    //     return;
    //   }
    //   const result = true;
    //   if (result === true) commit('addTodo', todo);
    //   else console.error('Could not add todo');
    // },
    "<SOCKET><test>"() {
        console.log('fff');
    }
  },
  getters: {
    getNodes: state => {
      return state.nodes;
    },
    getRcs: state => {
      return state.rcs;
    },
    getUserName: state => {
      return state.userName;
    },
  },
});

export default store;
