<template>
  <f7-page>
    <f7-navbar title="Edit remote" back-link="Back" bg-color="blue" text-color="white" color-theme="white"></f7-navbar>
    
    <f7-list no-hairlines-md>
      <f7-list-item
        v-for="radio in radios" :key="radio.id"
        radio
        :title="radio.name"
        name="radio"
        :value="radio.id"
        @change="radio_id = $event.target.value"
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
      radios: [],
      radio_id: '',
    }
  },
  mounted() {
    this.axios.get(`${ajaxURL}/api/v1/radios`)
    .then((response) => {
      this.radios = response.data.radios;

    })
    .catch((error) => {
      console.log(error);
    });
  },
  methods: {
    edit: function() {
      if (this.radio_id) {
        this.$f7router.navigate(`/radio/edit/${this.radio_id}/`);
      }
    }
  }
};
</script>
