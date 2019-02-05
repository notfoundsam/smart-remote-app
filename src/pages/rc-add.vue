<template>
  <f7-page>
    <f7-navbar title="Add a new RC" back-link="Back"></f7-navbar>
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

import { ajaxURL } from '../config.js';

export default {
  data() {
    return {
      name: '',
      icon: 'light',
    }
  },
  mounted() {
  },
  methods: {
    save: function() {
      if (this.name && this.icon) {
        this.axios.post(`${ajaxURL}/api/v1/rcs`, {
          name: this.name,
          icon: this.icon,
          order: 1,
          public: true
        })
        .then((responce) => {
          this.$f7router.back();
        })
        .catch((error) => {
          console.log(error);
        });
      }
    }
  }
};
</script>
