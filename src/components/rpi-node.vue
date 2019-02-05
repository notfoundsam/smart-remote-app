<template>
  <f7-card :title="node.host_name">
    <f7-card-content :padding="false">
      <f7-list v-if="arduinos.length > 0">
        <f7-list-item
          v-for="arduino in arduinos"
          :key="arduino.id"
          :link="`/arduino/${node.id}/edit/${arduino.id}/`"
          :title="arduino.name"
          after="Edit">
          <f7-icon slot="media"><font-awesome-icon :icon="['fab', 'usb']" size="2x" /></f7-icon>
        </f7-list-item>
      </f7-list>
      <f7-list simple-list v-else>
        <f7-list-item title="No arduino connected"></f7-list-item>
      </f7-list>
    </f7-card-content>
    <f7-card-footer class="no-border">
      <f7-link :href="`/node/${node.id}/edit/`"><font-awesome-icon icon="cog" /> Edit</f7-link>
      <f7-link :href="`/arduino/${node.id}/add/`"><font-awesome-icon :icon="['fab', 'usb']" /> Add arduino</f7-link>
    </f7-card-footer>
  </f7-card>
</template>
<script>

import { ajaxURL } from '../config.js';

export default {
  data() {
    return {
      arduinos: []
    }
  },
  // computed: {
  //   rcs() {
  //     return this.$store.getters.getRcs;
  //   }
  // },
  props: ['node'],
  mounted() {
    this.axios.get(`${ajaxURL}/api/v1/nodes/${this.node.id}/arduinos`)
    .then((responce) => {
      this.arduinos = responce.data.arduinos;
    })
    .catch((error) => {
      console.log(error);
    });
  },
  sockets: {
    updateNode(data) {
      if (data.node_id == this.node.id) {
        this.node.host_name = data.node.host_name;
        console.log(data);
      }
    },
    updateArduinos(data) {
      if (data.node_id == this.node.id) {
        console.log(data);
        this.arduinos = data.arduinos;
      }
    }
  },
  methods: {
  }
}
</script>
