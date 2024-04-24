<template>
    <Layout>     
        <div class="dashboard-container md:p-4 max-w-6xl mx-auto mt-6
                    text-black min-h-full">         
            <div class="panels-container"
                    :class="{'list-active': listsActive, 'todos-active': todosActive }">
                <div class="panel">
                    <Lists :todoLists="todoLists" @new-list-selected="showTodos" />
                </div>
                <div class="panel">
                    <Todos @back-to-list-mode="showLists" :screenWidth="screenWidth" />
                </div>
            </div>            
        </div>        
    </Layout>
</template>
  
<script setup>
import { ref } from 'vue'
import { useTodoListStore } from '@/Stores/todoListStore'
import { useHandleScreenWidth } from '@/Composables/useHandleScreenWidth'
import Layout from '@/Shared/Layout.vue'
import Lists from '@/Components/Lists/Lists.vue'
import Todos from '@/Components/Todos/Todos.vue'

const props = defineProps({
    message: String,
    todoLists: Object
});

const todoListStore = useTodoListStore()
todoListStore.setTodoLists(props.todoLists)

const { screenWidth } = useHandleScreenWidth()

const todosActive = ref(false); // Start with only the Lists visible
const listsActive = ref(true);


const showTodos = () => {
    if (screenWidth.value <= 768) {      
        todosActive.value = true;
        listsActive.value = false;     
    }
}

const showLists = () => {
    if (screenWidth.value <= 768) {         
        todosActive.value = false;
        listsActive.value = true;      
    }
}
</script>


<style scoped>
/* Larger screens: side-by-side layout */
@media (min-width: 768px) {
  .panels-container {
    display: flex;
    gap: 1rem;
    width: 100%;
  }
  .panel {
    flex: 1;
  }
}

/* smaller screens show both components at 100% width */
@media (max-width: 767px) {
    .dashboard-container {
        overflow: hidden;
        position: relative;
        width: 100%;
        height: 100vh;
    }

    .panels-container {
        display: flex;
        position: absolute; 
        width: 200%; 
        transition: transform 0.5s ease; 
    }

    .panel {
        flex: 1;
    }

    .list-active {
        transform: translateX(0); 
    }

    .todos-active {
        transform: translateX(-50%); 
    } 
}
</style>