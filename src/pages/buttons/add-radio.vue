<template>
  <f7-page>
    <f7-navbar title="Add a new button" back-link="Back" bg-color="blue" text-color="white" color-theme="white"></f7-navbar>
    <f7-list no-hairlines-md>
      <f7-list-input
        :value="name"
        @input="name = $event.target.value"
        label="Button name"
        type="text"
        placeholder="Enter a name"
        required
        validate
        error-message="The name is required"
        clear-button
      ></f7-list-input>
      <f7-list-input
        :value="orderVer"
        @input="orderVer = $event.target.value"
        label="Order vertical"
        type="text"
        placeholder="Enter an order"
        required
        validate
        error-message="The order is required"
        clear-button
      ></f7-list-input>
      <f7-list-input
        :value="orderHor"
        @input="orderHor = $event.target.value"
        label="Order horizontal"
        type="text"
        placeholder="Enter an order"
        required
        validate
        error-message="The order is required"
        clear-button
      ></f7-list-input>
      <f7-list-item title="Choose a color" smart-select :smart-select-params="{navbarColorTheme: 'blue',navbarBgColor: 'blue', closeOnSelect: true}>
        <select v-model="selectedColor">
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="red">Red</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
          <option value="pink">Pink</option>
        </select>
      </f7-list-item>
      <f7-list-item title="Choose the radio" smart-select>
        <select v-model="selectedRadio">
          <option v-for="radio in radios" :value="radio.id">{{ radio.name }}</option>
        </select>
      </f7-list-item>
      <f7-list-input
        :value="message"
        @input="message = $event.target.value"
        label="Message"
        type="textarea"
        placeholder="Enter a message"
        required
        validate
        error-message="The message is required"
        clear-button
      ></f7-list-input>
    </f7-list>

    <f7-block-title>Catch an IR signal</f7-block-title>
    <f7-list no-hairlines-md>
      <f7-list-item title="Choose a node" smart-select>
        <select v-model="selectedCatchNode">
          <option v-for="node in nodes" :value="node.id">{{ node.host_name }}</option>
        </select>
      </f7-list-item>
    </f7-list>
    <f7-block>
      <f7-row>
        <f7-col tag="span">
          <f7-button :disabled="selectedCatchNode === ''" raised fill color="orange" @click="catchIr">Catch signal</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-block>
      <f7-row tag="p">
        <f7-col tag="span">
          <f7-button raised fill color="gray" @click="test">Test</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
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
      orderHor: '',
      orderVer: '',
      message: '',
      
      selectedColor: 'blue',
      selectedRadio: '',
      selectedCatchNode: '',

      nodes: this.$store.getters.getNodes,
      arduinos: [],
      radios: [],

      dialogTimeout: null,
    }
  },
  watch: {
    selectedNode: function() {
      if (this.selectedNode) {
        console.log(this.selectedNode);
        
        this.axios.get(`${ajaxURL}/api/v1/nodes/${this.selectedNode}/arduinos`)
        .then((response) => {
          this.arduinos = response.data.arduinos;
          console.log(response.data.arduinos);
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        console.log('empty');
      }
    }
  },
  mounted() {
    this.axios.get(`${ajaxURL}/api/v1/radios`)
    .then((response) => {
      this.radios = response.data.radios;

      if (this.$f7route.params.btn_id) {
        this.axios.get(`${ajaxURL}/api/v1/buttons/${this.$f7route.params.btn_id}`)
        .then((response) => {
          let button = response.data.button;
          this.name = button.name;
          this.orderHor = button.order_hor;
          this.orderVer = button.order_ver;
          this.message = button.message;
          this.selectedColor = button.color;
          this.selectedRadio = button.radio_id;
        })
        .catch((error) => {
          console.log(error);
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.status == 401) {
        this.$f7.loginScreen.open('#login-screen', true);
      } else {
        console.log(error);
      }
    });
  },
  sockets: {
    recievedIr(data) {
      if (this.dialogTimeout) {
        clearTimeout(this.dialogTimeout);
        this.$f7.dialog.close();
        if (data.result == 'success') {
          this.message = data.ir_signal
          console.log(data);
        } else if (data.result == 'error') {
          this.$f7.dialog.close();
          this.$f7.dialog.alert(data.errors, 'Error');
        }
      }
    }
  },
  methods: {
    save: function() {
      if (this.name && this.orderHor && this.orderVer && this.selectedColor && this.selectedRadio && this.message) {
        let data = {
          rc_id: this.$f7route.params.rc_id,
          name: this.name,
          order_hor: this.orderHor,
          order_ver: this.orderVer,
          color: this.selectedColor,
          message: this.message,
          radio_id: this.selectedRadio,
          type: 'radio',
        };

        if (this.$f7route.params.btn_id) {
          this.axios.put(`${ajaxURL}/api/v1/buttons/${this.$f7route.params.btn_id}`, data)
          .then((response) => {
            if (response.data.button) {
              this.$f7router.back(`/rc/${this.$f7route.params.rc_id}/`, {force: true});
              console.log(this.$f7router.history);
            } else {
              console.log(response.data);
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
        } else {
          this.axios.post(`${ajaxURL}/api/v1/buttons`, data)
          .then((response) => {
            if (response.data.button) {
              this.$f7router.back(`/rc/${this.$f7route.params.rc_id}/`, {force: true});
            } else {
              console.log(response.data);
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
        }
      }
    },
    catchIr: function() {
      if (this.selectedCatchNode) {
        let that = this;
        that.$f7.dialog.preloader('Waiting for an IR', 'gray');
        
        this.dialogTimeout = setTimeout(function() {
          that.$f7.dialog.close();
          that.$f7.dialog.alert('The signal did not recieve', 'Timeout error');
        }, 15000);

        this.$socket.emit('catch_ir', JSON.stringify({'node_id': this.selectedCatchNode}))
        // this.message = '1500 800 800 1600';
      }
    },
    test: function() {
      if (this.selectedRadio && this.selectedNode && this.selectedArduino && this.message) {
        this.axios.post(`${ajaxURL}/api/v1/rcs/${this.$f7route.params.rc_id}/buttons`, {
          message: this.message,
          radio_id: this.selectedRadio,
          node_id: this.selectedNode,
          arduino_id: this.selectedArduino,
          type: 'ir',
        })
        .then((response) => {
          if (response.data.button) {
            this.$f7router.back();
          } else {
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
      }
    }
  }
};
</script>
