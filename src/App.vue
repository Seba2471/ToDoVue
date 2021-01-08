<template>
  <v-app class="dark">
    <Nav/>
    <v-main class="mx-10 mt-10" src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
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
<style>
#app {
  background: url("assets/bg.jpg") no-repeat center center fixed !important;
  background-size: cover;
}
</style >
