<template>
  <div id="provodki" class="manager_el" :key="updateCntr">
    <div class="provodki_selection">
      <v-btn class="ml-3" color="primary" @click="printSelectedDate(0)">All time</v-btn>
      <v-btn class="ml-3" color="primary" @click="mode=1" v-if="mode!=1">Selected Day</v-btn>
      <div v-else>
        <input id="provodkiSelectedDate" type="date" :value="selectedDate">
        <v-btn class="ml-3" color="primary" @click="printSelectedDate(1)">Select</v-btn>
      </div>
      <v-btn class="ml-3" color="primary" @click="printSelectedDate(2)">This month</v-btn>
    </div>

    <!-- Проводки по задачам --->
    <v-btn class="ml-3" color="primary" v-on:click="switchAddMode"
            v-if="this.addProvodkiMode">Отмена</v-btn>
    <v-btn class="ml-3" color="primary" v-on:click="switchAddMode"
            v-else>Добавить проводку</v-btn>
    <provodki-add v-if="this.addProvodkiMode"
              v-on:submitNew="submitNewProvodki"/>
    <v-btn class="ml-3" color="primary" v-on:click="downloadProvodki">Импорт проводок</v-btn>
    <table class="table" v-if="provodkiSelection.length!=0">
      <tr>
        <th>Дата</th>
        <th>Часы</th>
        <th>Описание</th>
        <th>Задача</th>
        <th>&nbsp;</th>
        <th>&nbsp;</th>
      </tr>
        <provodki-table-row
            v-for="(provodki, index) in provodkiSelection"
            :key="index"
            :provodki_data="provodki"
            :index="index"
            :mode="mode"
            :selectedDate="selectedDate"
            :task_name="findProvodkiWithCode(provodki.task)"
            v-on:removeProvodki="removeProvodki(index)"
            v-on:editProvodki="editProvodki"/>
    </table>
    <div v-if="color=='red'" class="sticker-red"></div>
    <div v-else-if="color=='yellow'" class="sticker-yellow"></div>
    <div v-if="color=='green'" class="sticker-green"></div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import ProvodkiTableRow from "@/components/provodki-table-row";
import ProvodkiAdd from "@/components/provodki-add";
export default {
  name: "provodki-manager",
  data() {
    return {
      addProvodkiMode: false,
      updateCntr: 0,
      mode: 0,
      selectedDate: "2022-05-11",
      provodkiSelection: [],
      color: "white"
    }
  },
  components: {ProvodkiAdd, ProvodkiTableRow},
  methods: {
    ...mapActions(['GET_PROVODKI_FROM_API', 'DELETE_FROM_LIST', 'SUBMIT_NEW', 'EDIT_DATA']),
    removeProvodki(index) {
      let payload = {
        index: index,
        type: "provodka"
      }
      this.DELETE_FROM_LIST(payload)
      this.prepareSelection()
    },
    downloadProvodki(){
      this.GET_PROVODKI_FROM_API().then(this.prepareSelection);
    },
    switchAddMode(){
      this.addProvodkiMode = !this.addProvodkiMode;
    },
    submitNewProvodki(payload){
      this.SUBMIT_NEW(payload);
      this.switchAddMode();
      this.prepareSelection();
    },
    findProvodkiWithCode(provodkiCode){
      let i = 0;
      while(i < this.PROVODKI.length)
      {
        if(this.PROVODKI[i].code === provodkiCode)
          return this.PROVODKI[i].name;
        i++;
      }
    },
    editProvodki(payload){
      this.EDIT_DATA(payload);
    },
    printSelectedDate(mode) {
      this.mode = mode;
      if(mode == 1)
      {
        let val = document.getElementById('provodkiSelectedDate').value;
        this.selectedDate = val;
      }
      this.prepareSelection()
    },
    prepareSelection() {
      //mode 0 -> all
      //mode 1 -> selected date
      //mode 2 -> this month
      this.provodkiSelection.length = 0;
      if (this.mode == 0) {
        for (let i = 0; i < this.PROVODKI.length; i++) {
          this.provodkiSelection.push(this.PROVODKI.at(i));
        }
      } else if (this.mode == 1) {
        for (let i = 0; i < this.PROVODKI.length; i++) {
          if (this.selectedDate == this.PROVODKI.at(i).date) {
            this.provodkiSelection.push(this.PROVODKI.at(i));
          }
        }
      } else if (this.mode == 2) {
        for (let i = 0; i < this.PROVODKI.length; i++) {
          if (this.PROVODKI.at(i).date.slice(5, 7) == this.selectedDate.slice(5, 7)) {
            this.provodkiSelection.push(this.PROVODKI.at(i));
          }
        }
      }
      this.defineColor();
      return true;
    },
    defineColor(){
      if(this.mode != 1)
      {
        this.color = "white";
        return;
      }
      let edge = 8;
      let hourCntr = 0;
      for (let i = 0; i < this.provodkiSelection.length; i++) {
        hourCntr += parseInt(this.provodkiSelection.at(i).hours);
      }
      if (hourCntr < edge)
        this.color = "green";
      else if (hourCntr == edge)
        this.color = "yellow";
      else
        this.color = "red";
    }
  },
  computed: {
    ...mapGetters(['PROJECTS', 'TASKS', 'PROVODKI'])
  }
}
</script>

<style scoped>
.link_to_other_manager{
  position: absolute;
  top:10px;
  right:10px;
  padding: 16px;
  border: solid 1px #aeaeae;
}
.provodki_selection{
  position: absolute;
  top:10px;
  right:167px;
  padding: 16px;
}
.sticker-green{
  position: absolute;
  width: 100px;
  height: 100px;
  top:5px;
  right:10px;
  padding: 16px;
  border: solid 1px #aeaeae;
  background: green;
}
.sticker-red{
  position: absolute;
  width: 100px;
  height: 100px;
  top:5px;
  right:10px;
  padding: 16px;
  border: solid 1px #aeaeae;
  background: red;
}
.sticker-yellow{
  position: absolute;
  width: 100px;
  height: 100px;
  top:5px;
  right:10px;
  padding: 16px;
  border: solid 1px #aeaeae;
  background: yellow;
}
</style>