<template>
  
   <div id="app" class="bg-gradient-to-b from-sky-400 to-sky-700 
                        text-white w-full min-h-screen">
        <header>     
            <Nav />
        </header>
    <main >
        <!-- <div v-if="flash.message" class="flash-message">{{ flash.message }}</div> -->
        <slot></slot>        
    </main> 

    <Toast position="top-center" />  

   </div> 
</template>

<script setup>
    import Nav from '@/Shared/Nav.vue'
    import Toast from 'primevue/toast';
//    import { usePage } from '@inertiajs/vue3'
  
//    import { computed } from 'vue'

 //   const { props } = usePage()
 //   const flash = props.value.flash;
 //   console.log(page.props.value)

</script>
