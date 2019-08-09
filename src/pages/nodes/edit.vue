<template>
  <f7-page>
    <f7-navbar title="Edit the node" back-link="Back"></f7-navbar>
    <f7-list no-hairlines-md>
      <!-- <f7-list-input
        :value="name"
        @input="name = $event.target.value"
        label="Node name"
        type="text"
        placeholder="Enter a name"
        required
        validate
        error-message="The name is required"
        clear-button
      ></f7-list-input> -->
      <f7-list-input
        :value="hostName"
        @input="hostName = $event.target.value"
        label="Usb port of an arduino"
        type="text"
        placeholder="Enter an usb port"
        required
        validate
        error-message="The usb port is required"
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

    <f7-block>
      <f7-row tag="p">
        <f7-col tag="span">
          <f7-button raised fill @click="save">Save</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
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
      hostName: '',
      order: ''
    }
  },
  mounted() {
    if (this.$f7route.params.node_id) {
      this.axios.get(`${ajaxURL}/api/v1/nodes/${this.$f7route.params.node_id}`)
      .then((response) => {
        let node = response.data.node;
        // this.name = node.name;
        this.hostName = node.host_name;
        this.order = node.order;
      })
      .catch((error) => {
        console.log(error);
      });
    }
  },
  methods: {
    save: function() {
      if (this.hostName && this.order) {
        this.axios.put(`${ajaxURL}/api/v1/nodes/${this.$f7route.params.node_id}`, {
          // name: this.name,
          host_name: this.hostName,
          order: this.order
        })
        .then((response) => {
          if (response.data.node) {
            this.$f7router.back();
          } else {
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }
    },
    remove: function() {
      this.axios.delete(`${ajaxURL}/api/v1/nodes/${this.$f7route.params.node_id}`)
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
