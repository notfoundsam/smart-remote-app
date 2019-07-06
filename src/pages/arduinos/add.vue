<template>
  <f7-page>
    <f7-navbar title="Add a new arduino" back-link="Back" back-link-url="/node/" bg-color="blue" text-color="white" color-theme="white"></f7-navbar>
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

import { ajaxURL } from '../../config.js';

export default {
  data() {
    return {
      name: '',
      order: '',
      usb: '',
    }
  },
  mounted() {
    if (this.$f7route.params.arduino_id) {
      this.axios.get(`${ajaxURL}/api/v1/arduinos/${this.$f7route.params.arduino_id}`)
      .then((response) => {
        let arduino = response.data.arduino;
        this.name = arduino.name;
        this.order = arduino.order;
        this.usb = arduino.usb;
        // this.mode = arduino.mode;
      })
      .catch((error) => {
        console.log(error);
      });
    }
  },
  methods: {
    save: function() {
      if (this.name && this.order && this.usb && this.$f7route.params.node_id) {
        let data = {
          name: this.name,
          order: this.order,
          usb: this.usb,
          node_id: this.$f7route.params.node_id
        };

        if (this.$f7route.params.arduino_id) {
          this.axios.put(`${ajaxURL}/api/v1/arduinos/${this.$f7route.params.arduino_id}`, data)
          .then((response) => {
            if (response.data.arduino) {
              this.$f7router.back();
            } else {
              console.log(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
        } else {
          this.axios.post(`${ajaxURL}/api/v1/arduinos`, data)
          .then((response) => {
            if (response.data.arduino) {
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
    },
    remove: function() {
      this.axios.delete(`${ajaxURL}/api/v1/arduinos/${this.$f7route.params.arduino_id}`)
      .then((response) => {
        console.log(response);
        if (response.data.result) {
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
};
</script>
