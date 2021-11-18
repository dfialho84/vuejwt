<template>
  <div class="home">
    <div>TOKEN: {{ token }}</div>
    <div>TICKET: {{ ticket }}</div>
    <div>EXP: {{ exp }}</div>    
    <div>NOW: {{ agora }}</div>    
    <button class="bg-gray-500" @click="buscarPublico()">Buscar Publico</button>
    <div>{{ publico }}</div>
    <button class="bg-gray-500" @click="buscarPrivado()">Buscar Privado</button>
    <div>{{ privado }}</div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      publico: "NAO DEFINIDO",
      privado: "NAO DEFINIDO",
    }
  },
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
    
  },
  methods: {
    buscarPublico() {
      axios.get('http://localhost:8081/public').then(resp => {
        console.log(resp);
        this.publico = resp.data;
      });
    },
    buscarPrivado() {
      const options = {
        headers: {
          Authorization: this.token
        }

      }
      axios.get('http://localhost:8081/protected', options).then(resp => {
        console.log(resp);
        this.privado = resp.data;
      });
    }
  }  
}
</script>
