import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    nodes: [],
    rcs: [],
    radios: [],
    arduinos: [],
    userName: ''
  },
  mutations: {
    setNodes(state, nodes) {
      state.nodes = nodes;
    },
    setRcs(state, rcs) {
      state.rcs = rcs;
    },
    setRadios(state, radios) {
      state.radios = radios;
    },
    setArduinos(state, arduinos) {
      state.arduinos = arduinos;
    },
    setUserName(state, userName) {
      state.userName = userName;
    },
  },
  actions: {
    "SOCKET_updateNodes"(context, data) {
      context.commit('setNodes', data.nodes);
    },
    "SOCKET_updateRcs"(context, data) {
      context.commit('setRcs', data.rcs);
    },
    "SOCKET_updateRadios"(context, data) {
      context.commit('setRadios', data.radios);
    }
  },
  getters: {
    getNodes: state => {
      return state.nodes;
    },
    getRcs: state => {
      return state.rcs;
    },
    getRadios: state => {
      return state.radios;
    },
    getArduinos: state => {
      return state.arduinos;
    },
    getUserName: state => {
      return state.userName;
    },
  },
});

export default store;
