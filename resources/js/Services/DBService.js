/**************************************************************************/
/* Service to handle Update/Add/Deletion for Lists and Todos Using Axios */
/**************************************************************************/

import axios from 'axios';

export default { 

    async addList(list) {
        try {       
            let response = await axios.post(route('todo-lists.store'), list)           
            return response.data.addedTodoList           
        }
        catch (error) { 
            //  handle and format validation errors         
            let formattedError = this.formatError(error)
            throw formattedError
        }
    },

    async updateList(listId, listData) {
        try {       
            let response
               = await axios.patch(route('todo-lists.update', {id: listId}), listData)
            return response.data.updatedTodoList         
        }
        catch (error) { 
            //  handle and format validation errors  
            let formattedError = this.formatError(error)
            throw formattedError
        }
    },

    async deleteList(listId) {
        try {             
            await axios.delete(route('todo-lists.delete', { todoList: listId }));        
        } catch (error) {
            let formattedError = this.formatError(error)
            throw formattedError          
        }
    },

    async addTodo(todo) { 
        try {       
            let response = await axios.post(route('todos.store'), todo)           
            return response.data.addedTodo           
        }
        catch (error) { 
            //  handle and format validation errors           
            let formattedError = this.formatError(error)
            throw formattedError
        }
    },
  

    async updateTodo(todoId, todo) {
 
        try {  
     
            let response = await axios.patch(route('todos.update', 
                                                   {id: todoId}),
                            {
                            task: todo.task,
                            completed: todo.completed
                            })   
          
            return response.data.updatedTodo           
        }
        catch (error) { 
            //  handle and format validation errors  
     
            let formattedError = this.formatError(error)
            throw formattedError
        }
    },

    async deleteTodo(todoId) {
        try {
            await axios.delete(route('todos.delete', { todo: todoId }));
        } catch(error) {
            //  handle and format validation errors           
            let formattedError = this.formatError(error)
            throw formattedError
        }
    },

    
    async toggleCompleted(todoId, newStatus) {
        console.log('in toggle completion')
        try {       
            let response = await axios.patch(route('todos.toggleCompletion',
                                            { todo: todoId }), 
            {
                completed: newStatus
            });

            if (response.status === 200) {
                return true
            } else {
                throw this.createNewError('Could not toggle complete', response.status)
            }   
        }

        catch (error) { 
            //  handle and format validation errors         
            let formattedError = this.formatError(error)
            throw formattedError
        }
    },

    formatError(error) {
        //validation errors
 
        if (error.response && error.response.status === 422 && error.response.data.errors) {              
         
            const errorObj = error.response.data.errors             
            const errorKeys = Object.keys(errorObj)
            const errorPropertyName = errorKeys[0]
            const errorMessage = errorObj[errorPropertyName][0]   

            return {
                errorType: 'validationError',
                errorMessage: errorMessage             
            }  
        }
        else { 
            //any other errors  
            console.log('in server errors bit')   
            return {
                errorType: 'serverError',
                errorMessage: error.message || 'Error Toggling Completion'               
            }  
        }                      
    },

    createNewError(errMsg, status) {
        const error = new Error(errMsg);
        error.response = {
            status: status 
        };
        return error
    }  
};
