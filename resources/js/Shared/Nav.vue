<template>
    <nav class="bg-blue-950 text-white py-4 px-8 flex justify-between">
        <ul class="main-nav">
            <li>Lara Todos</li>
        </ul>
        <div v-if="!username" class="flex gap-4">
            <Link href="#">Register</Link>
            <Link href="#">Login</Link>
        </div>   
        <div v-if="username" class="flex gap-4">
            <div>Welcome {{ username }}</div>
            <button @click="logout">
                    Log out
            </button>          
        </div>               
    </nav> 
</template>

<script setup>

import axios from 'axios'
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';

const { props } = usePage();
const username = computed(() => props.auth.username);
console.log(props.auth.username)


const logout = () => {
    axios.post('/logout')
    .then(response => {
        if (response.data.success) {     
            window.location.href = '/';
          
        }
    })
    .catch(error => {
        console.error("Logout failed", error);                  
    });   
}

</script>
