import { defineStore } from 'pinia'

export const useTodoListStore = defineStore('taskStore', {
    state: () => ({
        todoLists: [],
        listSelected: 'All'
    }),
    getters: {
        getTodoListNames() {                            
            return this.todoLists.map(tdl => tdl.name)
        },

        getTodosForList(todoListId) {   
            let currentToDoList
             = this.todoLists.find(t => t.id === todoListId)
            return currentToDoList.todos 
        },  

        getTodosAllLists() {         
            let allTodos = [];
            this.todoLists.forEach(t => {
                allTodos.push(...t.todos)
            })    
        //    console.log(allTodos)      
            return allTodos
        },              
    },
    actions: {
        setTodoLists(todoLists) {
            this.todoLists = todoLists
        }
    } 
})