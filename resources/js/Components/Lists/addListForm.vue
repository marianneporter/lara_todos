<template>
    <transition name="scale">
        <form v-if="isFormVisible" @submit.prevent="addNewList" 
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
    import axios from 'axios'
    import { useTodoListStore } from '@/Stores/todoListStore'
    import { useToast } from 'primevue/usetoast'
    import { useHandleErrors } from '@/Composables/useHandleErrors';
    import { ref } from 'vue'
    
    const props= defineProps({
        formVisible: Boolean
    }) 

    const emits = defineEmits(['formClosed'])
   
    const form = ref({ name: '' })
    let formErrors = {}

    const isFormVisible = ref(false)
    const makeFormVisible = () => {
      isFormVisible.value = true;     
    };

    const { getValidationErrors } = useHandleErrors()

    const toast = useToast()
    const isErrorToastVisible = ref(false)
    const errorToastKey = 'errorToastKey'    
    
    const closeForm = () => {
      isFormVisible.value = false; 
      emits('formClosed')
    };

   // Expose the toggleFormVisibility so it can be accessed from dashboard
    defineExpose({
        makeFormVisible
    }) 

    const todoListStore = useTodoListStore()
  
    const addNewList = async () => {
        try {
            const response = await axios.post('/todo-lists', {
               name: form.value.name,
            })          
            todoListStore.addList(response.data.addedTodoList)         
            showSuccess(form.value.name)
            form.value.name = '' 
            closeForm()
        }
        catch (error) { 
            //handle validation errors
            if (error.response && error.response.status === 422 && error.response.data.errors)
            {     
                formErrors = getValidationErrors(error.response.data.errors)          
                
                toast.add({severity:'error', 
                    summary: 'Error!',                              
                    detail: `${formErrors.name}`,
                    key: errorToastKey                   
               });            
               isErrorToastVisible.value = true
            } else { 
                //handle any other errors from axios call     
                toast.add({severity:'error', 
                    summary: 'Something went Wrong',
                    detail: `Unable to add ${form.value.name} list`                 
                });
                form.value.name = ''; 
                closeForm();
            }
               
        }
    }
 
    const showSuccess = (todoName) => {    
        toast.add({severity:'success', 
                   summary: 'Success!',
                   detail: `The ${todoName} todo has been added`, 
                   life: 6000
                   });
    } 

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