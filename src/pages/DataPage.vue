<template>
  <DataCard :id="$route.params.id"/>
</template>

<script>
import DataCard from 'src/components/DataCard.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: { DataCard },
});
</script>
