<template>
  <f7-page>
    <f7-navbar bg-color="blue" text-color="white" color-theme="white">
      <f7-nav-title>Smart remote</f7-nav-title>
      <f7-nav-right>
        <f7-link panel-open="right"><font-awesome-icon icon="bars" size="1x" /></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-toolbar position="bottom" bg-color="blue" text-color="white" color-theme="white">
      <f7-link @click="$refs.actionsRadioGroup.open()"><font-awesome-icon icon="cogs" size="2x" /></f7-link>
      <f7-link href="/node/"><font-awesome-icon :icon="['fab', 'raspberry-pi']" size="2x" /></f7-icon></f7-link>
      <f7-link @click="$refs.actionsRcGroup.open()"><font-awesome-icon icon="plus" size="2x" /></f7-link>
    </f7-toolbar>
    
    <f7-row no-gap>
      <radio
        v-for="radio in radios"
        :key="radio.id"
        :radio="radio"
      ></radio>
    </f7-row>

    <!-- RC Group -->
    <f7-actions ref="actionsRadioGroup">
      <f7-actions-group>
        <f7-actions-button bold @click="$f7router.navigate('/radio/add/')">Add radio</f7-actions-button>
        <f7-actions-button bold @click="$f7router.navigate('/radio/remove/')">Remove radio</f7-actions-button>
        <f7-actions-button color="red">Cancel</f7-actions-button>
      </f7-actions-group>
    </f7-actions>

    <!-- RC Group -->
    <f7-actions ref="actionsRcGroup">
      <f7-actions-group>
        <f7-actions-button bold @click="$f7router.navigate('/rc/add/')">Add remote control</f7-actions-button>
        <f7-actions-button bold @click="$f7router.navigate('/rc/edit/')">Edit remote control</f7-actions-button>
        <f7-actions-button bold @click="$f7router.navigate('/rc/remove/')">Remove remote control</f7-actions-button>
        <f7-actions-button color="red">Cancel</f7-actions-button>
      </f7-actions-group>
    </f7-actions>
  </f7-page>
</template>
<script>

import { ajaxURL } from '../config.js';
import Radio from '../components/radio.vue';

export default {
  data() {
    return {}
  },
  components: {
    Radio
  },
  computed: {
    radios() {
      return this.$store.getters.getRadios;
    }
  },
  mounted() {
    if (this.$store.getters.getUserName) {
      console.log('home mounted');
      this.axios.get(`${ajaxURL}/api/v1/radios`)
      .then((response) => {
        this.$store.commit('setRadios', response.data.radios);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  },
  sockets: {},
  methods: {}
}
</script>
