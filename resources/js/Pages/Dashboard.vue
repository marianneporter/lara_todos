<template>
      <Layout>
            <div class="max-w-6xl mx-auto mt-3">
                <h1>Welcome to the Laravel Todo List App</h1>
             
                <div class="flex w-full text-black gap-4 min-h-full">
                    <section class="flex-1 section-card ">                                     
                        <h3 class="list-heading">My Lists</h3>
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
    import { useTodoListStore } from '@/Stores/todoListStore'   
    import { storeToRefs } from 'pinia'
    import { computed } from 'vue';
  
    const props = defineProps({
        message: String,
        todoLists: Object
    })    

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
    .active {
        background-color: red;
    }
</style>