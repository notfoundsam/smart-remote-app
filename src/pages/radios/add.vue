<template>
  <f7-page>
    <f7-navbar title="Add a new radio" back-link="Back" bg-color="blue" text-color="white" color-theme="white"></f7-navbar>
    <f7-list no-hairlines-md>
      <f7-list-input
        :value="name"
        @input="name = $event.target.value"
        label="Radio name"
        type="text"
        placeholder="Enter the name"
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
    <f7-block-title>Type settings</f7-block-title>
    <f7-list>
      <f7-list-item
        radio
        title="Broadcast"
        name="type"
        value="broadcast"
        :checked="type === 'broadcast'"
        @change="type = $event.target.value"
      ></f7-list-item>
      <f7-list-item
        radio
        title="Unicast"
        name="type"
        value="unicast"
        :checked="type === 'unicast'"
        @change="type = $event.target.value"
      ></f7-list-item>
      <f7-list-input
        :value="pipe"
        @input="pipe = $event.target.value"
        label="Pipe of the radio"
        type="text"
        :placeholder="pipePlaceholder"
        required
        validate
        error-message="The pipe is required"
        clear-button
      ></f7-list-input>
      <f7-list-item
        checkbox
        title="On request"
        :value="onRequest"
        :checked="onRequest === 1"
        @change="checkOnRequest"
      ></f7-list-item>
      <f7-list-input
        v-if="onRequest"
        :value="expiredAfter"
        @input="expiredAfter = $event.target.value"
        label="Alive time"
        type="text"
        placeholder="In seconds"
        required
        validate
        error-message="Alive time is required"
        clear-button
      ></f7-list-input>
    </f7-list>
    <f7-list>
      <f7-list-item title="Choose an arduino" smart-select :smart-select-params="{navbarColorTheme: 'blue',navbarBgColor: 'blue', closeOnSelect: true}">
        <select v-model="selectedArduino">
          <option v-for="arduino in arduinos" :value="arduino.id">{{ arduino.name }}</option>
        </select>
      </f7-list-item>
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

import { ajaxURL } from '../../config.js';

export default {
  data() {
    return {
      name: '',
      pipe: '',
      order: '',
      type: 'broadcast',
      enabled: true,
      onRequest: 0,
      expiredAfter: '',
      selectedArduino: '',

      nodes: this.$store.getters.getNodes,
      arduinos: [],
    }
  },
  computed: {
    pipePlaceholder() {
      return this.type == 'broadcast' ? 'Enter between 32 and 126' : 'Example 0xAABBCCDD11';
    }
  },
  mounted() {
    this.axios.get(`${ajaxURL}/api/v1/arduinos`)
    .then((response) => {
      this.arduinos = response.data.arduinos;
      console.log(response.data.arduinos);
    })
    .catch((error) => {
      console.log(error);
    });
    if (this.$f7route.params.radio_id) {
      this.axios.get(`${ajaxURL}/api/v1/radios/${this.$f7route.params.radio_id}`)
      .then((response) => {
        let radio = response.data.radio;
        this.selectedArduino = radio.arduino_id;
        this.name = radio.name;
        this.pipe = radio.pipe;
        this.order = radio.order;
        this.onRequest = radio.on_request ? 1 : 0;
        this.expiredAfter = radio.expired_after == 0 ? '' : radio.expired_after;
        this.enabled = radio.enabled;
      })
      .catch((error) => {
        console.log(error);
      });
    }
  },
  methods: {
    checkOnRequest: function(event) {
      let value = event.target.value;
      this.onRequest = value == 1 ? 0 : 1;
    },
    save: function() {
      if (this.name && this.type && this.selectedArduino && this.pipe && this.order) {
        let data = {
          arduino_id: this.selectedArduino,
          pipe: this.pipe,
          type: this.type,
          name: this.name,
          enabled: this.enabled,
          on_request: this.onRequest,
          expired_after: this.expiredAfter == '' ? 0 : this.expiredAfter,
          order: this.order
        };

        if (this.$f7route.params.radio_id) {
          this.axios.put(`${ajaxURL}/api/v1/radios/${this.$f7route.params.radio_id}`, data)
          .then((response) => {
            if (response.data.radio) {
              this.$f7router.back(`/`, {force: true});
            } else {
              console.log(response.data);
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
        } else {
          this.axios.post(`${ajaxURL}/api/v1/radios`, data)
          .then((response) => {
            if (response.data.radio) {
              this.$f7router.back();
            } else {
              console.log(response.data);
            }
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
