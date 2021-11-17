<template>
  <div class="home">
    <div>TOKEN: {{ token }}</div>
    <div>TICKET: {{ ticket }}</div>
    <div>EXP: {{ exp }}</div>    
    <div>NOW: {{ agora }}</div>    
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  computed: {
    agora() {
      return new Date();
    },
    exp() {
      return new Date(this.ticket.exp * 1000);
    },
    ...mapGetters('auth', [
      'token', 'ticket'
    ])
    
  }
}
</script>
