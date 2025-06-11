<template>
  <ClientCard :client />
  <div class="section-card">
    <span class="section-card-title">📚Livros emprestados para {{ client.FIRST_NAME }} {{ client.LAST_NAME }}:</span>
    <q-separator/>
    <div class="section">
      <BookCard v-for="book in books" v-bind:key="book" :book="book"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { userStore } from 'src/stores/userStore.js'
import ClientCard from 'src/components/ClientCard.vue'
import BookCard from 'src/components/BookCard.vue'
import { getEmprestimosService } from 'src/services/borrowServices.js'

export default {
  name: 'ClientPage',

  components: {
    ClientCard,
    BookCard,
  },

  data() {
    return {
      client: {},
      books: [],
      noBooks: null
    }
  },

  mounted() {
    this.getClient();
    this.getEmprestimos();
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
    },

    async getEmprestimos() {
      this.books = await getEmprestimosService();
      console.log(this.books);

    }
  },
}
</script>

<style>
.section-card {
  display: flex;
  flex-direction: column;
  margin: 16px;
}

.section-card-title {
  font-size: 20px;
}

.section {
  display: flex;
}
</style>
