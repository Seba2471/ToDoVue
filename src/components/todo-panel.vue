<template>
  <v-flex d-flex>
    <v-layout wrap>
      <v-flex md4 v-for="item in this.tasksList" :key="item.id">

        <v-card class="card-container ma-5" min-height="200px" elevation="10" color="grey lighten-3" outlined>
          <v-layout row class="ml-2">
            <v-icon class="mt-2 align-self-center" color="red" large @click="deleteTask(item.id)"> mdi-close</v-icon>
          </v-layout>
          <v-layout row wrap class="ml-5 mr-5">
            <v-flex>
              <v-card-title> {{ item.name }}</v-card-title>
            </v-flex>
          </v-layout>
          <v-layout row class="ml-5 mr-5">
            <v-card-subtitle> {{ item.description }}</v-card-subtitle>
          </v-layout>
          <v-layout row class="ma-3">
            <v-flex align-self-center class="ml-5">
              <v-row>
                Wykonane:
                <h4 v-if="item.done==item.all" class="green--text ml-2"> {{ item.done }}/{{ item.all }} </h4>
                <h4 v-if="item.done!=item.all" class="red--text ml-2"> {{ item.done }}/{{ item.all }} </h4>
              </v-row>
            </v-flex>
            <v-layout justify-end>
              <router-link
                  :to="{ name: 'Task', params: { list: item.id, name: item.name, description: item.description }}"
                  class="text-decoration-none">
                <h4 class="ma-5 link text-decoration-underline"> Pokaż szczegóły </h4>
              </router-link>
            </v-layout>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex md4 v-if="add">
        <v-card class="card-container ma-5" min-height="200px" elevation="10" color="grey lighten-3" outlined>
          <v-layout row class="ml-10 mt-5">
            <v-flex md2>
              Nazwa:
            </v-flex>
          </v-layout>
          <v-layout row class="ml-10 mr-10">
            <v-flex md6>
              <v-text-field v-model="newTask"/>
            </v-flex>
          </v-layout>
          <v-layout row class="ml-10 mt-5">
            <v-flex md2>
              Opis:
            </v-flex>
          </v-layout>
          <v-layout row class="ml-10 mr-10">
            <v-flex md4>
              <v-text-field v-model="newDescription"/>
            </v-flex>
          </v-layout>
          <v-layout row class="ml-10 mb-5">
            <v-btn @click="()=>{this.add= false}"> Anuluj</v-btn>
            <v-btn @click="addTask()" :disabled="notNull()"> Dodaj</v-btn>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex md4 xs12>
        <v-card class="card-container ma-5" min-height="200px" elevation="10" color="grey lighten-3" outlined>
          <v-row
              align="center"
              justify="space-around"
              class="mt-16"
          >
            <v-btn @click="()=>{this.add= true}" class="mt-5"> Dodaj</v-btn>
          </v-row>
        </v-card>
      </v-flex>
    </v-layout>
  </v-flex>
</template>
<script>

import {getAPI} from "@/axios-api";

export default {
  data() {
    return {
      add: false,
      overlay: false,
      newTask: "",
      newDescription: "",
      tasksList: [],
    }
  },
  created() {
    this.getList()
  },
  methods: {
    config() {
      return {headers: {Authorization: `Bearer ${this.$store.state.accessToken}`}}
    },
    notNull() {
      if (this.newTask != "") {
        return false
      }
      return true
    },
    getList() {
      getAPI.get(`/viewset/tasklist/`, this.config())
          .then(response => {
            this.tasksList = response.data
          })
          .catch(err => {
            console.log(err)
          })
    },
    addTask() {
      var test = false;
      for (var i in this.tasksList) {
        if (this.newTask == this.tasksList[i].name) {
          this.$fire({
            title: "Takie zadanie już istnieje",
            type: "error",
            confirmButtonText: "OK"
          })
          test = true;
        }
      }
      if (test == false) {
        getAPI.post(`/viewset/tasklist/`, {
          name: this.newTask,
          description: this.newDescription
        }, this.config())
            .then((response) => {
              console.log(response)
              this.newDescription = "",
                  this.newTask = ""
              this.add = false,
                  this.getList()
            })
            .catch((response) => {
              console.log(response)
            })
      }
    },
    deleteTask(id) {
      this.$fire({
        title: "Czy chcesz usunąć?",
        type: "question",
        showCancelButton: true,
        confirmButtonText: 'Tak, usuń',
        cancelButtonText: 'Anuluj',
      }).then(r => {
        if (r.value) {
          getAPI.delete(`/viewset/tasklist/` + id, this.config())
              .then((response) => {
                this.getList()
                console.log(response)
              })
              .catch((err) => {
                console.log(err)
              })
          // Wyświetl informacje o usunieciu
          // this.$alert("Usunięto")
        }
      });
    }
  }
};
</script>
<style>

.link {
  color: black
}
</style>
