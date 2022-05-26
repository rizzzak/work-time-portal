<template>
  <v-app id="inspire">
    <v-card class="overflow-hidden">
      <v-app-bar
          absolute
          color="#6A76AB"
          dark
          shrink-on-scroll
          prominent
          src="https://picsum.photos/1920/1080?random"
          fade-img-on-scroll
          scroll-target="#scrolling-techniques-3"
      >
        <template v-slot:img="{ props }">
          <v-img
              v-bind="props"
              gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
          ></v-img>
        </template>
        <v-app-bar-title>Портал учёта рабочего времени</v-app-bar-title>
        <v-spacer></v-spacer>
        <template v-slot:extension>
          <v-tabs align-with-title>
            <v-tab @click="mode=0">Проекты</v-tab>
            <v-tab @click="mode=1">Задачи</v-tab>
            <v-tab @click="mode=2">Проводки</v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
      <v-sheet
          id="scrolling-techniques-3"
          class="overflow-y-auto"
      >
        <v-container style="height: 1000px;">
          <v-card class="tab-content">
            <project-manager fluid v-if="mode==0"></project-manager>
          </v-card>
          <v-card class="tab-content">
            <task-manager v-if="mode==1"></task-manager>
          </v-card>
          <v-card class="tab-content">
            <provodki-manager v-if="mode==2"></provodki-manager>
          </v-card>
        </v-container>
      </v-sheet>
    </v-card>
  </v-app>
</template>

<script>

import ProjectManager from "@/components/project-manager";
import TaskManager from "@/components/task-manager";
import ProvodkiManager from "@/components/provodki-manager";
export default {
  name: "vuetify-navbar",
  components: {ProvodkiManager, TaskManager, ProjectManager},
  data(){
    return{
      mode: 0
    }
  }
}
</script>

<style scoped>
.tab-content{
  top: 240px;
  left:0px;
}
</style>