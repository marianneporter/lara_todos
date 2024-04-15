<template>
    <form @submit.prevent="updateTodo()" class="flex flex-col" >
        <div class="relative">
            <input type="text" v-model="form.task"
                @input="hideErrorToast"
                class="w-full p-1 border-2 focus:outline-none
                      focus:border-sky-600 rounded" />
            <i class="fa-regular fa-pen-to-square absolute right-2 top-1/2
                    transform -translate-y-1/2"></i>
        </div>

        <div class="flex justify-between mt-2">
            <div class="mt-2">
                <label class="flex items-center space-x-1 cursor-pointer">
                    <input type="checkbox" v-model="form.completed" class="hidden">
                    <span class="custom-checkbox h-8 w-8 rounded border-2 border-gray-300
                            bg-white transition duration-300 ease-in-out flex justify-center items-center"
                        :class="{'bg-sky-600': form.completed}">
                        <i class="fa fa-check text-white" v-show="form.completed" style="font-size: 1.35rem;"></i>
                    </span>
                    <span>Completed</span>
                </label>
            </div>

            <div class="self-end mt-2 gap-3">
                <button type="button" @click="cancelTodoEdit($event)" class="secondary-btn p-2">Cancel</button>
                <button type="submit" class="primary-btn ml-2 p-2">Save</button>                                       
            </div>
        </div>

    </form>   
</template>

<script setup>
    import { ref, watch } from 'vue'
    import axios from 'axios'
    import { useTodoListStore } from '@/Stores/todoListStore'
    import { useToast } from 'primevue/usetoast'    
  

    import { useHandleErrors } from '@/Composables/useHandleErrors';

    const props = defineProps({
        todo: Object
    })  
    
    watch(() => props.todo, (newTodo) => {
        form.value.task = newTodo.task;
        form.value.completed = newTodo.completed || false;
    }, { deep: true });

    const todoListStore = useTodoListStore()

    const form = ref({ task: props.todo.task, 
                       completed: props.todo.completed || false })
    let formErrors = {}
  
    const emits = defineEmits(['endTodoEdit'])

    const { getValidationErrors } = useHandleErrors()
    
    const toast = useToast()
    const isErrorToastVisible = ref(false)
    const errorToastKey = 'errorToastKey'    

    const toggleCheckbox = () => {
        form.value.completed = !form.value.completed;
    };
  
    const updateTodo = async () => {

        try {
            console.log('updating todo!')
            const response = await axios.patch(route('todos.update', 
                                                     {id: props.todo.id}),
                            {
                            task: form.value.task,
                            })  
           
            todoListStore.updateTodo(response.data.updatedTodo)         
            showSuccess(form.value.task)
            form.value.task = '' 
            emits('endTodoEdit')
        }
        catch (error) { 
            //handle validation errors
            console.log('handling errors')
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
                    detail: `Unable to update ${form.value.task} task`                 
                });
                form.value.task = '';                
            }              
        }
    }
     
    const showSuccess = (task) => {    
        toast.add({severity:'success', 
                   summary: 'Success!',
                   detail: `The ${task} task has been updated`, 
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

    const cancelTodoEdit = (event) => {
        emits('endTodoEdit')
        event.preventDefault()
        form.value.task = ''
    };

    

</script>

<style scoped>
.custom-checkbox {
    display: flex;
    align-items: center;
    justify-content: center;
}
.custom-checkbox .fa-check {
    visibility: hidden;
}
.custom-checkbox.checked .fa-check {
    visibility: visible;
}
</style>