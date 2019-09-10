import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    nodes: [],
    rcs: [],
    radios: [],
    mqtts: [],
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
    setMqtts(state, mqtts) {
      state.mqtts = mqtts;
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
    },
    "SOCKET_updateMqtts"(context, data) {
      context.commit('setMqtts', data.mqtts);
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
    getMqtts: state => {
      return state.mqtts;
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
