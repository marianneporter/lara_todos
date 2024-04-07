<template>
    <transition name="scale">
        <form v-if="isFormVisible" @submit.prevent="addNewList" 
            class=" bg-white my-2 flex justify-between items-center
                   rounded-lg overflow-hidden">

            <div class="relative flex-grow">
                <input type="text" 
                    class=" py-3 pl-4 pr-2 rounded-l-lg border-r-0 
                            focus:outline-none focus:ring-0" 
                    placeholder="New List Name">

                <button type="button" @click="closeForm"
                    class="absolute right-2 top-1/2 transform -translate-y-1/2 
                        bg-transparent text-gray-700 hover:text-gray-900 
                        focus:outline-none p-1 rounded-full">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>


            <button class="px-6 py-3 bg-orange-500 text-white focus:outline-none
                         hover:bg-orange-600 transition-colors">Add New List
            </button>


       </form>      
    </transition>
    
</template>

<script setup>

    import { ref } from 'vue'
    
    const props= defineProps({
        formVisible: Boolean
    }) 

    const emits = defineEmits(['formClosed'])

    const isFormVisible = ref(false)
    
    const makeFormVisible = () => {
      isFormVisible.value = true;     
    };
    
    const closeForm = () => {
      isFormVisible.value = false; 
      emits('formClosed')
    };


   // Expose the toggleFormVisibility so it can be accessed from dashboard
    defineExpose({
        makeFormVisible
    })


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