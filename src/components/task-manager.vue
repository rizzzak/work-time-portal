<template>
  <div id="tasks" class="manager_el" :key="updateCntr">

    <!-- ЗАДАЧИ по проектам --->
    <v-btn class="ml-3" color="primary" v-on:click="switchAddMode"
            v-if="this.addTaskMode"
    >Отмена</v-btn>
    <v-btn class="ml-3" color="primary" v-on:click="switchAddMode"
            v-else>Добавить задачу</v-btn>
    <task-add v-if="this.addTaskMode"
              v-on:submitNewTask="submitNewTask"/>
    <v-btn class="ml-3" color="primary"  v-on:click="downloadTasks">Импорт задач</v-btn>
    <table class="table" v-if="TASKS.length!=0">
      <tr>
        <th>Название</th>
        <th>Проект</th>
        <th>Активный?</th>
        <th>&nbsp;</th>
        <th>&nbsp;</th>
      </tr>
      <task-table-row v-for="(task, index) in TASKS"
                      :key="index"
                      :task_data="task"
                      :project_name="findProjectWithCode(task.assignedTo)"
                      :index="index"
                      v-on:removeTask="removeTask(index)"
                      v-on:editTask="editTask"/>
    </table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import TaskTableRow from "@/components/task-table-row";
import TaskAdd from "@/components/task-add";
export default {
  name: "task-manager",
  data() {
    return {addTaskMode: false, updateCntr: 0}
  },
  components: {TaskAdd, TaskTableRow},
  methods: {
    ...mapActions(['GET_TASKS_FROM_API', 'DELETE_FROM_LIST', 'SUBMIT_NEW', 'EDIT_DATA']),
    removeTask(index) {
      let payload = {
        index: index,
        type: "task"
      }
      this.DELETE_FROM_LIST(payload)
    },
    downloadTasks(){
      this.GET_TASKS_FROM_API()
    },
    switchAddMode(){
      this.addTaskMode = !this.addTaskMode;
    },
    submitNewTask(payload){
      this.SUBMIT_NEW(payload);
      this.switchAddMode();
    },
    findProjectWithCode(projectCode){
      let i = 0;
      while(i < this.PROJECTS.length)
      {
        if(this.PROJECTS[i].code === projectCode)
          return this.PROJECTS[i].name;
        i++;
      }
    },
    editTask(payload){
      this.EDIT_DATA(payload);
      this.updateCntr++;
    }
  },
  computed: {
    ...mapGetters(['PROJECTS', 'TASKS'])
  }
}
</script>

<style scoped>

</style>