<template>
  <DataCard :data="data" :loading="loading" :type="id"/>
</template>

<script>
import axios from 'axios';
import DataCard from 'src/components/DataCard.vue';
import { defineComponent } from 'vue';
import { userStore } from 'src/stores/userStore';
import { Notify } from 'quasar';

export default defineComponent({
  name: 'IndexPage',

  components: { DataCard },

  data() {
    return {
      data: [],
      loading: true,
      id: String
    }
  },

  mounted() {
    this.id = this.$route.params.id
    this.getData()
  },

  methods: {
    getData() {
      if (userStore.jwt) {
        axios.get(`http://localhost:3000/${this.id}`, {
          headers: {
            Authorization: `Bearer ${userStore.jwt}`
          }
        })
        .then((response) => {
          this.data = response.data
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
