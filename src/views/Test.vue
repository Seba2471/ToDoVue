<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
    </v-app-bar>
      <ToDoPanel/>
  </v-app>
</template>
<script>

import ToDoPanel from "@/components/todo-panel";

export default {
  data() {
    return{
    }
  },
  components: {
    ToDoPanel,
  }
}
</script>
