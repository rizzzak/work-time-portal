<template>
    <tr>
      <td v-if="!editMode">{{task_data.name}}</td>
      <td v-else>
        <input id="taskName"
               type="text"
               class="inner_el"
               :value="task_data.name">
      </td>
      <td v-if="!editMode">
        <router-link :to="{name: 'Projects'}">
          <div><u>{{project_name}}</u></div>
        </router-link>
      </td>
      <td v-else>
        <select id="taskAssignedTo" size="6" :value="task_data.assignedTo">
          <option disabled>Выберите проект</option>
          <option v-for="project in PROJECTS"
                  :key="project.code"
                  :value="project.code">{{ project.name }}</option>
        </select>
      </td>
      <td>
        <input type="checkbox"
               id="taskIsActive"
               class="inner_el"
               :checked="task_data.isActive"
               :disabled="!editMode">
      </td>
      <td v-if="!editMode">
        <v-btn color="primary" class="ml-3" v-on:click="switchEditMode"><BIconPencil /> Редактировать задачу </v-btn>
      </td>
      <td v-else>
        <v-btn color="primary" class="ml-3" v-on:click="editTask"><BIconPencil /> Сохранить изменения </v-btn>
      </td>
      <td v-if="!editMode">
        <v-btn color="primary" class="ml-3" v-on:click="removeTask">Удалить задачу</v-btn>
      </td>
    </tr>
</template>

<script>
import {BIconPencil} from 'bootstrap-vue'
import {mapGetters} from "vuex";
export default {
  name: "task-table-row",
  props: {
    task_data: {
      type: Object,
      default() {return{}}
    },
    project_name: String,
    index: Number
  },
  data(){
    return {
      editMode: false
    }
  },
  components: {
    BIconPencil
  },
  methods: {
    removeTask() {
      this.$emit('removeTask')
    },
    switchEditMode(){
      this.editMode = !this.editMode
    },
    editTask(){
      let newTask = {type:Object, default() {
          return {};
        }}
      let val = document.getElementById('taskName').value;
      newTask.name = val;
      val = document.getElementById("taskAssignedTo").value;
      newTask.assignedTo = parseInt(val);
      val = document.getElementById('taskIsActive').checked;
      newTask.isActive = val;
      let payload = {
        index: this.index,
        task: newTask,
        type: "task"
      }
      this.$emit('editTask', payload);
      this.switchEditMode();
    }
  },
  computed: {
    ...mapGetters(['PROJECTS'])
  }
}
</script>

<style scoped>
</style>