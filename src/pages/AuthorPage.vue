<template>
  <MoreAuthor :author="author" :books="books" />
  <div class="section-card">
    <span class="section-card-title">📚Livros de {{ author.NAME }}:</span>
    <q-separator/>
    <div class="section">
      <BookCard v-for="book in books" v-bind:key="book" :book="book"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { userStore } from 'src/stores/userStore.js'
import MoreAuthor from 'src/components/MoreAuthor.vue'
import BookCard from 'src/components/BookCard.vue'

export default {
  name: 'AuthorPage',

  components: {
    MoreAuthor,
    BookCard
  },

  data() {
    return {
      books: [],
      author: {}
    }
  },

  mounted() {
    this.getAuthor()
    this.getBooks()
  },

  methods: {
    getAuthor() {
      axios.get(`http://localhost:3000/autores/${this.$route.params.id}`, {
        headers: { Authorization: `Bearer ${userStore.jwt}` }
      })
      .then((res) => {
        this.author = res.data
      })
      .catch((err) => console.log(err))
    },

    getBooks() {
      axios.get(`http://localhost:3000/livros/autor/${this.$route.params.id}`, {
        headers: { Authorization: `Bearer ${userStore.jwt}` }
      })
      .then((res) => {
        this.books = res.data
        console.log(res.data);

      })
      .catch((err) => console.log(err))
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

.section {
  display: flex;
}
</style>
