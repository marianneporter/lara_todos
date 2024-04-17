import { defineStore } from 'pinia';

export const useTodoListStore = defineStore('taskStore', {
    state: () => ({
        todoLists: [],
        listSelected: { id: 0, name: 'All' }       
    }),

    getters: { 
        getListData() {     
            return this.todoLists.map(tdl => ({
                id: tdl.id,
                name: tdl.name
            }));
        },

        getListById: (state) => (id) => {
            return state.todoLists.find(tdl => tdl.id === id);
        },

        getListDataOptions() {          
            return [{ id: 0, name: 'All'}, ...this.getListData];
        },   

        getTodosForList() {  
            let currentToDoList = this.todoLists.find(t => t.id === this.listSelected.id);        
            return currentToDoList ? currentToDoList.todos : [];
        },  

        getTodosAllLists() {              
            let allTodos = [];
            this.todoLists.forEach(list => {
                allTodos.push(...list.todos.map(todo => ({
                    ...todo,  
                    listName: list.name  
                })));
            });
            return allTodos;
        }              
    },

    actions: {
        setTodoLists(todoLists) {
            this.todoLists = todoLists;
        },

        setListSelected(newList) {            
            this.listSelected = newList;
        },

        setListSelectedById(id) {         
            let newListSelected = this.getListById(id);
            this.setListSelected(newListSelected);      
        },

        addList(todoList) {         
            this.todoLists.unshift(todoList);
        }, 

        updateList(updatedList) {
            let indexToReplace = this.todoLists.findIndex(tdl => tdl.id === updatedList.id);
            if (indexToReplace !== -1) {
                this.todoLists[indexToReplace] = {
                    ...this.todoLists[indexToReplace],
                    ...updatedList
                };
            } 
        }, 
        
        deleteList(id) {
            this.todoLists = this.todoLists.filter(tdl => tdl.id !== id);
        },

        addTodo(todo) {                    
            let listIndexForAdd = this.todoLists.findIndex(( tdl => tdl.id === todo.todo_list_id) )
            this.todoLists[listIndexForAdd].todos.unshift(todo)
        },

        updateTodo(updatedTodo) {
            
            let listIndexToReplace
                 = this.todoLists.findIndex(tdl => tdl.id === updatedTodo.todo_list_id);
            if (listIndexToReplace === -1)
                 return;

            let todoIndexToReplace
                 = this.todoLists[listIndexToReplace].todos.findIndex(td => td.id === updatedTodo.id);
        
            if (todoIndexToReplace !== -1) {
                this.todoLists[listIndexToReplace].todos[todoIndexToReplace] = {
                    ...this.todoLists[listIndexToReplace].todos[todoIndexToReplace],
                    ...updatedTodo
            };
            } 
        },
                
        deleteTodo(id) {
   
            let listIndexForDelete = this.todoLists.findIndex((tdl) =>  tdl.id === this.listSelected.id)          

            this.todoLists[listIndexForDelete].todos
                = this.todoLists[listIndexForDelete].todos.filter(tdl => tdl.id !== id);
        },
    }
});
