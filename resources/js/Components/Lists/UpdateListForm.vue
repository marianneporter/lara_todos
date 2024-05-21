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
            <button @click="cancelListEdit" type="button" class="secondary-btn p-2">Cancel</button>
            <button type="submit" class="primary-btn ml-2 p-2">Save</button>                                       
        </div>
    </form>   
</template>

<script setup>
    import { ref } from 'vue'
    import DBService from '@/Services/DBService'
    import { useTodoListStore } from '@/Stores/todoListStore'
    import { useToast } from 'primevue/usetoast'
    import { useHandleErrors } from '@/Composables/useHandleErrors';

    const props = defineProps({
        list: Object
    })   

    const todoListStore = useTodoListStore()

    const form = ref({ name: props.list.name })
   
    const emits = defineEmits(['endListEdit'])

    const isFormVisible = ref(false)
    const makeFormVisible = () => {
      isFormVisible.value = true;     
    };

    const closeForm = () => {  
        isFormVisible.value = false 
        form.value.name=''
        emits('endListEdit')
    };
    
    const toast = useToast()
    
    const { handleErrors,  
            hideErrorToast } = useHandleErrors(toast,
                                             'update',   
                                             'list', 
                                              form.value.name)   
    const updateList = async () => {

        let updatedTodoList
        try {      
            updatedTodoList = await DBService.updateList(props.list.id, 
                                                  { name: form.value.name })  
        }
        catch (error) {  
            handleErrors(error,
                        'update',
                        'list',                                        
                        form.value.name)         
            if (error.errorType === 'serverError') {               
                form.value.name = '' 
                closeForm()     
            }      
            return
        }
 
        todoListStore.updateList(updatedTodoList)         
        showSuccess(form.value.name)
        form.value.name = '' 
        emits('endListEdit')
    }
     
    const showSuccess = (listName) => {    
        toast.add({severity:'success', 
                   summary: 'Success!',
                   detail: `The ${listName} list has been updated`, 
                   life: 4000
                   });
    } 

    const cancelListEdit = () => {
        emits('endListEdit')
        form.name = ''
    };

</script>