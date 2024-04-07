import { defineStore } from 'pinia'

export const useTodoListStore = defineStore('taskStore', {
    state: () => ({
        todoLists: [],
        listSelected: 'All',        
    }),
    getters: {
        getTodoListNames() {                            
            return this.todoLists.map(tdl => tdl.name)
        },

        getTodoListOptions() {
            return [ 'All', ...this.getTodoListNames ] 
        },

        getTodosForList() {            
            let currentToDoList
             = this.todoLists.find(t => t.name === this.listSelected)        
            return currentToDoList.todos ?  currentToDoList.todos : []
        },  

        getTodosAllLists() {              
            let allTodos = [];   
            this.todoLists.forEach(t => {                
                allTodos.push(...t.todos)
            })       
            return allTodos    
        },              
    },
    actions: {
        setTodoLists(todoLists) {
            this.todoLists = todoLists
        },
        setListSelected(newList) {
            this.listSelected = newList
        },
        addList(todoList) {         
            this.todoLists.unshift(todoList)
        },        
    } 
})