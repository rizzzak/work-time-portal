import Vue from "vue"
import Router from 'vue-router'
import projectManager from "@/components/project-manager";
import taskManager from "@/components/task-manager";
import provodkiManager from "@/components/provodki-manager";

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'Projects',
            component: projectManager
        },
        {
            path: '/tasks',
            name: 'Tasks',
            component: taskManager,
        },
        {
            path: '/provodki',
            name: 'Provodki',
            component: provodkiManager,
        }
    ]
})

export default router