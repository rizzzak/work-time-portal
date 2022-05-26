<template>
  <tr class="project_table_row" v-if="isRowMustBeShown" :key="updateCntr">
    <td v-if="!editMode">{{provodki_data.date}}</td>
    <td v-else>
      <input id="provodkiDate"
             type="date"
             :value="provodki_data.date">
    </td>
    <td v-if="!editMode"> {{provodki_data.hours}}</td>
    <td v-else>
      <input id="provodkiHours"
             type="number"
             :value="provodki_data.hours">
    </td>
    <td v-if="!editMode"> {{provodki_data.description}}</td>
    <td v-else>
      <input id="provodkiDescription"
             type="text"
             :value="provodki_data.description">
    </td>
    <td v-if="!editMode">
      <router-link :to="{name: 'Tasks'}">
        <div><u>{{provodki_data.task}}</u></div>
      </router-link>
    </td>
    <td v-else>
<!--      //найти задачу ассоциированную с проводкой
      //узнать статус задачи-->
      <select
          :disabled="!isTaskActive()"
          id="provodkiTask"
          size="6"
          :value="provodki_data.task">
        <option disabled>Выберите задачу</option>
        <option v-for="task in TASKS"
                :key="task.name"
                :value="task.name">{{ task.name }}</option>
      </select>
    </td>


<!--      <router-link :to="{name: 'project-view'}">
        <div>{{project_name}}</div>
      </router-link>-->


    <td v-if="!editMode">
      <v-btn color="primary" class="ml-3" v-on:click="switchEditMode"><BIconPencil /> Редактировать проводку </v-btn>
    </td>
    <td v-else>
      <v-btn color="primary" class="ml-3" v-on:click="editProvodki"><BIconPencil /> Сохранить изменения </v-btn>
    </td>
    <td v-if="!editMode">
      <v-btn color="primary" class="ml-3" v-on:click="removeProvodki">Удалить проводку</v-btn>
    </td>
    <td v-else>
      <a v-if="error" style="color: brown"> Число часов проводки не может быть > 24 </a>
      <a v-if="errorGlobal" style="color: brown"> Введены > 24 часов проводок за день </a>
    </td>
  </tr>
</template>

<script>
import {BIconPencil} from 'bootstrap-vue'
import {mapGetters} from "vuex";
export default {
  name: "provodki-table-row",
  props: {
    provodki_data: {
      type: Object,
      default() {return{}}
    },
    task_name: String,
    index: Number,
    mode: Number,
    selectedDate: String
  },
  data(){
    return {
      editMode: false,
      error:false,
      errorGlobal:false,
      updateCntr:0
    }
  },
  components: {
    BIconPencil
  },
  methods: {
    removeProvodki() {
      this.$emit('removeProvodki')
    },
    switchEditMode(){
      this.editMode = !this.editMode
    },
    editProvodki(){
      let newProvodki = {type:Object, default() {
          return {};
        }}
      //date hours description task
      let val = document.getElementById('provodkiDate').value;
      newProvodki.date = val;
      val = document.getElementById("provodkiHours").value;
      console.log("Date: " + val + " " + typeof(val));
      //локальная проверка часов
      if(val > 24)
      {
        this.error = true;
        return;
      }
      this.error = false;

      //глобальная проверка часов
      //получить список проводок, выборка по дате, расчёт суммы часов по дате
      let hourCounter = 0;
      for(let i = 0; i < this.PROVODKI.length; i++)
      {
        if(this.index == i)
        {
          hourCounter += parseInt(val);
          continue;
        }
        if(this.PROVODKI.at(i).date == newProvodki.date)
        {
          hourCounter = hourCounter + this.PROVODKI.at(i).hours;
        }
      }
      console.log(hourCounter);
      if(hourCounter > 24)
      {
        this.errorGlobal = true;
        return;
      }
      this.errorGlobal = false;

      newProvodki.hours = parseInt(val);
      val = document.getElementById('provodkiDescription').value;
      newProvodki.description = val;
      val = document.getElementById('provodkiTask').value;
      newProvodki.task = val;

      let payload = {
        index: this.index,
        provodki: newProvodki,
        type: "provodka"
      }
      this.$emit('editProvodki', payload);
      this.switchEditMode();
    },
    isTaskActive(){
      for(let i = 0; i < this.TASKS.length; i++)
      {
        console.log(this.TASKS.at(i).name);
        if(this.TASKS.at(i).name == this.provodki_data.task)
        {
          console.log(this.TASKS.at(i).isActive);
          if(this.TASKS.at(i).isActive == true)
            return true;
          else
            return false;
        }

      }
    },
    isRowMustBeShown(){
      this.updateCntr++;
      if(this.mode == 0)
      {
        return true;
      }
      if(this.mode == 1)
      {
        //выборка за день
        console.log(this.selectedDate);
        console.log(this.PROVODKI.at(this.index).date);
        if(this.PROVODKI.at(this.index).date == this.selectedDate)
          return true;
        return false;
      }
      if(this.mode == 2)
      {
        //выборка за месяц
        console.log(this.selectedDate.slice(5,6));
        console.log(this.PROVODKI.at(this.index).date.slice(5,6));
        if(this.PROVODKI.at(this.index).date.slice(5,6) == this.selectedDate.slice(5,6))
          return true;
        return false;
      }
    }
  },
  computed: {
    ...mapGetters(['TASKS', 'PROVODKI'])
  }
}
</script>

<style scoped>
</style>