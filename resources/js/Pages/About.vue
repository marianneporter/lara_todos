<template>
    <Layout>
        <div class="about-container">
            <div class="max-w-4xl mx-auto mt-6 text-blue-950 text-center
                  bg-white p-4 rounded-lg shadow-lg">
                <h1 class="text-lg font-bold">Welcome to this Todo List Demonstration App</h1>

                <h3 class="font-medium mt-4">My name is Marianne Porter, this app demonstates some of what I have learned
                    on my learning journey in web development</h3>
                <p class="mt-2">The app is written in Laravel and Vue, 
                    using inertia that glues both of these together</p>
                <p class="mt-2">Users can create collections of todo lists. Each of the todo list collections
                contain all of the todo tasks for the collection</p>
           </div>
        </div>

    </Layout>
</template>
<script setup>
   import Layout from '@/Shared/Layout.vue'
</script>