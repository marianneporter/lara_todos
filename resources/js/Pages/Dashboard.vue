<template>
      <Layout>
            <div class="max-w-6xl mx-auto mt-3">
                <h1>Welcome to the Laravel Todo List App</h1>
             
                <div class="flex w-full text-black gap-4 min-h-full">
                    <section class="flex-1 section-card ">                     
                        <h3>My Lists</h3>
                        <div v-for="name in getTodoListNames" :key="name">
                            <div class="list-entry-card">
                                <div>{{ name }}</div>
                            </div>                         
                        </div>                       
                    </section>
                    <section class="flex-1 section-card">
                        <h3>My Todos</h3>
                            <div v-for="todo in getTodosAllLists" :key="todo.id">
                                <div class="list-entry-card">
                                    <div>{{ todo.task }}</div>
                                </div>
                               
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
  
    const props = defineProps({
        message: String,
        todoLists: Object
    })    

    const todoListStore = useTodoListStore()

    todoListStore.setTodoLists(props.todoLists)

    const { todoLists, getTodoListNames,
            getTodosAllLists, getTodosForList } = storeToRefs(todoListStore)   

    console.log(getTodosAllLists.value)
 
</script>