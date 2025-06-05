<template>
  <div class="cards-container" v-if="!loading">
    <q-card class="q-pa-lg meuCard" v-for="dat in data" v-bind:key="dat">
      <q-card-title style="font-size: large;">{{ dat.nome }} </q-card-title>
      <q-separator size="3px" style="background-color: black;"/>
      <q-card-section>
        <span v-if="type == 'clientes'">
          Email: {{ dat.email }}
          <br> Celular: {{ dat.celular }}
          <br> ID: {{ dat.id }}
        </span>
        <span v-if="type == 'categorias'">
          Descricao: {{ dat.descricao }}
        </span>
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
  export default {
    name: "DataCard",
    props: {
    data: {
      type: Array,
    },
    loading: {
      type: Boolean
    },
    type: {
      type: String
    }
    },

    mounted() {
      console.log(this.data);
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
