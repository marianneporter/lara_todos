<template>
      <Layout>
            <div class="max-w-6xl mx-auto mt-3">
                <h1>Welcome to the Laravel Todo List App</h1>
             
                <div class="flex w-full text-black gap-4 min-h-full">                    
                    <Lists :todoLists="todoLists" />
                    <Todos />
                </div>
            </div> 
      </Layout>
</template>

<script setup> 
    import Layout from '@/Shared/Layout.vue' 
    import { useTodoListStore } from '@/Stores/todoListStore'   
    import Lists from '@/Components/Lists/Lists.vue'
    import Todos from '@/Components/Todos/Todos.vue'

    const props = defineProps({
        message: String,
        todoLists: Object
    })      
    
    const todoListStore = useTodoListStore()
    todoListStore.setTodoLists(props.todoLists)
        
</script>

<style scoped>

</style>