<template>
  <div class="add-provodki">
    <input id="provodkiDate"
           type="date">
    <input id="provodkiHours"
           type="number">
    <input id="provodkiDescription"
           type="text">
    <select id="provodkiTask" size="6">
      <option disabled>Выберите задачу</option>
      <option v-for="task in TASKS"
              :key="task.name"
              :value="task.name"
              :disabled="!task.isActive">{{ task.name }}</option>
    </select>
    <v-btn color="primary" class="mb-5" v-on:click="submitNew">Добавить задачу</v-btn>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "provodki-add",
  data(){
    return {
      newProvodka : {
        date: '',
        hours: 0,
        description: '',
        task: ''
      },
      type: "provodka"
    }
  },
  methods: {
    submitNew(){
      let val = document.getElementById('provodkiDate').value;
      this.newProvodka.date = val;
      val = document.getElementById("provodkiHours").value;
      this.newProvodka.hours = parseInt(val);
      val = document.getElementById('provodkiDescription').value;
      this.newProvodka.description = val;
      val = document.getElementById('provodkiTask').value;
      this.newProvodka.task = val;
      this.$emit('submitNew', this);
    }
  },
  computed: {
    ...mapGetters(['TASKS'])
  }
}
</script>

<style scoped>

</style>