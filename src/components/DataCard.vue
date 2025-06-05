<template>
  <div class="cards-container" v-if="!loading">
    <q-card class="q-pa-lg meuCard" v-for="dat in data" :key="dat.ID || dat.id || dat">
      <q-card-title style="font-size: large;">
        {{ dat.FIRST_NAME && dat.LAST_NAME ? dat.FIRST_NAME + " " + dat.LAST_NAME : (dat.NAME || 'Registro') }}
      </q-card-title>
      <q-separator size="3px" style="background-color: black;"/>
      <q-card-section>
        <div v-for="(value, key) in dat" :key="key">
          <b>{{ key }}:</b> {{ value }}
        </div>
      </q-card-section>
    </q-card>
  </div>
  <div class="cards-container" v-else>
    <q-card v-for="n in 6" :key="n" class="q-pa-lg meuCard">
        <q-skeleton type="text" width="60%" />
        <q-separator size="3px"/>
        <q-card-section>
          <q-skeleton type="text" width="80%" />
          <q-skeleton type="text" width="50%" />
          <q-skeleton type="text" width="40%" />
        </q-card-section>
      </q-card>
  </div>
</template>

<script>
import axios from 'axios';
import { userStore } from 'src/stores/userStore';
import { Notify } from 'quasar';

  export default {
    name: "DataCard",
    props: {
      id: {
        type: String,
      },
    },

    data() {
      return {
        data: [],
        loading: true
      }
    },

    watch: {
      id: {
        immediate: true,
        handler() {
          this.getData();
        }
      }
    },

    methods: {
      getData() {
        this.loading = true;
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
  }
</script>

<style>
.cards-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.meuCard {
  min-width: 350px;
  min-height: 300px;
  background-color: lightblue;
  margin: 16px;
}
</style>
