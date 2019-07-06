<template>
  <f7-col width="100" tablet-width="50" desktop-width="25">
    <f7-card :title="radio.name">
      <f7-card-content :padding="true">
        <p v-if="params.tempValue">Temperature: {{ params.tempValue }}</p>
        <p v-if="params.humiValue">Humidity: {{ params.humiValue }}</p>
        <p v-if="params.presValue">Pressure: {{ params.presValue }}</p>
        <p v-if="params.batValue">Battery: {{ params.batValue }}</p>
      </f7-card-content>
      <f7-card-footer class="no-border">
        <f7-link :href="`/radio/${radio.id}/edit/`"><font-awesome-icon icon="cog" /> Edit</f7-link>
      </f7-card-footer>
    </f7-card>
  </f7-col>
</template>
<script>

import { ajaxURL } from '../config.js';

export default {
  data() {
    return {
      params: []
    }
  },
  computed: {},
  props: ['radio'],
  mounted() {
    // this.axios.get(`${ajaxURL}/api/v1/radios/${this.radio.id}`)
    // .then((response) => {
    //   this.radio = response.data.radio;
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  },
  sockets: {
    updateRadio(data) {
      if (data.radio_id == this.radio.id) {
        this.params = data.params;
      }
    }
  },
  methods: {}
}
</script>
