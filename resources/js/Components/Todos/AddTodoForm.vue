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
                         hover:bg-orange-600 transition-colors">Add New Todo
            </button>
       </form>      
    </transition>
</template>

<script setup>
    import { ref } from 'vue'
    import axios from 'axios'
    import { useTodoListStore } from '@/Stores/todoListStore'
    import { useToast } from 'primevue/usetoast'
    import { useHandleErrors } from '@/Composables/useHandleErrors';

    const props = defineProps({
        todo: Object
    }) 

    const emits = defineEmits(['formClosed'])
    
    const closeForm = () => {
      isFormVisible.value = false 
      form.value.task = ''
      emits('formClosed')
    };  

    const todoListStore = useTodoListStore()

    const form = ref({ task: '' })
    let formErrors = {}   

    const { getValidationErrors } = useHandleErrors()
    
    const toast = useToast()
    const isErrorToastVisible = ref(false)
    const errorToastKey = 'errorToastKey'     
    

    const isFormVisible = ref(false)
    const makeFormVisible = () => {
      isFormVisible.value = true;     
    };
    // expose the make form visible method so it can be called from dashboard
    defineExpose({
        makeFormVisible
    }) 
  
    const addTodo = async () => {

        try {
          
            const response = await axios.post(route('todos.store'),
                            {
                            task: form.value.task,
                            todo_list_id: todoListStore.listSelected.id
                            })  
           
            todoListStore.addTodo(response.data.addedTodo)         
            showSuccess(form.value.task)         
            closeForm()
        }
        catch (error) { 
            //handle validation errors          
            if (error.response && error.response.status === 422 && error.response.data.errors)
            {     
                formErrors = getValidationErrors(error.response.data.errors)              
                
                toast.add({severity:'error', 
                    summary: 'Error!',                              
                    detail: `${formErrors.task}`,
                    key: errorToastKey                   
               });   

               isErrorToastVisible.value = true
            }
            else { 
                //handle any other errors from axios call     
                toast.add({severity:'error', 
                    summary: 'Something went Wrong',
                    detail: `Unable to add ${form.value.task} task`                 
                });
                form.value.task = ''; 
                closeForm()              
            }              
        }
    }
     
    const showSuccess = (task) => {    
        toast.add({severity:'success', 
                   summary: 'Success!',
                   detail: `The ${task} task has been added`, 
                   life: 6000
        });
    }
    
    // hide error toast as soon as user starts to type in field
    const hideErrorToast = () => {       
        if (isErrorToastVisible.value) {   
            toast.remove(errorToastKey);
            isErrorToastVisible.value = false;
        }  
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