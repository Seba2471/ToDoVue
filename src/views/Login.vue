<template>
  <v-main>
    <v-layout row justify-center>
      <v-flex md4>
        <Loginpanel/>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex md6>
        <v-card outlined class="ma-16 pa-5" elevation="20" color="grey lighten-3">
          <v-row class="justify-center">
          <h3> Nie masz konta ?  <router-link to='Register' class="text-decoration-none"> Zarejestruj się!</router-link> </h3>
          </v-row>
        </v-card>
      </v-flex>
    </v-layout>
  </v-main>
</template>
<script>
import Loginpanel from "@/components/Loginpanel";

export default {
  name: 'Login',
  data: () => ({
    alignments: [
      'start',
      'center',
      'end',
    ],
  }),

  components: {
    Loginpanel,
  }
}
</script>
