<template>
      <Layout>
            <div class="max-w-6xl mx-auto mt-3">
                <h1>Welcome to the Laravel Todo List App</h1>
             
                <div class="flex w-full text-black gap-4 min-h-full">
                    <section class="flex-1 section-card ">   
                        <header class="flex justify-between">
                            <h3 class="list-heading">My Lists</h3>
                            <button v-if="showAddFormBtn" @click="showAddListForm" class="cursor-pointer">
                                <i class="fa-solid fa-plus"></i> Add new list
                            </button>
                        </header>                       
                        
                        <AddListForm ref="addListFormRef"
                                     @formClosed="showAddFormBtn = true"/>                                                    

                        <div v-for="list in getListDataOptions" :key="list.id" >
                            <div  :class="[ listSelected.name == list.name ? 
                                        'list-entry-card-selected' : 'list-entry-card']" 
                                   class="flex gap-2">

                                <!-- editing mode -->
                                <div v-if="currentEditListId && currentEditListId === list.id" class="flex-1">
                                    <form @submit.prevent="updateList(list.id)" class="flex flex-col" >
                                        <div class="relative">
                                            <input type="text" v-model="listAmendForm.name"
                                                class="w-full p-1 border-2 focus:outline-none focus:border-sky-600 rounded"
                                                />
                                            <i class="fa-regular fa-pen-to-square absolute right-2 top-1/2
                                                    transform -translate-y-1/2"></i>
                                        </div>
                                   
                                        <div class="self-end mt-2 gap-3">
                                            <button @click="cancelListEdit" class="secondary-btn p-2">Cancel</button>
                                            <button type="submit" class="primary-btn ml-2 p-2">Save</button>                                       
                                        </div>
                                    </form>

                                </div>

                                <!-- list mode -->
                                <div v-else class="flex w-full gap-3">                                 

                                    <button class="flex-grow flex-shrink-0 basis-0 text-left"
                                        :disabled="listSelected.id == list.id"
                                        @click="changeSelectedList(list)">                                                                   
                                        {{ list.name }}                              
                                    </button> 

                                    <button @click="editList($event, list)"><i class="fa-regular fa-pen-to-square"></i></button>
                                    <button><i class="fa-solid fa-trash-can"></i></button>                                
  
                                </div>   
                            </div> 
                        </div>   
                    </section>

                    <section class="flex-1 section-card">
                        <h3 class="list-heading">Tasks for: {{ listSelected.name }}
                            List<span v-if="listSelected.id === 0">s</span></h3>

                            <div v-if="todos" >
                                <div v-for="todo in todos" :key="todo.id">
                                    <div class="list-entry-card">
                                        <div>{{ todo.task }}</div>
    
                                    </div>                               
                                </div>                                   
                            </div> 
                            <div v-else>
                                <p>no todolists yet</p>
                            </div>                            
                    </section>
                </div>
            </div> 
      </Layout>

</template>

<script setup>
    import { useForm } from "@inertiajs/vue3"
    import Layout from '@/Shared/Layout.vue' 
    import AddListForm from '@/Components/addListForm.vue'
    import { useTodoListStore } from '@/Stores/todoListStore'   
    import { storeToRefs } from 'pinia'
    import { computed, ref } from 'vue';
  
    const addListFormRef = ref(null);

    const showAddFormBtn = ref(true);

    const props = defineProps({
        message: String,
        todoLists: Object
    })   

    const listAmendForm = useForm({
        name: null, 
    });
    
    const showAddListForm = () => {
        showAddFormBtn.value = false
        if (addListFormRef.value) {
            addListFormRef.value.makeFormVisible();
        }
    }
    
    const todos = computed(() => {
        if (listSelected.value.id === 0 ) { 
            return todoListStore.getTodosAllLists
        } else {
            return todoListStore.getTodosForList
        }
    }) 

    const todoListStore = useTodoListStore()

    todoListStore.setTodoLists(props.todoLists)

    const {  listSelected, getListDataOptions } = storeToRefs(todoListStore);  
            
    const changeSelectedList = (newList) => {
        todoListStore.setListSelected(newList)  
    }    
    
    const currentEditListId = ref(0);
 

    // Edit button handler
    const editList = (event, list) => {
        currentEditListId.value = list.id
        listAmendForm.name = list.name   
        todoListStore.setListSelected(list)
       
        event.stopPropagation();
    };

    
    const updateList = (id) => {
        

        listAmendForm.patch(route('todo-lists.update', {id: id}), {
            onSuccess: () => {              
                console.log('successful save')
            },
        });

        // Reset editing state
        currentEditListId.value = 0;
        listAmendForm.name = '';
    };

    // Cancel button handler
    const cancelListEdit = () => {
        currentEditListId.value = 0;
        listAmendForm.name = '';
    };
        
</script>

<style scoped>

</style>