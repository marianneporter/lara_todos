import { defineStore } from 'pinia'

export const useTodoListStore = defineStore('taskStore', {
    state: () => ({
        todoLists: [],
        listSelected: { id: 0, name: 'All' }       
    }),

    getters: { 

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
        updateList(updatedList) {
 
            let indexToReplace 
                 = this.todoLists.findIndex((tdl) => tdl.id === updatedList.id )

            if (indexToReplace !== -1) {
                this.todoLists[indexToReplace] = {
                    ...this.todoLists[indexToReplace],
                    ...updatedList
                };
            } 
        }     
    } 
})