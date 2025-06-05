<template>
  <div class="cards-container" v-if="!loading">
    <q-card class="q-pa-lg meuCard" v-for="cliente in clientes" v-bind:key="cliente">
      <q-card-title style="font-size: large;">{{ cliente.nome }} </q-card-title>
      <q-separator size="3px" style="background-color: black;"/>
      <q-card-section>
        Email: {{ cliente.email }}
        <br> Celular: {{ cliente.celular }}
        <br> ID: {{ cliente.id }}
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
    name: "ClientesCard",
    props: {
    clientes: {
      type: Array,
    },
    loading: {
      type: Boolean
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
