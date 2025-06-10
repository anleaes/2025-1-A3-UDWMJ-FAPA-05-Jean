<template>
  <div class="section-card">
    <span class="section-card-title">📚Livros:</span>
    <q-separator/>
    <div class="section">
      <BookCard v-for="book in books" v-bind:key="book" :book="book"/>
    </div>
  </div>

  <div class="section-card">
    <span class="section-card-title">🧑‍🏫Autores:</span>
    <q-separator/>
    <div class="section">
      <AuthorCard v-for="author in authors" v-bind:key="author" :author="author"/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BookCard from 'src/components/BookCard.vue';
import AuthorCard from 'src/components/AuthorCard.vue';
import axios from 'axios';

export default defineComponent({
  name: 'IndexPage',

  data() {
    return {
      books: [],
      authors: []
    }
  },

  components: { BookCard, AuthorCard },

  mounted() {
    this.getBooks()
    this.getAuthors()
  },

  methods: {
    getBooks() {
      axios.get(`http://localhost:3000/livros`)
        .then((response) => {
          this.books = response.data
        })
        .catch((error) => {
          console.log(error);
        })
    },
    getAuthors() {
      axios.get(`http://localhost:3000/autores`)
        .then((response) => {
          console.log(response.data);

          this.authors = response.data
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }
});
</script>

<style>
.section-card {
  display: flex;
  flex-direction: column;
  margin: 16px;
}

.section-card-title {
  font-size: 32px;
}

.section {
  display: flex;
}
</style>
