<template>
    <section class="flex-1 section-card">
        <h3 class="list-heading">Tasks for: {{ listSelected.name }}
            List<span v-if="listSelected.id === 0">s</span></h3>

            <div v-if="todos" >
                <div v-for="todo in todos" :key="todo.id">
                    <div class="list-entry-card flex gap-2">

                        <!-- editing mode -->
                        <div v-if="currentEditTodoId && currentEditTodoId === todo.id" class="flex-1">
<!--                         
                            <UpdateListForm :list="list"
                                            @endListEdit="endListEdit"  /> -->

                        </div>

                        <!-- list mode -->
                        <div v-else class="flex w-full gap-3 items-stretch h-full">   
                            <button :class="{'completed': todo.completed}" @click="toggleCompletion(todo)">
                                    <span v-if="todo.completed"><i class="fa-solid fa-check"></i></span>
                                    <span v-else><i class="fa-regular fa-circle"></i></span>
                                    {{ todo.description }}
                            </button>                 

                            <div>                                
                                <p class="flex-grow flex-shrink-0 basis-0 text-left">                                                                   
                                    {{ todo.task }}                              
                                </p> 
                                <p>from: {{ todo.listName }}</p>
                            </div>


                        
                            <button v-if="todo.id !==0" @click="editTodo($event, list)">
                                <i class="fa-regular fa-pen-to-square"></i>
                            </button>

                            <button @click="confirmDelete(list)" v-if="todo.id !==0"
                                    label="Delete" severity="danger" outlined >
                                <i class="fa-solid fa-trash-can"></i>
                            </button>    
                            
                            <button v-if="todo.id === 0">
                                edit {{ todo.listName }}
                            </button>

                        </div>   
                  </div>                         
                </div>                                   
            </div> 
            <div v-else>
                <p>no todolists yet</p>
            </div>                            
    </section>
</template>

<script setup>
    import { computed, ref } from 'vue'
    import { useTodoListStore } from '@/Stores/todoListStore'  
    import { storeToRefs } from 'pinia' 
     
    const todoListStore = useTodoListStore()
    const {  listSelected, getTodosAllLists, getTodosForList } = storeToRefs(todoListStore);  

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

   
    const editTodo = (event, todo) => {
        currentEditTodoId.value = todo.id       
    
        event.stopPropagation();
    }; 

</script>