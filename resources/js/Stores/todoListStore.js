import { defineStore } from 'pinia'

export const useTodoListStore = defineStore('taskStore', {
    state: () => ({
        todoLists: [],
        listSelected: { id: 0, name: 'All' }       
    }),
    getters: {
        // getTodoListNames() {                            
        //     return this.todoLists.map(tdl => tdl.name)
        // },

        // getTodoListOptions() {
        //     return [ 'All', ...this.getTodoListNames ] 
        // },   

        getListData() {     
            let listData = this.todoLists.map((tdl) => {
                let list = { id: tdl.id, name: tdl.name }
                return list
            })
            
            return listData
        },

        getListDataOptions() {          
            return [ { id: 0, name: 'All'}, ...this.getListData ] 
        },   


        getTodosForList() {            
            let currentToDoList
             = this.todoLists.find(t => t.id === this.listSelected.id)        
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
        updateList() {
            
        }     
    } 
})