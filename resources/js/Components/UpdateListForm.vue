<template>
    <form @submit.prevent="updateList()" class="flex flex-col" >
        <div class="relative">
            <input type="text" v-model="form.name"
                @input="hideErrorToast"
                class="w-full p-1 border-2 focus:outline-none
                      focus:border-sky-600 rounded" />
            <i class="fa-regular fa-pen-to-square absolute right-2 top-1/2
                    transform -translate-y-1/2"></i>
        </div>

        <div class="self-end mt-2 gap-3">
            <button @click="cancelListEdit" class="secondary-btn p-2">Cancel</button>
            <button type="submit" class="primary-btn ml-2 p-2">Save</button>                                       
        </div>
    </form>   
</template>

<script setup>
    import { ref } from 'vue'
    import axios from 'axios'
    import { useTodoListStore } from '@/Stores/todoListStore'
    import { useToast } from 'primevue/usetoast'
    import { useHandleErrors } from '@/Composables/useHandleErrors';

    const props = defineProps({
        list: Object
    })   

    const todoListStore = useTodoListStore()

    const form = ref({ name: props.list.name })
  
    const emits = defineEmits(['endListEdit'])

    const { getValidationErrors } = useHandleErrors()
    
    const toast = useToast()
    const isErrorToastVisible = ref(false)
    const errorToastKey = 'errorToastKey'    
  
    const updateList = async () => {

        try {
            const response = await axios.patch(route('todo-lists.update', 
                                                     {id: props.list.id}),
                            {
                            name: form.value.name,
                            })  
           
            todoListStore.updateList(response.data.updatedTodoList)         
            showSuccess(form.value.name)
            form.value.name = '' 
            emits('endListEdit')
        }
        catch (error) { 
            //handle validation errors
            console.log('caught error')
            if (error.response && error.response.status === 422 && error.response.data.errors)
            {     
                formErrors = getValidationErrors(error.response.data.errors)              
                
                toast.add({severity:'error', 
                    summary: 'Error!',                              
                    detail: `${formErrors.name}`,
                    key: errorToastKey                   
               });   

               isErrorToastVisible.value = true
            }
            else { 
                //handle any other errors from axios call     
                toast.add({severity:'error', 
                    summary: 'Something went Wrong',
                    detail: `Unable to update ${form.value.name} list`                 
                });
                form.value.name = '';                
            }              
        }
    }

     
    const showSuccess = (listName) => {    
        toast.add({severity:'success', 
                   summary: 'Success!',
                   detail: `The ${listName} list has been updated`, 
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

    const cancelListEdit = () => {
        emits('endListEdit')
        form.name = ''
    };

</script>