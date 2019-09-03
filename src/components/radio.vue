<template>
  <f7-col width="100" tablet-width="50" desktop-width="25">
    <f7-card>
      <f7-card-header class="no-border">
        <div><font-awesome-icon icon="circle" v-bind:class="isOnline" /> {{ radio.name }}</div>
      </f7-card-header>
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

<style scoped>
.color-green {
  color: #4cd964;
}
.color-red {
  color: #ff3b30;
}
</style>

<script>

import { radioOfflineTimeout } from '../config.js';

export default {
  data() {
    return {
      params: [],
      last_update: null,
      interval: null,
      online: false
    }
  },
  computed: {
    isOnline: function() {
      return {
        'color-green': this.online,
        'color-red': !this.online
      }
    },
  },
  props: ['radio'],
  mounted() {
    if (this.radio.params) {
      this.params = this.radio.params.params;
      this.last_update = new Date(this.radio.params.last_update);
    }
    
    // Start an online checker
    this.interval = setInterval(() => this.checkOnline(), 1000);
  },
  sockets: {
    updateRadio(data) {
      if (data.radio_id == this.radio.id) {
        this.params = data.params;
        this.last_update = new Date();
      }
    }
  },
  methods: {
    checkOnline() {
      if (this.last_update == null) return;

      let now = new Date();
      let diff = (now - this.last_update) / 1000;
      this.online = Math.floor(diff) < radioOfflineTimeout
    }
  }
}
</script>
