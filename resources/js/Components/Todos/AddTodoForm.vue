<template>
    <transition name="scale">
        <form v-if="isFormVisible" @submit.prevent="addTodo" 
            class=" bg-white my-2 flex justify-between items-center
                   rounded-lg overflow-hidden">

            <div class="relative flex-grow">
                <input type="text" 
                    v-model="form.task"
                    @input="hideErrorToast"
                    class="py-3 pl-4 pr-2 rounded-l-lg border-r-0 
                            focus:outline-none focus:ring-0 w-full" 
                    placeholder="New Task Name">

                <button type="button" @click="closeForm"
                    class="absolute right-2 top-1/2 transform -translate-y-1/2 
                        bg-transparent text-gray-700 hover:text-gray-900 
                        focus:outline-none p-1 rounded-full">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <button class="px-6 py-3 bg-orange-500 text-white focus:outline-none
                         hover:bg-orange-600 transition-colors">Add
            </button>
       </form>      
    </transition>
</template>

<script setup>
    import { ref } from 'vue'
    import DBService from '@/Services/DBService'
    import { useTodoListStore } from '@/Stores/todoListStore'
    import { useToast } from 'primevue/usetoast'
    import { useHandleErrors } from '@/Composables/useHandleErrors';

    const props = defineProps({
        todo: Object
    }) 

    const todoListStore = useTodoListStore()

    const emits = defineEmits(['formClosed'])
    
    const closeForm = () => {
      isFormVisible.value = false 
      form.value.task = ''
      emits('formClosed')
    };   

    const form = ref({ task: '' })

    const toast = useToast()      
    const { handleErrors,  
            hideErrorToast } = useHandleErrors(toast,
                                             'add',   
                                              'list', 
                                              form.value.name)

    const isFormVisible = ref(false)
    const makeFormVisible = () => {
      isFormVisible.value = true;     
    };

    // expose the make form visible method so it can be called from dashboard
    defineExpose({
        makeFormVisible
    }) 
  
    const addTodo = async () => {

        let addedTodo
        try {          
            addedTodo = await DBService.addTodo(
                            {
                            task: form.value.task,
                            completed: false,
                            todo_list_id: todoListStore.listSelected.id
                            })  
        }
        catch (error) { 
            //handle validation errors                
            handleErrors(error,
                        'add',
                        'todo',                                        
                        form.value.task)   
                 
            if (error.errorType === 'serverError') {               
                form.value.task = '' 
                closeForm()     
            }      
            return
        }
   
        todoListStore.addTodo(addedTodo)    
        let lists = todoListStore.getTodoLists;           
        showSuccess(form.value.task)         
        closeForm()

    }
     
    const showSuccess = (task) => {    
        toast.add({severity:'success', 
                   summary: 'Success!',
                   detail: `The ${task} task has been added`, 
                   life: 3000
        });
    }

</script>

<style scoped>
    .scale-enter-active, .scale-leave-active {
        transition: transform 0.3s;
    }
    .scale-enter-from, .scale-leave-to {
        transform: scale(0.95);
        opacity: 0;
    }   

</style>