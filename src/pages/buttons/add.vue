<template>
  <f7-page>
    <f7-navbar title="Add a new button" back-link="Back" bg-color="blue" text-color="white" color-theme="white"></f7-navbar>
    
    <f7-block>
      <f7-row tag="p">
        <f7-col tag="span">
          <f7-button raised fill :href="`/rc/${$f7route.params.rc_id}/btn/radio/`">Radio Message</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col tag="span">
          <f7-button raised fill :href="`/rc/${$f7route.params.rc_id}/btn/mqtt/`">MQTT Message</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>

  </f7-page>
</template>
<script>

export default {};
</script>
