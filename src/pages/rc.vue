<template>
  <f7-page>
    <f7-navbar :title="name" back-link="Back" back-link-url="/radio/add/">
      <f7-nav-right>
        <f7-link panel-open="right"><font-awesome-icon icon="bars" size="1x" /></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-toolbar :bottom-md="true">
      <f7-link></f7-link>
      <f7-link @click="$refs.actionsButtonGroup.open()"><font-awesome-icon icon="sliders-h" size="2x" /></f7-link>
    </f7-toolbar>

    <div>
      <f7-block>
        <f7-row v-for="(row, index) in buttons" :key="index" tag="p">
          <f7-col v-for="button in row" :key="button.id" tag="span">
            <f7-button raised fill :color="button.color" @click="pushButton(button.id)">{{ button.name }}</f7-button>
          </f7-col>
        </f7-row>
      </f7-block>
    </div>

    <!-- Button Group -->
    <f7-actions ref="actionsButtonGroup">
      <f7-actions-group>
        <f7-actions-button bold @click="$f7router.navigate(`/btn/${$f7route.params.rc_id}/add/`)">Add button</f7-actions-button>
        <f7-actions-button bold @click="$f7router.navigate(`/btn/${$f7route.params.rc_id}/edit/`)">Edit button</f7-actions-button>
        <f7-actions-button bold @click="$f7router.navigate(`/btn/${$f7route.params.rc_id}/remove/`)">Remove buttons</f7-actions-button>
        <f7-actions-button color="red">Cancel</f7-actions-button>
      </f7-actions-group>
    </f7-actions>
  </f7-page>
</template>

<script>

import { ajaxURL } from '../config.js';

export default {
  data() {
    return {
      buttons: [],
      name: ''
    }
  },
  mounted() {
    this.axios.get(`${ajaxURL}/api/v1/rcs/${this.$f7route.params.rc_id}`)
    .then((responce) => {
      this.name = responce.data.rc.name;
    })
    .catch((error) => {
      console.log(error);
    });

    this.axios.get(`${ajaxURL}/api/v1/rcs/${this.$f7route.params.rc_id}/buttons`)
    .then((responce) => {
      let btn_arr = [];
      let btn_row = [];
      let index = null;

      responce.data.buttons.forEach(function(element) {
        if (index == null) {
          index = element.order_ver;
        }

        if (index != element.order_ver) {
          index = element.order_ver;
          btn_arr.push(btn_row);
          btn_row = [];
        }

        btn_row.push(element);
      });

      btn_arr.push(btn_row);
      console.log(btn_arr);
      this.buttons = btn_arr;
    })
    .catch((error) => {
      console.log(error);
    });
  },
  methods: {
    pushButton: function(btn_id) {
      console.log(btn_id);
      this.axios.get(`${ajaxURL}/api/v1/rcs/${this.$f7route.params.rc_id}/buttons/${btn_id}/push`)
      .then((responce) => {
        console.log(responce);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
}
</script>
