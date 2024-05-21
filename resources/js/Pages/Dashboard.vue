<template>
    <Layout>     
        <div class="dashboard-container md:p-4 max-w-6xl mx-auto mt-6
                    text-black min-h-full">         
            <div class="panels-container"
                    :class="{'list-active': listsActive, 'todos-active': todosActive }">
                <div class="panel">
                    <Lists :todoLists="todoLists" @new-list-selected="showTodos"
                            v-show="screenWidth > 767 || listsVisible"   />
                </div>             
                <div v-if="currentTodoLists.length > 0" class="panel">
                    <Todos @back-to-list-mode="showLists" :screenWidth="screenWidth"
                           :key="listSelected.id"
                            v-show="screenWidth > 767 || todosVisible" />
                </div>
            </div>                  
        </div>        
    </Layout>
</template>
  
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import { storeToRefs } from 'pinia'
import { useTodoListStore } from '@/Stores/todoListStore'
import { useHandleScreenWidth } from '@/Composables/useHandleScreenWidth'
import Layout from '@/Shared/Layout.vue'
import Lists from '@/Components/Lists/Lists.vue'
import Todos from '@/Components/Todos/Todos.vue'

const { screenWidth } = useHandleScreenWidth()

const props = defineProps({
    register_toast: String,
    todoLists: Object
});

const toast = useToast()

const todoListStore = useTodoListStore()
todoListStore.setTodoLists(props.todoLists)
const { listSelected } = storeToRefs(todoListStore);  
const currentTodoLists = computed(() => todoListStore.todoLists);

onMounted(() => {
    if (props.register_toast) {      
        showRegisterSuccess(props.register_toast)
    }
});

const todosActive = ref(false);
const listsActive = ref(true);
const todosVisible = ref(false);
const listsVisible = ref(true);

const showTodos = () => {
    if (screenWidth.value <= 768) {   
        todosVisible.value = true  
        todosActive.value = true
        listsActive.value = false  
        setTimeout(()=> {
            listsVisible.value = false
        }, 600)  
    }
}

const showLists = () => {
    if (screenWidth.value <= 768) {    
        listsVisible.value = true  
        listsActive.value = true             
        todosActive.value = false;
        setTimeout(()=> {
            todosVisible.value = false            
        }, 600)  
    }
}
 
const showRegisterSuccess = (message) => {    
        toast.add({severity:'success', 
                   summary: 'Success!',
                   detail: message, 
                   life: 4000
                   });
}  

</script>


<style scoped>

/* Larger screens: side-by-side layout */
@media (min-width: 768px) {
  .panels-container {
    display: flex;
    gap: 1rem;
    width: 100%;
    justify-content: center;
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
        width: 95%;
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