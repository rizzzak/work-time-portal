<template>
  <div class="add-project">
    <v-text-field
        color="purple darken-2"
        label="Имя проекта"
        id="inputName"
        ></v-text-field>
      <v-text-field
          color="purple darken-2"
          label="Код проекта"
          id="inputCode"></v-text-field>
    <v-checkbox
        color="red darken-3"
        id="inputCheckbox"
        label="Активный проект?"
        ></v-checkbox>
    <v-btn color="primary" class="mb-5" @click="submitNewProject">Добавить проект</v-btn>
  </div>
</template>

<script>
export default {
  name: "project-add",
  data(){
    return {
      newProject : {
        name: '',
        code: 0,
        isActive: false
      },
      type: "project"
    }
  },
  methods: {
    submitNewProject() {
      let val = document.getElementById('inputName').value;
      this.newProject.name = val;
      val = document.getElementById('inputCode').value;
      this.newProject.code = Number(val);
      val = document.getElementById('inputCheckbox').checked;
      this.newProject.isActive = val;
      console.log('Adding in projects: '+ this.newProject.name + ' ' + this.newProject.code + ' ' + this.newProject.isActive)
      this.$emit('submitNewProject', this)

    }
  }
}
</script>

<style scoped>

</style>