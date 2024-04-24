<template>
    <Layout>
        <div class="max-w-6xl mx-auto mt-6">
            <div class="dashboard-container text-black gap-4 min-h-full">                    
                <!-- Lists Panel -->
                <div :class="['panel', 'lists-panel',
                      (todosVisible && screenWidth <= 768) ? 'show-todos' : '']"
                       v-show="!todosVisible || screenWidth > 768">
                    <Lists :todoLists="todoLists" @new-list-selected="handleSelect" />
                </div>
                <!-- Todos Panel -->
                <div :class="['panel', 'todos-panel', todosVisible ? 'show-todos' : '']"
                    v-show="todosVisible || screenWidth > 768">
                    <Todos @back-to-list-mode="handleBack"
                           :screenWidth="screenWidth" />
                </div>
            </div>
        </div> 
    </Layout>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from 'vue'
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
   
    const todosVisible = ref(false);

    const handleSelect = () => {
       
        if (screenWidth.value <= 768) {
           
            todosVisible.value = true           
        }     
    }

    const handleBack = () => {
      
        if (screenWidth.value <= 768) {
           
                todosVisible.value = false           
        }      
    }
   
</script>


<style scoped>
/* Larger screens: side-by-side layout */
@media (min-width: 768px) {
    .dashboard-container {
        display: flex;
        width: 100%;
    }

    .lists-panel, .todos-panel {
        flex: 1;  /* This makes each panel take half of the container's width */
        position: static;  /* Override any absolute positioning */
        transform: none;  /* Cancel any transforms */
    }
}

/* Smaller screens: sliding panels */
@media (max-width: 767px) {
    .dashboard-container {
        position: relative;
        width: 100%;
        min-height: 100vh; 
        /* overflow: hidden; */
    }

    .panel {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;      
        height: 100%; /* Make sure panels occupy full container height */
        transition: transform 1s ease-in-out;
        overflow: hidden;
        will-change: transform;
    }

    .lists-panel {
        transform: translateX(0);
    }

    .todos-panel {
        transform: translateX(100%);
    }

    .lists-panel.show-todos {
        transform: translateX(-100%);
    }

    .todos-panel.show-todos {
        transform: translateX(0%); 
    }
}
</style>
