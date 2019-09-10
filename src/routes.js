import HomePage from './pages/home.vue';
import NodePage from './pages/nodes/index.vue';
import RcPage from './pages/rcs/index.vue';
import RcAddPage from './pages/rcs/add.vue';
import RcEditPage from './pages/rcs/edit.vue';
import RcRemovePage from './pages/rcs/remove.vue';

import NodeEditPage from './pages/nodes/edit.vue';

import RadioAddPage from './pages/radios/add.vue';

import MqttAddPage from './pages/mqtts/add.vue';

import ArduinoAddPage from './pages/arduinos/add.vue';

import BtnAddPage from './pages/buttons/add.vue';
import BtnEditPage from './pages/buttons/edit.vue';
import BtnRemovePage from './pages/buttons/remove.vue';
import BtnAddRadioPage from './pages/buttons/add-radio.vue';
import BtnAddMqttPage from './pages/buttons/add-mqtt.vue';

import PanelRightPage from './pages/panel-right.vue';
import NotFoundPage from './pages/not-found.vue';

export default [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/node/',
    component: NodePage,
  },
  {
    path: '/node/:node_id/edit/',
    component: NodeEditPage,
  },

  /* RC path */
  {
    path: '/rc/add/',
    component: RcAddPage,
  },
  {
    path: '/rc/remove/',
    component: RcRemovePage,
  },
  {
    path: '/rc/:rc_id/edit/',
    component: RcAddPage,
  },
  {
    path: '/rc/edit/',
    component: RcEditPage,
  },
  {
    path: '/rc/:rc_id/',
    component: RcPage,
  },

  /* Button path */
  {
    path: '/rc/:rc_id/btn/add/',
    component: BtnAddPage,
  },
  {
    path: '/rc/:rc_id/btn/edit/',
    component: BtnEditPage,
  },
  {
    path: '/rc/:rc_id/btn/remove/',
    component: BtnRemovePage,
  },
  {
    path: '/rc/:rc_id/btn/radio/',
    component: BtnAddRadioPage,
  },
  {
    path: '/rc/:rc_id/btn/mqtt/',
    component: BtnAddMqttPage,
  },
  {
    path: '/rc/:rc_id/btn/radio/:btn_id/',
    component: BtnAddRadioPage,
  },
  {
    path: '/rc/:rc_id/btn/mqtt/:btn_id/',
    component: BtnAddMqttPage,
  },

  /* Radio path */
  {
    path: '/radio/add/',
    component: RadioAddPage,
  },
  {
    path: '/radio/:radio_id/edit/',
    component: RadioAddPage,
  },

  /* Mqtt path */
  {
    path: '/mqtt/add/',
    component: MqttAddPage,
  },
  {
    path: '/mqtt/:mqtt_id/edit/',
    component: MqttAddPage,
  },

  /* Arduino path */
  {
    path: '/arduino/:node_id/add/',
    component: ArduinoAddPage,
  },
  {
    path: '/arduino/:node_id/edit/:arduino_id/',
    component: ArduinoAddPage,
  },
  {
    path: '/panel-right/',
    component: PanelRightPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
