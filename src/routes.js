import HomePage from './pages/home.vue';
import RcPage from './pages/rc.vue';
import RcAddPage from './pages/rc-add.vue';

import NodeEditPage from './pages/node-edit.vue';
import RadioAddPage from './pages/radio-add.vue';
import ArduinoAddPage from './pages/arduino-add.vue';

import BtnAddPage from './pages/btn-add.vue';
import BtnEditPage from './pages/btn-edit.vue';
import BtnRemovePage from './pages/btn-remove.vue';
import BtnAddRadioIrPage from './pages/btn-add-radio-ir.vue';

import PanelRightPage from './pages/panel-right.vue';
import NotFoundPage from './pages/not-found.vue';

export default [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/node/:node_id/edit/',
    component: NodeEditPage,
  },
  {
    path: '/rc/:rc_id/',
    component: RcPage,
  },
  {
    path: '/rc/add/',
    component: RcAddPage,
  },
  {
    path: '/radio/add/',
    component: RadioAddPage,
  },
  {
    path: '/arduino/:node_id/add/',
    component: ArduinoAddPage,
  },
  {
    path: '/arduino/:node_id/edit/:arduino_id/',
    component: ArduinoAddPage,
  },
  {
    path: '/btn/:rc_id/add/',
    component: BtnAddPage,
  },
  {
    path: '/btn/:rc_id/edit/',
    component: BtnEditPage,
  },
  {
    path: '/btn/:rc_id/remove/',
    component: BtnRemovePage,
  },
  {
    path: '/btn/:rc_id/add/ir/',
    component: BtnAddRadioIrPage,
  },
  {
    path: '/btn/:rc_id/add/cmd/',
    component: BtnAddRadioIrPage,
  },
  {
    path: '/btn/:rc_id/add/mqtt/',
    component: BtnAddRadioIrPage,
  },
  {
    path: '/btn/:rc_id/edit/:btn_id/ir/',
    component: BtnAddRadioIrPage,
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
