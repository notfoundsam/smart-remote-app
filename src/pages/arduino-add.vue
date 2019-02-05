<template>
  <f7-page>
    <f7-navbar title="Add a new arduino" back-link="Back"></f7-navbar>
    <f7-list no-hairlines-md>
      <f7-list-input
        :value="name"
        @input="name = $event.target.value"
        label="Arduino name"
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
      <f7-list-input
        :value="usb"
        @input="usb = $event.target.value"
        label="Usb port of an arduino"
        type="text"
        placeholder="Enter an usb port"
        required
        validate
        error-message="The usb port is required"
        clear-button
      ></f7-list-input>
      <f7-list-item
        radio
        title="Both"
        name="mode"
        value=""
        :checked="mode === 'rtx'"
        @change="mode = $event.target.value"
      ></f7-list-item>
      <f7-list-item
        radio
        title="Transmitter"
        name="mode"
        value="tx"
        :checked="mode === 'tx'"
        @change="mode = $event.target.value"
      ></f7-list-item>
      <f7-list-item
        radio
        title="Receiver"
        name="mode"
        value="rx"
        :checked="mode === 'rx'"
        @change="mode = $event.target.value"
      ></f7-list-item>
      
    </f7-list>

    <f7-block>
      <f7-row tag="p">
        <f7-col tag="span">
          <f7-button raised fill @click="save">Save</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p" v-if="$f7route.params.arduino_id">
        <f7-col tag="span">
          <f7-button raised fill color="red" @click="remove">Remove</f7-button>
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
      order: '',
      usb: '',
      mode: 'rtx',
    }
  },
  mounted() {
    if (this.$f7route.params.arduino_id) {
      this.axios.get(`${ajaxURL}/api/v1/nodes/${this.$f7route.params.node_id}/arduinos/${this.$f7route.params.arduino_id}`)
      .then((responce) => {
        let arduino = responce.data.arduino;
        this.name = arduino.name;
        this.order = arduino.order;
        this.usb = arduino.usb;
        this.mode = arduino.mode;
      })
      .catch((error) => {
        console.log(error);
      });
    }
  },
  methods: {
    save: function() {
      if (this.name && this.order && this.usb && this.mode) {
        let data = {
          name: this.name,
          order: this.order,
          usb: this.usb,
          mode: this.mode
        };

        if (this.$f7route.params.arduino_id) {
          this.axios.put(`${ajaxURL}/api/v1/nodes/${this.$f7route.params.node_id}/arduinos/${this.$f7route.params.arduino_id}`, data)
          .then((responce) => {
            if (responce.data.arduino) {
              this.$f7router.back();
            } else {
              console.log(responce.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
        } else {
          this.axios.post(`${ajaxURL}/api/v1/nodes/${this.$f7route.params.node_id}/arduinos`, data)
          .then((responce) => {
            if (responce.data.arduino) {
              this.$f7router.back();
            } else {
              console.log(responce.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
        }
      }
    },
    remove: function() {
      this.axios.delete(`${ajaxURL}/api/v1/nodes/${this.$f7route.params.node_id}/arduinos/${this.$f7route.params.arduino_id}`)
      .then((responce) => {
        console.log(responce);
        if (responce.data.result) {
          this.$f7router.back();
        } else {
          console.log(responce.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
};
</script>
