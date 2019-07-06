<template>
  <f7-page>
    <f7-navbar title="Add a new RC" back-link="Back" bg-color="blue" text-color="white" color-theme="white"></f7-navbar>
    <f7-block-title>RC settings</f7-block-title>
    <f7-list no-hairlines-md>
      <f7-list-input
        :value="name"
        @input="name = $event.target.value"
        label="RC name"
        type="text"
        placeholder="Enter a name"
        required
        validate
        error-message="The name is required"
        clear-button
      ></f7-list-input>
      <f7-list-input
        :value="order"
        @input="order = $event.target.value"
        label="Order"
        type="text"
        placeholder="Enter an order"
        required
        validate
        error-message="The order is required"
        clear-button
      ></f7-list-input> 
    </f7-list>
    <f7-list>
      <f7-list-item title="Choose an icon" smart-select>
        <select name="icon" v-model="icon">
          <option value="light" selected>Light</option>
          <option value="tv">TV</option>
        </select>
      </f7-list-item>
    </f7-list>

    <f7-block>
      <f7-row tag="p">
        <f7-col tag="span">
          <f7-button raised fill @click="save">Save</f7-button>
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
      name: '',
      icon: 'light',
      order: '',
    }
  },
  mounted() {
    if (this.$f7route.params.rc_id) {
      this.axios.get(`${ajaxURL}/api/v1/rcs/${this.$f7route.params.rc_id}`)
      .then((response) => {
        let rc = response.data.rc;
        this.name = rc.name;
        this.icon = rc.icon;
        this.order = rc.order;
      })
      .catch((error) => {
        console.log(error);
      });
    }
  },
  methods: {
    save: function() {
      if (this.name && this.order && this.icon) {
        let data = {
          name: this.name,
          icon: this.icon,
          order: this.order,
          public: true
        };

        if (this.$f7route.params.rc_id) {
          this.axios.put(`${ajaxURL}/api/v1/rcs/${this.$f7route.params.rc_id}`, data)
          .then((response) => {
            if (response.data.rc) {
              this.$f7router.back(`/`, {force: true});
            } else {
              console.log(response.data);
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
        } else {
          this.axios.post(`${ajaxURL}/api/v1/rcs`, data)
          .then((response) => {
            this.$f7router.back(`/`, {force: true});
          })
          .catch((error) => {
            console.log(error);
          });
        }
      }
    }
  }
};
</script>
