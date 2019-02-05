<template>
  <f7-page>
    <f7-navbar title="Remove buttons" back-link="Back"></f7-navbar>
    
    <f7-list no-hairlines-md>
      <f7-list-item
        v-for="btn in buttons" :key="btn.id"
        checkbox
        :title="btn.name"
        name="button"
        :value="btn.id"
        :checked="selected.indexOf(btn.id) >= 0"
        @change="checkSelected"
      ></f7-list-item>
    </f7-list>

    <f7-block>
      <f7-row tag="p">
        <f7-col tag="span">
          <f7-button raised fill @click="remove">Remove</f7-button>
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
      selected: [],
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
    checkSelected(event) {
      const self = this;
      const value = event.target.value;
      if (event.target.checked) {
        self.selected.push(value);
      } else {
        self.selected.splice(self.selected.indexOf(value), 1);
      }
    },
    remove: function() {
      if (this.buttons.length > 0) {
        const self = this;
        let last_btn = 0;

        this.selected.forEach(function(button) {
          self.axios.delete(`${ajaxURL}/api/v1/rcs/${self.$f7route.params.rc_id}/buttons/${button}`)
          .then((responce) => {
            last_btn++;
            // console.log(self.buttons.length);
            // console.log(last_btn);
            if (self.buttons.length == last_btn) {
              self.$f7router.back(`/rc/${self.$f7route.params.rc_id}/`, {force: true});
            }
          })
          .catch((error) => {
            last_btn++;
            console.log(error);
            if (self.buttons.length == last_btn) {
              self.$f7router.back(`/rc/${self.$f7route.params.rc_id}/`, {force: true});
            }
          });
        });
      }
    }
  }
};
</script>
