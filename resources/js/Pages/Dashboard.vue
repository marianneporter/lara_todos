<template>
      <Layout>
            <div class="max-w-6xl mx-auto mt-3">
                <h1>Welcome to the Laravel Todo List App</h1>
             
                <div class="flex w-full text-black gap-4 bg-fuchsia-300 min-h-full">
                    <section class="flex-1 section-card ">
                        <div>
                            My Lists
                        </div>
                    </section>
                    <section class="flex-1 section-card">My Tasks</section>
                </div>

            </div>
 
      </Layout>

</template>

<script setup>
    import Layout from '@/Shared/Layout.vue'    
    import { onMounted } from 'vue'
    import { usePage } from '@inertiajs/vue3'
 
  
    const props = defineProps({
        message: String,
        todoLists: Object
    })

    console.log(props.todoLists)



    // onMounted(() => {
    //   console.log('Component is now mounted!');
    //   console.log(todoLists)
    // });


   

</script>