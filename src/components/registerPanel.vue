<template>
  <v-card outlined class="pa-16" elevation="20" color="grey lighten-3">
    <v-layout row>
      <h3> Login:* </h3>
    </v-layout>
    <v-layout row>
      <v-flex md10>
        <v-text-field
            v-model="username"
            :rules="[rules.required]"
        >
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <h3> Email:* </h3>
    </v-layout>
    <v-layout row>
      <v-flex md10>
        <v-text-field
            v-model="email"
            :rules="[rules.required,rules.email]"
        >
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <h3> Haslo:*</h3>
    </v-layout>
    <v-layout row>
      <v-flex md10>
        <v-text-field
            v-model="password"
            :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="showpassword ? 'text' : 'password'"
            @click:append="showpassword = !showpassword"
        >
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <h3> Powtórz hasło:*</h3>
    </v-layout>
    <v-layout row>
      <v-flex md10>
        <v-text-field
            v-model="rpassword"
            :append-icon="showrpassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="showrpassword ? 'text' : 'password'"
            @click:append="showrpassword = !showrpassword"
        >
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <h4 class="red--text" v-show="showExistsUser"> Taki użytkownik już istnieje! </h4>
    </v-layout>
    <v-layout row class="mt-5">

      <v-flex md6>
        <v-btn @click="register()"> Zarejestruj</v-btn>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
export default {
  name: 'Registerpanel',
  data() {
    return {
      showpassword: false,
      showrpassword: false,
      showExistsUser: false,
      username: '',
      password: '',
      email: '',
      rpassword: '',
      rules: {
        required: value => !!value || 'Wymagane.',
        min: v => v.length >= 2 || 'Minimum 2 znaki',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Nieprawidłowy email.'
        },
      },
    }
  },
  methods: {
    //Wywolanie funckji rejestracji z store.js
    register() {
      if (this.valid()) {
        this.$store.dispatch('userRegister', {
          username: this.username,
          email: this.email,
          password: this.password
        })
            .then(() => {
              this.$router.push({name: 'Login'})
            })
            .catch(err => {
              this.showExistsUser = true //Wyswietla taki uzytkownik istnieje
              console.log(err)
            })
      }
    },
    // sprawadza czy haslo i powotrz haslo sa takie same
    valid() {
      return this.password === this.rpassword
    }
  }
}
</script>
