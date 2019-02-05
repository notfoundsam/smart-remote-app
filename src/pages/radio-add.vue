<template>
  <f7-page>
    <f7-navbar title="Add a new radio" back-link="Back"></f7-navbar>
    <f7-list no-hairlines-md>
      <f7-list-input
        :value="name"
        @input="name = $event.target.value"
        label="Radio name"
        type="text"
        placeholder="Enter a name"
        required
        validate
        error-message="The name is required"
        clear-button
      ></f7-list-input>
      <f7-list-input
        :value="pipe"
        @input="pipe = $event.target.value"
        label="Pipe of a radio"
        type="text"
        placeholder="Enter a pipe number"
        required
        validate
        error-message="The pipe is required"
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
      <f7-list-item
        radio
        title="Enable"
        name="enabled"
        value="true"
        :checked="enabled === true"
        @change="enabled = $event.target.value"
      ></f7-list-item>
      <f7-list-item
        radio
        title="Disable"
        name="enabled"
        value="false"
        :checked="enabled === false"
        @change="enabled = $event.target.value"
      ></f7-list-item>
      
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

import { ajaxURL } from '../config.js';
// import store from '../store';

export default {
  data() {
    return {
      name: '',
      pipe: '',
      order: '',
      enabled: true,
    }
  },
  mounted() {
  },
  methods: {
    save: function() {
      if (this.name && this.pipe && this.order) {
        this.axios.post(`${ajaxURL}/api/v1/radios`, {
          name: this.name,
          pipe: this.pipe,
          order: this.order,
          enabled: this.enabled
        })
        .then((responce) => {
          if (responce.data.radio) {
            this.$f7router.back();
          } else {
            console.log(responce.data);
          }
        })
        .catch((error) => {
          // console.log(error.response);
          if (error.response.status == 403) {
            console.log(403);
          } else {
            console.log(error.response);
          }
        });
      }
    }
  }
};
</script>