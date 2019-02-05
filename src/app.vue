<template>
  <!-- App -->
  <f7-app :params="f7params">

    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <!-- Right Panel -->
    <f7-panel right cover theme-dark>
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
            <f7-list-item>
              <f7-label>Username</f7-label>
              <f7-input name="username" @input="username = $event.target.value" :value="username" placeholder="Username" type="text"></f7-input>
            </f7-list-item>
            <f7-list-item>
              <f7-label>Password</f7-label>
              <f7-input name="password" @input="password = $event.target.value" :value="password" type="password" placeholder="Password"></f7-input>
            </f7-list-item>
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
    .then((responce) => {
      this.$store.commit('setRcs', responce.data.rcs);
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
        .then((responce) => {
          if (responce.data.result) {
            this.axios.get(`${ajaxURL}/api/v1/rcs`)
            .then((responce) => {
              this.$store.commit('setRcs', responce.data.rcs);
              this.$store.commit('setUserName', this.username);
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
      .then((responce) => {
        this.$store.commit('setUserName', responce.data.username);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
}
</script>
