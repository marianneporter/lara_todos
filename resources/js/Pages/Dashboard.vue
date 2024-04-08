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

                        <div v-for="name in getTodoListOptions" :key="name" >
                            <div  :class="[ listSelected == name ? 
                                        'list-entry-card-selected' : 'list-entry-card']" 
                                   class="flex gap-2">

                                <!-- editing mode -->
                                <div v-if="editingListName === name" class="flex-1">
                                    <input type="text" v-model="editedText" class="w-full p-1" />
                                    <button @click="saveListEdit(name)" class="p-2">Save</button>
                                    <button @click="cancelListEdit" class="p-2">Cancel</button>
                                </div>

                                <!-- list mode -->
                                <div v-else class="flex w-full">                                 

                                    <button class="flex-grow flex-shrink-0 basis-0 text-left"
                                        :disabled="listSelected == name"
                                        @click="changeSelectedList(name)">                                                                   
                                        {{ name }}                              
                                    </button> 

                                    <button @click="editListName"><i class="fa-regular fa-pen-to-square"></i></button>
                                    <button><i class="fa-solid fa-trash-can"></i></button>                                
  
                                </div>   
                            </div> 
                        </div>   
                    </section>

                    <section class="flex-1 section-card">
                        <h3 class="list-heading">Tasks for: {{listSelected}}
                            List<span v-if="listSelected == 'All'">s</span></h3>

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
    
    const showAddListForm = () => {
        showAddFormBtn.value = false
        if (addListFormRef.value) {
            addListFormRef.value.makeFormVisible();
        }
    }
    
    const todos = computed(() => {
        if (listSelected.value == 'All' ) { 
            return todoListStore.getTodosAllLists
        } else {
            return todoListStore.getTodosForList
        }
    }) 

    const todoListStore = useTodoListStore()

    todoListStore.setTodoLists(props.todoLists)

    const { todoLists, listSelected, getTodoListNames,
            getTodosAllLists, getTodosForList,
            getTodoListOptions } = storeToRefs(todoListStore);  
            
    const changeSelectedList = (newList) => {
        todoListStore.setListSelected(newList)  
    }    
    
    const editingListName = ref(null);
    const editedListText = ref('');

    // Edit button handler
    const editListName = (name, event) => {
        editingListName.value = name;
        editedListText.value = name;    
        event.stopPropagation();
    };

    // Save button handler
    const saveListEdit = (name) => {
        // Implement saving logic here
        // For demonstration, let's just log the edited text
        console.log(`Saving '${editedListText.value}'`);

        // Reset editing state
        editingListName.value = null;
        editedListText.value = '';
    };

    // Cancel button handler
    const cancelListEdit = () => {
        editingListName.value = null;
        editedListText.value = '';
    };
        
</script>

<style scoped>

</style>