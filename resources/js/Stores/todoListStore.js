import { defineStore } from 'pinia'

export const useTodoListStore = defineStore('taskStore', {
    state: () => ({
        todoLists: []
    
    }),
    getters: {
 
    },
    actions: {
        setTodoLists(todoLists) {
            this.todoLists = todoLists
        }
    } 
})