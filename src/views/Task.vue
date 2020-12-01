<template>
  <div class="task pa-5">
  <ToDoList :name=name />
  </div>
</template>
<script>
import ToDoList from '@/components/todo-list.vue'

export default {
  props:['name'],
  data() {
    return{
    }
  },
  components: {
    ToDoList,
  }
}
</script>
