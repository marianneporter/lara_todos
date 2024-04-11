<template>
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
</template>

<script setup>
    import { computed } from 'vue'
    import { useTodoListStore } from '@/Stores/todoListStore'  
    import { storeToRefs } from 'pinia' 
     
    const todoListStore = useTodoListStore()
    const {  listSelected, getTodosAllLists, getTodosForList } = storeToRefs(todoListStore);  

    const todos = computed(() => {
        if (listSelected.value.id === 0 ) { 
            return getTodosAllLists.value
        } else {
            return getTodosForList.value
        }
    })   
    
    let allLists = todoListStore.getTodosAllLists
    console.log(allLists)

    let otherLists = getTodosAllLists.value
    console.log(otherLists)
</script>