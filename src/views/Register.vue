<template>
  <v-main>
    <v-layout row justify-center>
      <v-flex xs12 md4 class="pa-10">
        <h1>
          <div class="text-center"> Zarejestruj się !</div>
        </h1>
      </v-flex>
    </v-layout>

    <v-layout row justify-center>
      <v-flex md4>
        <Registerpanel/>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex md6>
        <v-card outlined class="ma-16 pa-5" elevation="20" color="grey lighten-3">
          <v-row class="justify-center">
            <h3> Masz konto ?  <router-link to='Login' class="text-decoration-none"> Zaloguj się!</router-link> </h3>
          </v-row>
        </v-card>
      </v-flex>
    </v-layout>
  </v-main>
</template>
<script>
import Registerpanel from "@/components/registerPanel";

export default {
  name: 'Register',
  data: () => ({
    alignments: [
      'start',
      'center',
      'end',
    ],
  }),

  components: {
    Registerpanel,
  }
}
</script>
