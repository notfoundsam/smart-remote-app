<template>
  <f7-page>
    <f7-navbar :title="pageTitle" back-link="Back"></f7-navbar>
    <f7-list no-hairlines-md>
      <f7-list-input
        :value="name"
        @input="name = $event.target.value"
        label="Mqtt name"
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
        :value="clientName"
        @input="clientName = $event.target.value"
        label="Client name"
        type="text"
        placeholder="Enter a client name"
        required
        validate
        error-message="The client name is required"
        clear-button
      ></f7-list-input>
      <f7-list-item
        checkbox
        title="Enable"
        :value="enabled"
        :checked="enabled === 1"
        @change="checkIfEnabled"
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
      pageTitle: '',
      name: '',
      clientName: '',
      order: '',
      enabled: 1,
    }
  },
  computed: {},
  mounted() {
    if (this.$f7route.params.mqtt_id) {
      this.pageTitle = 'Edit the mqtt';
      this.axios.get(`${ajaxURL}/api/v1/mqtts/${this.$f7route.params.mqtt_id}`)
      .then((response) => {
        let mqtt = response.data.mqtt;
        this.name = mqtt.name;
        this.clientName = mqtt.client_name;
        this.order = mqtt.order;
        this.enabled = mqtt.enabled ? 1 : 0;
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      this.pageTitle = 'Add a new mqtt';
    }
  },
  methods: {
    checkIfEnabled: function(event) {
      let value = event.target.value;
      this.enabled = value == 1 ? 0 : 1;
    },
    save: function() {
      if (this.name && this.clientName && this.order) {
        let data = {
          name: this.name,
          client_name: this.clientName,
          enabled: this.enabled,
          order: this.order
        };

        if (this.$f7route.params.mqtt_id) {
          this.axios.put(`${ajaxURL}/api/v1/mqtts/${this.$f7route.params.mqtt_id}`, data)
          .then((response) => {
            if (response.data.mqtt) {
              this.$f7router.back('/', {force: true});
            } else {
              console.log(response.data);
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
        } else {
          this.axios.post(`${ajaxURL}/api/v1/mqtts`, data)
          .then((response) => {
            if (response.data.mqtt) {
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
