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

                        <div v-for="name in getTodoListOptions" :key="name">
                          
                            <button :class="[ listSelected == name ? 
                                          'list-entry-card-selected' : 'list-entry-card']"                              
                                 :disabled="listSelected == name"
                                 @click="changeSelectedList(name)">                                                                   
                                 {{ name }}                              
                            </button> 
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
 
</script>

<style scoped>

</style>