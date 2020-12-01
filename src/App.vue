<template>
  <v-app class="dark">
    <Nav />
  <v-main class="mx-10 mt-10">
    <router-view/>
  </v-main>
  </v-app>
</template>

<script>
import Nav from '@/components/Nav.vue'

export default {
  name: 'App',


  data: () => ({
    //
  }),
  components: {
    Nav
  }
};
</script>
