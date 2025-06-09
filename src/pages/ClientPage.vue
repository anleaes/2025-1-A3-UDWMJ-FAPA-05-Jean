<template>
  <ClientCard :client />
</template>

<script>
import axios from 'axios';
import { userStore } from 'src/stores/userStore.js'
import ClientCard from 'src/components/ClientCard.vue'

export default {
  name: 'ClientPage',

  components: {
    ClientCard
  },

  data() {
    return {
      client: {}
    }
  },

  mounted() {
    this.getClient()
  },

  methods: {
    getClient() {
      axios.get(`http://localhost:3000/clientes/email/${userStore.user}`, {
        headers: { Authorization: `Bearer ${userStore.jwt}` }
      })
      .then((res) => {
        this.client = res.data
      })
      .catch((err) => console.log(err))
    }
  },
}
</script>
