<template>
    <section class="flex-1 section-card">
        <header class="flex justify-between">
            <h3 class="list-heading">Tasks for: {{ listSelected.name }}
                List<span v-if="listSelected.id === 0">s</span>
            </h3>
            <button v-if="listSelected.id !== 0 && showAddFormBtn" @click="showAddTodoForm" class="cursor-pointer">
                <i class="fa-solid fa-plus"></i> Add new todo
            </button>
        </header>

        <AddTodoForm ref="addTodoFormRef"
                     @formClosed="showAddFormBtn = true"  />

        <div v-if="todos" >
            <div v-for="todo in todos" :key="todo.id">
                <div class="list-entry-card flex gap-2">

                    <!-- editing mode -->
                    <div v-if="currentEditTodoId && currentEditTodoId === todo.id" class="flex-1">
                    
                        <UpdateTodoForm :todo="todo"
                                        :key="todo.id"
                                        @endTodoEdit="endTodoEdit"  />                             

                    </div>
                    <!-- list mode -->
                    <div v-else class="flex w-full gap-3 items-stretch h-full">   
                        <button :class="{'completed': todo.completed}" @click="toggleCompletion(todo)">
                                <span v-if="todo.completed"><i class="fa-solid fa-check"></i></span>
                                <span v-else><i class="fa-regular fa-circle"></i></span>
                                {{ todo.description }}
                        </button>                 

                        <div class="flex-grow flex-shrink-0 basis-0 text-left">                                
                            <p> {{ todo.task }}</p> 
                            <p v-if="listSelected.id === 0" class="text-xs">from: {{ todo.listName }}  list</p>
                        </div>

                        <template v-if="listSelected.id !==0">
                            <button  @click="editTodo(todo)" >
                                <i class="fa-regular fa-pen-to-square"></i>
                            </button>

                            <button @click="confirmDelete(todo)"
                                    label="Delete" severity="danger" outlined >
                                <i class="fa-solid fa-trash-can"></i>
                            </button>    
                        </template>                          
                                                    
                        <button v-else
                                class="outline-btn" 
                                @click="selectListToEdit(todo.todo_list_id)">
                            edit list
                        </button>
                        
                    </div>   
                </div>                         
            </div>                                   
        </div> 
        <div v-else>
            <p>no todos yet</p>
        </div>                            
    </section>
</template>

<script setup>
    import { computed, ref } from 'vue'
    import { useTodoListStore } from '@/Stores/todoListStore'  
    import { storeToRefs } from 'pinia' 
    import AddTodoForm from '@/Components/Todos/AddTodoForm.vue'
    import UpdateTodoForm from '@/Components/Todos/UpdateTodoForm.vue'
    import { useConfirm } from 'primevue/useconfirm'
    import { useToast } from 'primevue/usetoast'
     
    const todoListStore = useTodoListStore()
    const {  listSelected, getTodosAllLists, getTodosForList } = storeToRefs(todoListStore);  
        
    const confirm = useConfirm()
    const toast = useToast()

    const showAddFormBtn = ref(true)
    const addTodoFormRef = ref(null)
      
    const showAddTodoForm = () => {
        showAddFormBtn.value = false
        if (addTodoFormRef.value) {
            addTodoFormRef.value.makeFormVisible();
        }
    }

    const currentEditTodoId = ref(0);

    const todos = computed(() => {
        if (listSelected.value.id === 0 ) { 
            return getTodosAllLists.value
        } else {
            return getTodosForList.value
        }
    })    

    const toggleCompletion = () => {
        console.log('toggling complete!')
    }

   
    const selectListToEdit = (listId) => {       
        todoListStore.setListSelectedById(listId)
    }; 

    const editTodo = (todo) => {
        currentEditTodoId.value = todo.id
    }
    
    const endTodoEdit = () => {       
        currentEditTodoId.value = 0;
    }  

    const confirmDelete = (todo) => {
       
       confirm.require({
           message: `Are you sure you want to delete your ${todo.task} task?`,
           accept: () => { 
               deleteTodo(todo)             
           }
       });
    }; 

    const deleteTodo = async (todo) => {

        try {
            const response
             = await axios.delete(route('todos.delete', { todo: todo.id }));

            todoListStore.deleteTodo(todo.id)

            toast.add({severity:'success', 
                  summary: 'Success!',
                  detail: `The ${todo.task} todo has been deleted`, 
                  life: 3000
               });
          
        } catch (error) {
            toast.add({severity:'error', 
                   summary: 'Error!',                              
                   detail: `Unable to delete ${todo.task}`                                     
            });  
        }
    };


</script>