import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        projects: [],
        tasks: [],
        provodki: []
    },
    mutations: {
        SET_PROJECTS_TO_STATE: (state, projects) => {
            state.projects = projects;
        },
        REMOVE_PROJECT_FROM_LIST: (state, index) => {
            state.projects.splice(index, 1);
        },
        ADD_NEW_PROJECT: (state, newProject) => {
            state.projects.push(newProject)
        },
        EDIT_PROJECT: (state, payload) => {
            state.projects[payload.index] = payload.project
        },
        SET_TASKS_TO_STATE: (state, tasks) => {
            state.tasks = tasks;
        },
        ADD_NEW_TASK: (state, newTask) => {
            state.tasks.push(newTask)
        },
        EDIT_TASK: (state, payload) => {
            state.tasks[payload.index] = payload.task
        },
        REMOVE_TASK_FROM_LIST: (state, index) => {
            state.tasks.splice(index, 1);
        },
        //PROVODKI
        SET_PROVODKI_TO_STATE: (state, provodki) => {
            state.provodki = provodki;
        },
        REMOVE_PROVODKI_FROM_LIST: (state, index) => {
            state.provodki.splice(index, 1);
        },
        ADD_NEW_PROVODKI: (state, newProvodki) => {
            state.provodki.push(newProvodki)
        },
        EDIT_PROVODKI:(state, payload) => {
            state.provodki[payload.index] = payload.provodki
        },
    },
    actions: {
        GET_PROJECTS_FROM_API({commit}){
            console.log('Projects downloaded from json to Vuex');
            return axios("http://localhost:3000/projects", {
                method: "GET"
            })
                .then((projects) =>{
                    commit('SET_PROJECTS_TO_STATE', projects.data);
                    return projects;
                })
                .catch((error) => {console.log(error)})
        },
        GET_TASKS_FROM_API({commit}){
            console.log('Tasks downloaded from json to Vuex');
            return axios("http://localhost:3000/tasks", {
                method: "GET"
            })
                .then((tasks) =>{
                    commit('SET_TASKS_TO_STATE', tasks.data);
                    return tasks;
                })
                .catch((error) => {console.log(error)})
        },
        GET_PROVODKI_FROM_API({commit}){
            console.log('Provodki downloaded from json to Vuex');
            return axios("http://localhost:3000/provodki", {
                method: "GET"
            })
                .then((provodki) =>{
                    commit('SET_PROVODKI_TO_STATE', provodki.data);
                    return provodki;
                })
                .catch((error) => {console.log(error)})
        },
        DELETE_FROM_LIST({commit},payload) {
            if(payload.type=="project")
            {
                console.log('Project removed');
                commit('REMOVE_PROJECT_FROM_LIST', payload.index)
            }
            else if (payload.type=="task")
            {
                console.log('Task removed');
                commit('REMOVE_TASK_FROM_LIST', payload.index)
            }
            else if (payload.type=="provodka")
            {
                console.log('Provodka removed');
                commit('REMOVE_PROVODKI_FROM_LIST', payload.index)
            }

        },
        SUBMIT_NEW({commit}, payload){
            if(payload.type=="project")
            {
                console.log('Project submitted');
                commit('ADD_NEW_PROJECT', payload.newProject)
            }
            else if (payload.type=="task")
            {
                console.log('Task submitted');
                commit('ADD_NEW_TASK', payload.newTask)
            }
            else if (payload.type=="provodka")
            {
                console.log('Provodka submitted');
                commit('ADD_NEW_PROVODKI', payload.newProvodka)
            }
        },
        EDIT_DATA({commit}, payload){
            if(payload.type=="project")
            {
                console.log('Project saved');
                commit('EDIT_PROJECT', payload)
            }
            else if (payload.type=="task")
            {
                console.log('Task saved');
                commit('EDIT_TASK', payload)
            }
            else if (payload.type=="provodka")
            {
                console.log('Provodka saved');
                commit('EDIT_PROVODKI', payload)
            }

        },
    },
    getters: {
        PROJECTS(state){
            return state.projects;
        },
        TASKS(state){
            return state.tasks;
        },
        PROVODKI(state){
            return state.provodki;
        }
    }
});

export default store;