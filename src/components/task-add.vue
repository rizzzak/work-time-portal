<template>
  <div class="add-task">
    <v-text-field
        color="purple darken-2"
        label="Имя проекта"
        id="inputName"
    ></v-text-field>
    <select id="selectProject" size="6">
      <option disabled>Выберите проект</option>
      <option v-for="project in PROJECTS"
              :key="project.code"
              :value="project.code">{{ project.name }}</option>
    </select>
    <v-checkbox
        color="red darken-3"
        id="inputCheckbox"
        label="Активный проект?"
    ></v-checkbox>
    <v-btn color="primary" class="mb-5" @click="submitNewTask">Добавить задачу</v-btn>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "task-add",
  data(){
    return {
      newTask : {
        name: '',
        assignedTo: 0,
        isActive: false
      },
      type: "task"
    }
  },
  methods: {
    submitNewTask(){
      let val = document.getElementById('inputName').value;
      this.newTask.name = val;
      val = document.getElementById("selectProject").value;
      this.newTask.assignedTo = parseInt(val);
      val = document.getElementById('inputCheckbox').checked;
      this.newTask.isActive = val;
      this.$emit('submitNewTask', this);
    }
  },
  computed: {
    ...mapGetters(['PROJECTS'])
  }
}
</script>

<style scoped>

</style>