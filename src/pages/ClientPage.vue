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

export default {
  name: 'ClientPage',

  components: {
    ClientCard,
    BookCard,
  },

  data() {
    return {
      client: {},
      books: []
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

    getEmprestimos() {
      axios.get(`http://localhost:3000/clientes/email/${userStore.user}`, {
        headers: { Authorization: `Bearer ${userStore.jwt}` }
      })
      .then((res) => {
        axios.get(`http://localhost:3000/emprestimos/clientes/${res.data.ID}`, {
          headers: { Authorization: `Bearer ${userStore.jwt}` }
        })
        .then((respo) => {
          for (var i = 0; i<respo.data.length; i++) {
            axios.get(`http://localhost:3000/emprestimos/itens/${respo.data[i].ID}`, {
              headers: { Authorization: `Bearer ${userStore.jwt}` }
            })
            .then((response) => {
              for (var i = 0; i<response.data.length; i++) {
                axios.get(`http://localhost:3000/livros/${response.data[i].LIVRO_ID}`, {
                  headers: { Authorization: `Bearer ${userStore.jwt}` }
                })
                .then((responsee) => {
                  console.log(responsee.data);
                  this.books.push(responsee.data)
                })
                .catch((err) => console.log(err))
              }
            })
            .catch((err) => console.log(err))
          }
        })
        .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))


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
