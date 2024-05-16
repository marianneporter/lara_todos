<template>
    <section v-if="listSelected.id !== 0 || todos.length !== 0" 
             class="flex-1 section-card"  >    
        <header >
            <div  class="flex justify-between" >
                <h3 class="list-heading"> {{ getTodosHeading }} </h3>
                <button v-if="listSelected.id !== 0 && showAddFormBtn"
                    @click="showAddTodoForm" class="cursor-pointer">
                    <i class="fa-solid fa-plus"></i>
                     {{ `Add ${todos.length === 0 ? 'first' : 'new'} todo`}}
                </button>
            </div>
            <button v-if="screenWidth <= 768"
                    @click="emits('back-to-list-mode')"><i class="fa-solid fa-arrow-left"></i> Back to lists</button>
        </header>

        <AddTodoForm ref="addTodoFormRef"
                     @formClosed="showAddFormBtn = true"  />
       
        <div v-if="todos && todos.length > 0">
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
                                    label="Delete">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>    
                        </template>                          
                                                    
                        <button v-else
                                class="outline-btn self-center" 
                                @click="selectListToEdit(todo.todo_list_id)">
                            edit list
                        </button>                        
                    </div>   
                </div>                         
            </div>                                   
        </div>              
    </section>
    <div v-else class="section-card">
        <p class="list-heading" @click="emits('back-to-list-mode')">
            <i class="fa-solid fa-arrow-left"></i>
                  Select a list to add some todos
        </p>
    </div>
</template>

<script setup>
    import { computed, ref } from 'vue'
    import { useTodoListStore } from '@/Stores/todoListStore'  
    import { storeToRefs } from 'pinia' 
    import AddTodoForm from '@/Components/Todos/AddTodoForm.vue'
    import UpdateTodoForm from '@/Components/Todos/UpdateTodoForm.vue'
    import { useConfirm } from 'primevue/useconfirm'
    import { useToast } from 'primevue/usetoast'
    import DBService from '@/Services/DBService'
    
    const props = defineProps({
        screenWidth: {
            type: Number,
            default: () => window.innerWidth 
        }      
    });  

    const emits = defineEmits(['back-to-list-mode'])
     
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

    const toggleCompletion = async (todo) => {
        // optimistically toggle completion in store  
        const newStatus = todoListStore.toggleTodoCompletion(todo.id);

        try {               
            let successfulToggle = await DBService.toggleCompleted(todo.id, newStatus)
            
            if ( !successfulToggle ) {
                throw 'Error in updating completion status'
            }

        } catch (error) {
            // change to previous completion state as update failed
            todoListStore.toggleTodoCompletion(todo.id);
            toast.add({
                severity:'error', 
                summary: 'Error!',                              
                detail: `Failed to toggle completion status for ${todo.task}`
            });
        }
    }
   
    const selectListToEdit = (listId) => {       
        todoListStore.setListSelectedById(listId)
    }; 

    const getTodosHeading = computed (() => {
     
        if ( listSelected.value.id === 0 ) {
            if ( todos.value.length === 0) {
                return 'No lists or tasks yet'
            } else {
                return 'Tasks for: All Lists'
            }           
        }

        if (todos.value.length === 0) {
            return `${listSelected.value.name} list has no Todos yet`
        } else {
            return `Tasks for: ${listSelected.value.name}`
        }
    })

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
            await DBService.deleteTodo(todo.id)           
        }
        catch (error) {
            toast.add({severity:'error', 
                   summary: 'Error!',                              
                   detail: `Unable to delete ${todo.task}`                                     
            });  
            return
        }

        // update ui  
        todoListStore.deleteTodo(todo.id)

        toast.add({severity:'success', 
            summary: 'Success!',
            detail: `The ${todo.task} todo has been deleted`, 
            life: 3000
        });
    };


</script>