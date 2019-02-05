<template>
  <f7-page>
    <f7-navbar title="Add a new button" back-link="Back"></f7-navbar>
    
    <f7-block>
      <f7-row tag="p">
        <f7-col tag="span">
          <f7-button raised fill :href="`/btn/${$f7route.params.rc_id}/add/ir/`">Radio Infrared</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col tag="span">
          <f7-button raised fill :href="`/btn/${$f7route.params.rc_id}/add/cmd/`">Radio Command</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col tag="span">
          <f7-button raised fill :href="`/btn/${$f7route.params.rc_id}/add/bc/`">Radio Broadcast</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col tag="span">
          <f7-button raised fill :href="`/btn/${$f7route.params.rc_id}/add/mqtt/`">MQTT Message</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>

  </f7-page>
</template>
<script>

export default {};
</script>
