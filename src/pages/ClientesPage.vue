<template>
  <ClientesCard :clientes="clientes" :loading="loading"/>
</template>

<script>
import axios from 'axios';
import ClientesCard from 'src/components/ClientesCard.vue';
import { defineComponent } from 'vue';
import { userStore } from 'src/stores/userStore';
import { Notify } from 'quasar';

export default defineComponent({
  name: 'IndexPage',

  components: { ClientesCard },

  data() {
    return {
      clientes: [],
      loading: true
    }
  },

  mounted() {
    this.getClientes()
  },

  methods: {
    getClientes() {
      if (userStore.jwt) {
        axios.get("http://localhost:3000/clientes", {
          headers: {
            Authorization: `Bearer ${userStore.jwt}`
          }
        })
        .then((response) => {
          this.clientes = response.data
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        })
      } else {
        console.log("NAO LOGADO");
        Notify.create("É necessário estar logado para acessar essa página.")
      }
    }
  }
});
</script>
