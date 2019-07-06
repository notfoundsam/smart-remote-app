<template>
  <f7-page>
    <f7-navbar title="Edit remote" back-link="Back" bg-color="blue" text-color="white" color-theme="white"></f7-navbar>
    
    <f7-list no-hairlines-md>
      <f7-list-item
        v-for="rc in rcs" :key="rc.id"
        radio
        :title="rc.name"
        name="rc"
        :value="rc.id"
        @change="rc_id = $event.target.value"
      ></f7-list-item>
    </f7-list>

    <f7-block>
      <f7-row tag="p">
        <f7-col tag="span">
          <f7-button raised fill @click="edit">Edit</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>

  </f7-page>
</template>
<script>

import { ajaxURL } from '../../config.js';

export default {
  data() {
    return {
      rcs: [],
      rc_id: '',
    }
  },
  mounted() {
    this.axios.get(`${ajaxURL}/api/v1/rcs`)
    .then((response) => {
      this.rcs = response.data.rcs;
    })
    .catch((error) => {
      console.log(error);
    });
  },
  methods: {
    edit: function() {
      if (this.rc_id) {
        this.$f7router.navigate(`/rc/${this.rc_id}/edit/`);
      }
    }
  }
};
</script>
