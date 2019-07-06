<template>
  <f7-page>
    <f7-navbar :title="userName" bg-color="blue" text-color="white" color-theme="white"></f7-navbar>
    <f7-block-title v-if="rcs.length == 0">Create your first rc</f7-block-title>
    <!-- <f7-block-title v-else>Your remote controls</f7-block-title> -->
    <f7-list>
      <f7-list-item v-for="rc in rcs" :title="rc.name" link="#" :key="rc.id" @click="openRc(rc.id)"></f7-list-item>
      <f7-list-item link="#" title="Logout" v-on:click="logout"></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>

import { ajaxURL } from '../config.js';

export default {
  data() {
    return {
    }
  },
  computed: {
    rcs() {
      return this.$store.getters.getRcs;
    },
    userName() {
      return this.$store.getters.getUserName;
    }
  },
  methods: {
    openRc: function(id) {
      this.$f7.panel.close('right', true);
      this.$f7.views.main.router.navigate(`/rc/${id}/`, {reloadAll: true});
    },
    logout: function() {
      this.axios.get(`${ajaxURL}/api/v1/logout`)
      .then((response) => {
        if (response.data.result) {
          this.$store.commit('setRcs', []);
          this.$f7.panel.close('right', true);
          this.$f7.loginScreen.open('#login-screen', true);
          console.log('logout');
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
}
</script>
