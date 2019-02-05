<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-title>My App</f7-nav-title>
      <f7-nav-right>
        <f7-link panel-open="right"><font-awesome-icon icon="bars" size="1x" /></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-toolbar :bottom-md="true">
      <f7-link @click="pushMsg"><font-awesome-icon icon="cogs" size="2x" /></f7-link>
      <f7-link @click="$refs.actionsRCGroup.open()"><font-awesome-icon icon="plus" size="2x" /></f7-link>
    </f7-toolbar>
    
    <rpi-node
      v-for="(node, index) in nodes"
      :key="node.id"
      :node="node"
    ></rpi-node>

    <!-- RC Group -->
    <f7-actions ref="actionsRCGroup">
      <f7-actions-group>
        <f7-actions-button bold @click="$f7router.navigate('/rc/add/')">Add remote control</f7-actions-button>
        <f7-actions-button bold @click="$f7router.navigate('/radio/add/')">Add radio</f7-actions-button>
        <f7-actions-button color="red">Cancel</f7-actions-button>
      </f7-actions-group>
    </f7-actions>
  </f7-page>
</template>
<script>

import { ajaxURL } from '../config.js';
import RpiNode from '../components/rpi-node.vue';

export default {
  data() {
    return {}
  },
  components: {
    RpiNode
  },
  computed: {
    nodes() {
      return this.$store.getters.getNodes;
    }
  },
  mounted() {
    this.sockets.subscribe('test', (data) => {
      this.msg = data.message;
    });
    this.axios.get(`${ajaxURL}/api/v1/nodes`)
    .then((responce) => {
      this.$store.commit('setNodes', responce.data.nodes);
    })
    .catch((error) => {
      if (error.response && error.response.status == 401) {
        // this.$f7.loginScreen.open('#login-screen', true);
      } else {
        console.log(error);
      }
    });

    this.sockets.subscribe('customEmit', (data) => {
      console.log('socket xxxx');
    });
  },
  sockets: {
    connect: function () {
      console.log('socket connected');
      this.$socket.emit('customEmit', 'opopopo');
    }
  },
  methods: {
    pushMsg() {
      console.log('btn');
      this.$socket.emit('message', {test: 'aaaaa'})
    }
  }
}
</script>
