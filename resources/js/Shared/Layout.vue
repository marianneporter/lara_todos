<template>
  
   <div id="app" class="bg-gradient-to-b from-sky-400 to-sky-700 
                        text-white w-full min-h-screen">
        <header>     
            <Nav />
        </header>
    <main >       
        <slot></slot>        
    </main> 

    <Toast position="top-center" />  
    <ConfirmDialog></ConfirmDialog>

   </div> 
</template>

<script setup>
    import Nav from '@/Shared/Nav.vue'
    import Toast from 'primevue/toast';
    import ConfirmDialog from 'primevue/confirmdialog'

</script>
