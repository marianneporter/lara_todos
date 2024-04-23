<template>
    <section class="flex-1 section-card ">   
        <header class="flex justify-between">
            <h3 class="list-heading">My Lists</h3>
            <button v-if="showAddFormBtn" @click="showAddListForm" class="cursor-pointer">
                <i class="fa-solid fa-plus"></i> Add new list
            </button>
            
        </header>                       
        
        <AddListForm ref="addListFormRef"
                    @formClosed="showAddFormBtn = true"/>                                                    

        <div v-for="list in getListDataOptions" :key="list.id" >
            <div :class="[ listSelected.id == list.id ? 
                        'list-entry-card-selected' : 'list-entry-card']" 
                class="flex gap-2">
              
                <!-- editing mode -->
                <div v-if="currentEditListId && currentEditListId === list.id" class="flex-1">
                
                    <UpdateListForm :list="list"
                                    @endListEdit="endListEdit"  />

                </div>

                <!-- list mode -->
                <div v-else class="flex w-full gap-3 items-stretch h-full">                                 

                    <button class="flex-grow flex-shrink-0 basis-0 text-left"
                        :disabled="listSelected.id == list.id"
                        @click="changeSelectedList(list)">                                                                   
                        {{ list.name }}                              
                    </button> 
                  
                    <button v-if="list.id !==0" @click="editList($event, list)">
                        <i class="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button @click="confirmDelete(list)"                          
                            v-if="list.id !== 0">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>                                

                </div>   
            </div> 
        </div>   
    </section>
</template>

<script setup>
    import AddListForm from '@/Components/Lists/AddListForm.vue'
    import UpdateListForm from "@/Components/Lists/UpdateListForm.vue"
    import { useTodoListStore } from '@/Stores/todoListStore'   
    import { storeToRefs } from 'pinia'
    import { ref } from 'vue';    
    import { useConfirm } from 'primevue/useconfirm'
    import { useToast } from 'primevue/usetoast'

    const props = defineProps({       
        todoLists: Object
    })  
    
    const emits = defineEmits(['new-list-selected'])
     
    const confirm = useConfirm()
    const toast = useToast()
  
    const addListFormRef = ref(null);  

    const showAddFormBtn = ref(true);
   
    const showAddListForm = () => {
        showAddFormBtn.value = false
        if (addListFormRef.value) {
            addListFormRef.value.makeFormVisible();
        }
    }

    const todoListStore = useTodoListStore()

    const {  listSelected, getListDataOptions } = storeToRefs(todoListStore);  
            
    const changeSelectedList = (newList) => {
        todoListStore.setListSelected(newList)  
        emits('new-list-selected')
    }    

    const currentEditListId = ref(0);
   
    const editList = (event, list) => {
        currentEditListId.value = list.id   
        todoListStore.setListSelected(list)
    
        event.stopPropagation();
    }; 

    const endListEdit = () => {
        currentEditListId.value = 0;
    }   

    const confirmDelete = (list) => {
       
        confirm.require({
            message: `Are you sure you want to delete your ${list.name} list?`,
            accept: () => { 
                deleteList(list)             
            }
        });
    }; 

    const deleteList = async (list) => {
        try {
            const response
              = await axios.delete(route('todo-lists.delete', { todoList: list.id }));

            todoListStore.deleteList(list.id)

            toast.add({severity:'success', 
                   summary: 'Success!',
                   detail: `The ${list.name} list has been deleted`, 
                   life: 3000
                });
           
        } catch (error) {
            toast.add({severity:'error', 
                    summary: 'Error!',                              
                    detail: `Unable to delete ${list.name}`                                     
            });  
        }
    };
    
</script>