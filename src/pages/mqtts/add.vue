<template>
  <f7-page>
    <f7-navbar title="Add a new mqtt" back-link="Back"></f7-navbar>
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
        :value="topic"
        @input="topic = $event.target.value"
        label="Topic"
        type="text"
        placeholder="Enter a listening topic"
        required
        validate
        error-message="The topic is required"
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
      name: '',
      pipe: '',
      order: '',
      type: 'broadcast',
      enabled: 1,
      onRequest: 0,
      expiredAfter: '',
      selectedArduino: '',
    }
  },
  computed: {
    pipePlaceholder() {
      return this.type == 'broadcast' ? 'Enter between 32 and 126' : 'Example 0xAABBCCDD11';
    },
    arduinos() {
      return this.$store.getters.getArduinos;
    },
    arduinoTitle() {
      if (this.selectedArduino != '') {
        let index = this.arduinos.map(x => {
          return x.id;
        }).indexOf(this.selectedArduino);
        return `Arduino: ${this.arduinos[index].name}`;
      }

      return 'Choose an arduino';
    }
  },
  mounted() {
    this.sm = this.$f7.smartSelect.create({
      el: '#smArduinos',
      closeOnSelect: true,
      openIn: 'page'
    });

    this.axios.get(`${ajaxURL}/api/v1/arduinos`)
    .then((response) => {
      this.$store.commit('setArduinos', response.data.arduinos);
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
    checkIfEnabled: function(event) {
      let value = event.target.value;
      this.enabled = value == 1 ? 0 : 1;
    },
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
