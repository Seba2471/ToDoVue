<template>
  <v-main>
    <v-flex md6>
      <v-layout row>
        <router-link to="/" class="text-decoration-none">
        <v-icon>
          mdi-reply
        </v-icon>
        </router-link>
        <h2 class="subheading grey--text">{{name}}</h2>
      </v-layout>
      <v-layout row>
        <v-list>
          <v-list-item
          v-for="(item,index) in items"
          :key="index">
          <v-list-item-action>
            <v-checkbox v-model="item.done"></v-checkbox>
          </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
              :class="{'text-decoration-line-through':item.done}">
                {{item.name}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-layout>
      <v-flex md5><v-text-field v-model.trim="item"></v-text-field></v-flex>
      <v-layout row>
        <v-btn @click="addItem()"> DODAJ </v-btn>
        <v-btn @click="deleteItem(index)"> USUN </v-btn>
      </v-layout>
    </v-flex>
  </v-main>
</template>
<script>
export default {
  props: ['name'],
  data() {
    return{
      done: false,
      item: "",
      items: []
    };
    },
  async created(){
    var response = await fetch('http://localhost:8000/viewset/task/');
    this.items = await response.json();
  },
  methods: {
    addItem(){
      var test=false;
      for(var i in this.items){
        if(this.items[i].name==this.item){
          alert("Takie zadanie już istnieje!");
          test=true;
        }
      }
      if(test==false) {
        this.items.push({name: this.item, done: false});
        this.item = "";
      }
    },
    deleteItem(){
      console.log(this.items.find(this.items.done == true));
    }
  }
};

</script>

