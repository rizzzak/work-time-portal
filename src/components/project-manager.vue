<template>
  <div id="projects" class="manager_el" :key="updateCntr">
    <!-- ПРОЕКТЫ --->
    <v-btn class="ml-3" color="primary" v-on:click="switchAddMode"
            v-if="this.addProjectMode">Отмена</v-btn>
    <v-btn class="ml-3" color="primary" v-on:click="switchAddMode"
            v-else>Добавить проект</v-btn>
    <project-add v-if="this.addProjectMode"
                 v-on:submitNewProject="submitNewProject"/>
    <v-btn class="ml-3" color="primary" v-on:click="downloadProjects">Импорт проектов</v-btn>
    <table class="table" v-if="PROJECTS.length!=0">
      <tr>
        <th>Название</th>
        <th>Код</th>
        <th>Активный?</th>
        <th>&nbsp;</th>
        <th>&nbsp;</th>
      </tr>
      <project-table-row v-for="(project, index) in PROJECTS"
                         :key="project.code"
                         :project_data="project"
                         :index="index"
                         v-on:removeProject="removeProject(index)"
                         v-on:editProject="editProject"/>
    </table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import ProjectTableRow from "@/components/project-table-row";
import ProjectAdd from "@/components/project-add";
export default {
  name: "project-manager",
  data() {
    return {addProjectMode: false, updateCntr: 0}
  },
  components: {ProjectAdd, ProjectTableRow},
  methods: {
    ...mapActions(['GET_PROJECTS_FROM_API', 'DELETE_FROM_LIST', 'SUBMIT_NEW', 'EDIT_DATA']),
    removeProject(index) {
      let payload = {
        index: index,
        type: "project"
      }
      this.DELETE_FROM_LIST(payload)
    },
    downloadProjects(){
      this.GET_PROJECTS_FROM_API()
    },
    switchAddMode(){
      this.addProjectMode = !this.addProjectMode;
    },
    submitNewProject(payload){
      this.SUBMIT_NEW(payload);
      this.switchAddMode();
    },
    editProject(payload){
      this.EDIT_DATA(payload);
      this.updateCntr++;
    }
  },
  computed: {
    ...mapGetters(['PROJECTS'])
  }
}
</script>

<style scoped>

</style>