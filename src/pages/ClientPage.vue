<template>
  <ClientCard :client="client"/>
  <div class="section-card">
    <span class="section-card-title">📚Livros emprestados para {{ client.FIRST_NAME }} {{ client.LAST_NAME }}:</span>
    <q-separator/>
    <div class="section-card-books" v-if="books.length === 0 && !noBooks">
      <BookCardSkeleton v-for="num in 3" :key="num" />
    </div>
    <div class="section-card-books" v-else-if="books.length > 0">
      <BookCard v-for="book in books" :key="book.ID" :book="book" />
    </div>
    <div v-else>
      <span class="q-pa-md text-h6">Nenhum empréstimo encontrado.</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { userStore } from 'src/stores/userStore.js'
import ClientCard from 'src/components/ClientCard.vue'
import BookCard from 'src/components/BookCard.vue'
import { getLivrosEmprestados } from 'src/services/borrowServices.js'
import BookCardSkeleton from 'src/components/BookCardSkeleton.vue';

export default {
  name: 'ClientPage',

  components: {
    ClientCard,
    BookCard,
    BookCardSkeleton,
  },

  data() {
    return {
      client: {},
      books: [],
      noBooks: false
    }
  },

  mounted() {
    this.getClient();
    this.getBooks();
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

    async getBooks() {
      let result = await getLivrosEmprestados();
      this.books = result;
      if (result.length == 0) {
          this.noBooks = true;
        }
    },
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

.section-card-books {
  display: flex;
}
</style>
