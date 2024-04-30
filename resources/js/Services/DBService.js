import axios from 'axios';

export default { 
    async addTodo(todo) { 
        try {       
            let response = await axios.post(route('todos.store'), todo)           
            return response.data.addedTodo           
        }
        catch (error) { 
            //  handle and format validation errors   
            console.log(error)  
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
            console.log('in catch of service')    
            console.log(error)      
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
                errorMessage: ''
            }  
        }                      
    }
  
};
