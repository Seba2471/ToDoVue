<template>
  <div id="panel">
    <v-flex md6 >
    <v-layout row>
      <v-flex md12>
        <h2 class="subheading grey--text"> Wybierz liste zadań która chcesz zobaczyć:</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex>
        <v-list>
                <v-list-item
                    v-for="(task,index) in tasksList"
                    :key="index" >
                  <router-link :to="{path: '/task/'+task.name, props: true}" class="text-decoration-none">
                  <v-list-item-content class="subheading dark--text">
                    {{task.name}}
                  </v-list-item-content>
                  </router-link>
                </v-list-item>
              </v-list>
      </v-flex>
    </v-layout>
    <v-layout>
        <v-flex md5>
          <v-text-field v-model.trim="newTask"></v-text-field>
        </v-flex>
    </v-layout>
    <v-layout>
      <v-flex md3>
        <v-btn @click="addTask()"> Dodaj </v-btn>
      </v-flex>
    </v-layout>
    </v-flex>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newTask: "",
      tasksList: [
        {
          name: "Zadanie 1",
          tasks: [{
            name: "abc",
            done: false

          }]
        },
        {
          name: "Zadanie 2",
          tasks: [
                {
                  taskname: "abc",
                  done: false
                },
                {
                  tasksname: "abcde",
                  done: false
                }
            ]
        },
        {
          name: "Zadanie 3",
          tasks: [{
            name: "abc",
            done: false
          }]
        },
      ]
    }
  },
  methods: {
    addTask(){
      var test=false;
      for (var i in this.tasksList){
        if(this.newTask==this.tasksList[i].name){
          alert("Takie zadanie już istnieje!")
          test=true;
        }
      }
      if(test==false){
        this.tasksList.push({name: this.newTask});
        this.newTask = "";
      }
    },
    postName(name){
      console.log(name);
    }

  }
};
</script>
