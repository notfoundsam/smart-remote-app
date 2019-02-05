<template>
  <f7-page>
    <f7-navbar title="Edit buttons" back-link="Back"></f7-navbar>
    
    <f7-list no-hairlines-md>
      <f7-list-item
        v-for="btn in buttons" :key="btn.id"
        radio
        :title="btn.name"
        name="button"
        :value="btn.id"
        @change="button_id = $event.target.value"
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

import { ajaxURL } from '../config.js';

export default {
  data() {
    return {
      buttons: [],
      button_id: ''
    }
  },
  mounted() {
    this.axios.get(`${ajaxURL}/api/v1/rcs/${this.$f7route.params.rc_id}/buttons`)
    .then((responce) => {
      let btn_arr = [];
      let btn_row = [];
      let index = null;

      this.buttons = responce.data.buttons;
    })
    .catch((error) => {
      if (error.status == 401) {
        console.log(401);
      } else {
        console.log(error);
      }
    });
  },
  methods: {
    edit: function() {
      if (this.button_id) {
        let type = this.buttons.find(x => x.id === parseInt(this.button_id)).type;
        if (type == 'ir') {
          this.$f7router.navigate(`/btn/${this.$f7route.params.rc_id}/edit/${this.button_id}/ir/`);
        }
      }
    }
  }
};
</script>
