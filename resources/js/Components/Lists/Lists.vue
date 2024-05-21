<template>
    <section class="section-card"
    :class="{'screen-width-section' : noLists}">   
        <header class="md:flex justify-between">          
            <h3 class="list-heading">            
                <span v-if="getListDataOptions.length <= 1">You have no lists yet</span>
                <span v-else>My Lists </span>              
            </h3>
            <button v-if="showAddFormBtn" @click="showAddListForm" class="cursor-pointer">
                <i class="fa-solid fa-plus"></i> Add new list
            </button>
            
        </header>                       
        
        <AddListForm ref="addListFormRef"
                    @formClosed="showAddFormBtn = true"/>                                                    

        <div v-if="getListDataOptions.length > 1" 
             v-for="list in getListDataOptions" :key="list.id">
                        
            <div :class="[ listSelected.id == list.id ? 
                        'list-entry-card-selected' : 'list-entry-card']" 
              >  
              
                <!-- editing mode -->
                <div v-if="currentEditListId && currentEditListId === list.id" class="flex-1">
                
                    <UpdateListForm :list="list"
                                    @endListEdit="endListEdit"  />

                </div>

                <!-- list mode -->
                <div v-else class="flex w-full gap-3 items-stretch h-full"
                     @click="changeSelectedList(list)" >                                 

                    <div class="flex-grow flex-shrink-0 basis-0 text-left">
                        {{ list.name }}
                    </div>
                  
                    <button v-if="list.id !==0" @click.stop="editList($event, list)">
                        <i class="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button @click.stop="confirmDelete(list)"                          
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
    import DBService from "@/Services/DBService"
    import { useTodoListStore } from '@/Stores/todoListStore'   
    import { storeToRefs } from 'pinia'
    import { ref, computed } from 'vue';    
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

    const {  listSelected, getListDataOptions, getListCount } = storeToRefs(todoListStore);  
            
    const changeSelectedList = (newList) => {
        todoListStore.setListSelected(newList)  
        emits('new-list-selected')
    }    

    const currentEditListId = ref(0);

    const noLists = computed(() => getListCount.value === 0)
   
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
           await DBService.deleteList(list.id);          
        } catch (error) {
            toast.add({severity:'error', 
                    summary: 'Error!',                              
                    detail: `Unable to delete ${list.name}`                                     
            });  
            return
        }

        // Update UI and show success toast after successful delete
        todoListStore.deleteList(list.id) 

        toast.add({severity:'success', 
            summary: 'Success!',
            detail: `The ${list.name} list has been deleted`, 
            life: 3000
        });
    };
    
</script>

<style scoped>

    @media (max-width: 767px) {
        .screen-width-section {
            max-width: 50%;    
        }
    }

</style>