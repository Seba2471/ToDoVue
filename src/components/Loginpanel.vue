<template>
  <v-card outlined class="pa-10" elevation="20" color="grey lighten-3">
    <v-flex xs12 md12 class="pb-5">
      <h1>
        <div class="text-center"> Zaloguj się aby korzystać !</div>
      </h1>
    </v-flex>
    <v-layout row>
      <h3> Login: </h3>
    </v-layout>
    <v-layout row>
      <v-flex md10>
        <v-text-field v-model="username"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <h3> Haslo:</h3>
    </v-layout>
    <v-layout row>
      <v-flex md10>
        <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
        >
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <h4 class="red--text" v-show="show2"> Niepoprawny login lub hasło! </h4>
    </v-layout>
    <v-layout row class="mt-5">

      <v-flex md6>
        <v-btn @click="login()"> Zaloguj</v-btn>
      </v-flex>

      <router-link to="/rpass" class="text-decoration-none">
        <h4 class="font-weight-medium"> Zapomniałem hasła</h4>
      </router-link>
    </v-layout>
  </v-card>
</template>
<script>
export default {
  name: 'Loginpanel',
  data() {
    return {
      show1: false,
      show2: false,
      username: '',
      password: '',
      rules: {
        required: value => !!value || 'Wymagane.',
        min: v => v.length >= 2 || 'Minimum 2 znaki',
        emailMatch: () => (`Login lub hasło są niepoprawne`),
      },
    }
  },
  methods: {
    //wywolanie funkcji logowania z store.js
    login() {
      this.$store.dispatch('userLogin', {
        username: this.username,
        password: this.password
      })
          .then(() => {
            this.$router.push({name: 'TaskPanel'})
          })
          .catch( () => {
            this.show2 = true
          })
    }
  }
}
</script>
