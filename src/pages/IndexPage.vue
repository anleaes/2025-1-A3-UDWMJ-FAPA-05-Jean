<template>
  <div class="books-card">
    <span class="books-card-title">📚Livros:</span>
    <q-separator/>
    <div class="books">
      <BookCard v-for="book in books" v-bind:key="book" :book="book"/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BookCard from 'src/components/BookCard.vue';
import axios from 'axios';

export default defineComponent({
  name: 'IndexPage',

  data() {
    return {
      books: []
    }
  },

  components: { BookCard },

  mounted() {
    this.getBooks()
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
    }
  }
});
</script>

<style>
.books-card {
  display: flex;
  flex-direction: column;
  margin: 16px;
}

.books-card-title {
  font-size: 32px;
}

.books {
  display: flex;
}
</style>
