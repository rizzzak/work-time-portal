<template>
  <tr class="project_table_row">
    <td v-if="!editMode">{{project_data.name}}</td>
    <td v-else>
      <input id="projectName"
             type="text"
             class="inner_el"
             :value="project_data.name">
    </td>
    <td v-if="!editMode">{{project_data.code}}</td>
    <td v-else>
      <input id="projectCode"
             type="number"
             class="inner_el"
             :value="project_data.code">
    </td>
    <td>
      <input type="checkbox"
             id="projectIsActive"
             class="inner_el"
             :checked="project_data.isActive"
             :disabled="!this.editMode">
    </td>

    <td v-if="!editMode">
        <v-btn color="primary" class="ml-3" v-on:click="switchEditMode"><BIconPencil /> Редактировать проект </v-btn>
    </td>
    <td v-else>
      <v-btn color="primary" class="ml-3" v-on:click="editProject"><BIconPencil /> Сохранить изменения </v-btn>
    </td>
    <td>
      <v-btn color="primary" class="ml-3" v-on:click="removeProject">Удалить проект</v-btn>
    </td>
  </tr>
</template>

<script>
import {BIconPencil} from 'bootstrap-vue'
export default {
  name: "project-table-row",
  props: {
    project_data: {
      type: Object,
      default() {return{}}
    },
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
    removeProject() {
      this.$emit('removeProject')
    },
    switchEditMode(){
      this.editMode = !this.editMode
    },
    editProject(){
      let newProject = {type:Object, default() {
          return {};
        }}
      let val = document.getElementById('projectName').value;
      newProject.name = val;
      val = document.getElementById("projectCode").value;
      newProject.code = parseInt(val);
      val = document.getElementById('projectIsActive').checked;
      newProject.isActive = val;
      let payload = {
        index: this.index,
        project: newProject,
        type: "project"
      }
      this.$emit('editProject', payload);
      this.switchEditMode();
    }
  },
  mounted() {
  }

}
</script>

<style scoped>
.project_table_row {
  box-shadow: 0 0 8px 0 #e0e0e0;
}
</style>