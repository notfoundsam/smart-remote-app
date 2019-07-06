<template>
  <!-- App -->
  <f7-app :params="f7params">

    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <!-- Right Panel -->
    <f7-panel right cover>
      <f7-view url="/panel-right/"></f7-view>
    </f7-panel>

    <!-- Main View -->
    <f7-view id="main-view" url="/" main></f7-view>

    <!-- Popup -->
    <f7-popup id="popup">
      <f7-view>
        <f7-page>
          <f7-navbar title="Popup">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, architecto. Cupiditate laudantium rem nesciunt numquam, ipsam. Voluptates omnis, a inventore atque ratione aliquam. Omnis iusto nemo quos ullam obcaecati, quod.</f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <!-- Login Screen -->
    <f7-login-screen id="login-screen">
      <f7-view>
        <f7-page login-screen>
          <f7-login-screen-title>Login</f7-login-screen-title>
          <f7-list form>
            <f7-list-input
              :value="username"
              @input="username = $event.target.value"
              label="Username"
              type="text"
              placeholder="Username"
              required
              validate
              error-message="The name is required"
            ></f7-list-input>
            <f7-list-input
              :value="password"
              @input="password = $event.target.value"
              label="Password"
              type="password"
              placeholder="Password"
              required
              validate
              error-message="The password is required"
            ></f7-list-input>
          </f7-list>
          <f7-list>
            <f7-list-button @click="signIn" title="Sign In"></f7-list-button>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-login-screen>

  </f7-app>
</template>

<script>

// Import Routes
import routes from './routes.js';
import { ajaxURL } from './config.js';

export default {
  data() {
    return {
      username: '',
      password: '',
      // Framework7 parameters here
      f7params: {
        id: 'io.framework7.smartremote', // App bundle ID
        name: 'Framework7', // App name
        theme: 'auto', // Automatic theme detection
        // App routes
        routes: routes,
      },
    }
  },
  mounted() {
    this.axios.get(`${ajaxURL}/api/v1/rcs`)
    .then((response) => {
      this.$store.commit('setRcs', response.data.rcs);
      this.getUserName();
    })
    .catch((error) => {
      if (error.response && error.response.status == 401) {
        console.log(401);
        this.$f7.loginScreen.open('#login-screen', true);
      } else {
        console.log(error);
      }
    });
  },
  methods: {
    signIn: function() {
      if (this.username && this.password) {
        this.axios.post(`${ajaxURL}/api/v1/login`, {
          username: this.username,
          password: this.password
        })
        .then((response) => {
          if (response.data.result) {
            this.axios.get(`${ajaxURL}/api/v1/rcs`)
            .then((response) => {
              this.$store.commit('setRcs', response.data.rcs);
              this.$store.commit('setUserName', this.username);
              this.getNodes();
              this.getRadios();
              this.$f7.loginScreen.close('#login-screen', true);
            })
            .catch((error) => {
              console.log(error);
            });
          }
        })
        .catch((error) => {
          if (error.response.status == 403) {
            this.$f7.dialog.alert('Fail', 'You are fired');
          } else {
            console.log(error);
          }
        });
      }
    },
    getUserName: function() {
      this.axios.get(`${ajaxURL}/api/v1/user`)
      .then((response) => {
        console.log(response.data.username);
        this.$store.commit('setUserName', response.data.username);
      })
      .catch((error) => {
        console.log(error);
      });
    },
    getNodes: function() {
      this.axios.get(`${ajaxURL}/api/v1/nodes`)
      .then((response) => {
        this.$store.commit('setNodes', response.data.nodes);
      })
      .catch((error) => {
        console.log(error);
      });
    },
    getRadios: function() {
      this.axios.get(`${ajaxURL}/api/v1/radios`)
      .then((response) => {
        this.$store.commit('setRadios', response.data.radios);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
}
</script>
