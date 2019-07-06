<template>
  <f7-page>
    <f7-navbar title="Rpi nodes" back-link="Back" back-link-url="/" :back-link-force="true" bg-color="blue" text-color="white" color-theme="white"></f7-navbar>
    <f7-row no-gap>
      <rpi-node
        v-for="node in nodes"
        :key="node.id"
        :node="node"
      ></rpi-node>
    </f7-row>

  </f7-page>
</template>
<script>

import { ajaxURL } from '../../config.js';
import RpiNode from '../../components/rpi-node.vue';

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
    this.axios.get(`${ajaxURL}/api/v1/nodes`)
    .then((response) => {
      this.$store.commit('setNodes', response.data.nodes);
    })
    .catch((error) => {
      console.log(error);
    });
  },
  sockets: {},
  methods: {}
}
</script>
