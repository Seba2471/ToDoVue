<template>
  <v-main>
    <v-card class="card-container pa-15" min-height="200px" elevation="10" color="grey lighten-3" outlined>
      <v-flex md6>
        <v-layout row>
          <router-link to="/" class="text-decoration-none">
            <v-btn>
              <v-icon>
                mdi-reply
              </v-icon>
              Wróć
            </v-btn>
          </router-link>
        </v-layout>
        <div v-show="this.edit">
          <v-layout row class="mt-5">
            <h2 class="black--text mr-5 align-self-start">{{ newName }}</h2>
          </v-layout>
          <v-layout row>
            <h4 class="subheading grey--text mr-5 align-self-center"> {{ newDescription }}</h4>
            <v-btn class="align-self-center" v-show="this.edit" @click="()=>{ this.edit= false, this.save = true }">
              Edytuj
            </v-btn>
          </v-layout>

        </div>
        <div v-show="this.save">
          <v-layout row>
            <v-flex md10>
              <v-col>
                <v-flex md12>
                  Nazwa
                  <v-text-field v-model.trim="newName" v-show="this.save" clearable solo class="mr-5"/>
                </v-flex>
              </v-col>
              <v-col md4>
                Opis
                <v-text-field v-model.trim="newDescription" v-show="this.save" clearable solo class="mr-5"/>
              </v-col>
              <v-col>
                <v-btn v-show="this.save" @click="saveEdit()"> Zapisz</v-btn>
              </v-col>
            </v-flex>
          </v-layout>
        </div>
        <v-layout row>
          <v-list color="grey lighten-3">
            <v-list-item
                v-for="(task,index) in tasks"
                :key="index"
                class="listitem"
            >
              <v-list-item-action>
                <v-checkbox v-model="task.done" @click="setDone(task.name,task.done,task.id,)"></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title
                    :class="{'text-decoration-line-through':task.done}">
                  {{ task.name }}
                </v-list-item-title>
              </v-list-item-content>
              <v-btn class="ml-10" @click="deleteItem(task.id)"> USUŃ</v-btn>
            </v-list-item>
          </v-list>
        </v-layout>
        <v-flex md5>
          <v-text-field v-model.trim="task"></v-text-field>
        </v-flex>
        <v-layout row>
          <v-flex md5 class="ml-2">
            <v-btn @click="addItem()" :disabled="notNull()"> DODAJ</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-card>
  </v-main>
</template>
<script>
import {getAPI} from "@/axios-api";


export default {
  data() {
    return {
      id: this.$route.params.list,
      edit: true,
      save: false,
      name: this.$route.params.name,
      description: this.$route.params.description,
      newName: this.$route.params.name,
      newDescription: this.$route.params.description,
      task: "",
      tasks: [],
    };
  },
  created() {
    this.getTasks()
  },
  methods: {

    config() {
      return {headers: {Authorization: `Bearer ${this.$store.state.accessToken}`}}
    },
    notNull() {
      if (this.task != "") {
        return false
      }
      return true
    },
    async saveEdit() {
      this.edit = true,
          this.save = false
      await getAPI.put(`/viewset/tasklist/${this.id}/`, {
        name: this.newName,
        description: this.newDescription
      }, this.config())
          .then((response) => {
            console.log(response)
            this.$route.params.name = this.newName,
                this.$route.params.description = this.newDescription
          })
          .catch((err) => {
            console.log(err)
          })
    },
    async getTasks() {
      await getAPI.get(`/viewset/task?list=${this.id}`, this.config())
          .then(response => {
            this.tasks = response.data
          })
          .catch(err => {
            console.log(err)
          })
    },
    async addItem() {
      var test = false;
      for (var i in this.tasks) {
        if (this.tasks[i].name == this.task) {
          this.$alert("Takie zadanie już istnieje!")
          this.task = ""
          test = true;
        }
      }
      if (test == false) {
        await getAPI.post(`/viewset/task/`, {
          name: this.task,
          done: false,
          list: this.id
        }, this.config())
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        this.task = "";
        this.getTasks()
      }
    },
    async deleteItem(id) {
      this.$fire({
        title: "Czy chcesz usunąć?",
        type: "question",
        showCancelButton: true,
        confirmButtonText: 'Tak, usuń',
        cancelButtonText: 'Anuluj',
      }).then(r => {
        if (r.value) {
          getAPI.delete(`/viewset/task/${id}/`, this.config())
          this.getTasks()
        }
      })
    },
    async setDone(name, done, id) {
      await getAPI.put(`/viewset/task/${id}/`, {
        "name": name,
        "done": done,
        "list": this.id,
      }, this.config())
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      console.log(id, done)
    }
  }
};

</script>
<style>
.listitem {
  border-bottom: lightgray 1px solid;
}
</style>
