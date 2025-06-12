<template>
  <div class="section-card" v-if="books.length >= 1">
    <span class="section-card-title">📚Livros:</span>
    <q-separator/>
    <div class="section-card-books">
      <BookCard v-for="book in books" v-bind:key="book" :book="book"/>
    </div>
  </div>

  <div class="section-card" v-else>
    <span class="section-card-title">📚Livros:</span>
    <q-separator/>
    <div class="section-card-books">
      <BookCardSkeleton v-for="num in 6" v-bind:key="num" />
    </div>
  </div>

  <div class="section-card">
    <span class="section-card-title">🧑‍🏫Autores:</span>
    <q-separator/>
    <div class="section-card-books">
      <AuthorCard v-for="author in authors" v-bind:key="author" :author="author"/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BookCard from 'src/components/BookCard.vue';
import AuthorCard from 'src/components/AuthorCard.vue';
import BookCardSkeleton from 'src/components/BookCardSkeleton.vue';
import axios from 'axios';

export default defineComponent({
  name: 'IndexPage',

  data() {
    return {
      books: [],
      authors: []
    }
  },

  components: { BookCard, AuthorCard, BookCardSkeleton },

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

.section-card-books {
  display: flex;
  flex-wrap: wrap;
}
</style>
