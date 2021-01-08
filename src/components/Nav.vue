<template>
  <div>
    <v-app-bar
        color="dark"
        dense
        dark
    >
      <v-toolbar-title>Zaplanuj swój dzień!</v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-show="checkLogin()">
        <v-card color="grey lighten-3" class="pt-1 pb-1 pl-3 pr-3">
      <router-link class="text-decoration-none black--text" to="Logout" > Wyloguj </router-link>
        </v-card>
      </div>

    </v-app-bar>
  </div>
</template>
<script>

export default {
  name: 'Nav',
  data: () => ({
    //
  }),
  methods: {
    checkLogin(){
      if(this.$route.name == "Login" || this.$route.name == "Register"){
        return false
      }else{
        return true
      }
    }
  }
};
</script>
