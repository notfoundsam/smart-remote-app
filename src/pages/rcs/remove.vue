<template>
  <f7-page>
    <f7-navbar title="Remove remote" back-link="Back"></f7-navbar>
    
    <f7-list no-hairlines-md>
      <f7-list-item
        v-for="rc in rcs" :key="rc.id"
        checkbox
        :title="rc.name"
        name="rc"
        :value="rc.id"
        :checked="selected.indexOf(rc.id) >= 0"
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

import { ajaxURL } from '../../config.js';

export default {
  data() {
    return {
      rcs: [],
      selected: [],
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
      if (this.selected.length > 0) {
        const self = this;
        let last_rc = 0;

        this.selected.forEach(function(rc) {
          self.axios.delete(`${ajaxURL}/api/v1/rcs/${rc}`)
          .then((response) => {
            last_rc++;
            if (self.selected.length == last_rc) {
              self.$f7router.back();
            }
          })
          .catch((error) => {
            last_rc++;
            console.log(error);
            if (self.selected.length == last_rc) {
              self.$f7router.back();
            }
          });
        });
      }
    }
  }
};
</script>
