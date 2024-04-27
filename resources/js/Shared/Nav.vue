<template>
    <nav class="nav bg-blue-950 text-white flex justify-between px-4">  <!-- relative container for nav -->   
          
            <div class="title-nav w-full lg:w-auto flex-1 flex justify-between ">
                <h3 class="text-xl -mt-0.5 h-full pt-[0.7rem] pr-3">Lara Todos</h3>
                <Link :href="route('dashboard')" 
                       class="hidden lg:block ml-4 hover:bg-blue-900 py-3 px-2">
                       Dashboard
                </Link>
                <Link :href="route('about')" 
                       class="hidden lg:block hover:bg-blue-900 py-3 px-2 ">
                          About
                </Link>
                <div class="py-3">
                    <button @click="menuOpen = !menuOpen"
                            :class="{ 'open': menuOpen }" class="lg:hidden hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

            </div>
              
            <div class="auth-options bg-blue-950"
                :class="{'auth-options-visible': menuOpen, 
                        'auth-options-not-visible': !menuOpen }">
                <Link :href="route('dashboard')" 
                       class="block lg:hidden ml-4 hover:bg-blue-900 py-2 px-1">
                            Dashboard
                </Link>
                <Link :href="route('about')" 
                       class="block lg:hidden hover:bg-blue-900 py-2 px-1 ">
                            About
                </Link>
                <div class="bg-white h-[0.1rem] w-32 mx-auto mt-2"></div>
                <div v-if="!username" class="flex flex-col lg:flex-row gap-4">
                    <Link :href="route('register.show')" 
                          class="block py-3 px-2 hover:bg-blue-900">
                            Register
                    </Link>
                    <Link :href="route('login')" 
                          class="block py-3 px-2 hover:bg-blue-900">
                            Login
                    </Link>
                </div>   
                <div v-else class="flex flex-col lg:flex-row gap-4">
                    <div class="hidden lg:block py-3">Welcome {{ username }}</div>
                    <button @click="logout" class="block pt-3 pb-6 px-2 hover:bg-blue-900">
                            Log out
                    </button>          
                </div>                
            </div>
    </nav> 
</template>

<script setup>

import axios from 'axios'
import { computed, ref } from 'vue';
import { usePage } from '@inertiajs/vue3';

const { props } = usePage();
const username = computed(() => props.auth.username);

const menuOpen = ref(false);

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

<style scoped> 

    /* mobile nav styles */
    @media (max-width: 1023px) {

        .nav {
           position: relative; /* Ensures relative stacking context for children */
        }

        .title-nav {
            z-index: 100; 
            position: relative; 
        }

        .auth-options {
            position: absolute;
            right: 0;
            left: 0;
            transition: top 0.5s ease, opacity 0.1s ease 0.5s, visibility 0.1s 0.6s; 
            z-index: 50; 
            display: block;  
            text-align: center;      
        }

        .auth-options-visible {
            top: 100%;
            opacity: 1;
            transition-delay: 0s;
            visibility: visible;
        }

        .auth-options-not-visible {
            top: -6rem; 
            opacity: 0;
            visibility: hidden;
        }

        /* Style for the hamburger button */
        .hamburger {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            width: 30px;
            height: 25px;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 0;
            box-sizing: border-box;
            outline: none;
        }

        .hamburger span {
            display: block;
            width: 100%;
            height: 2px;
            background-color: white;
            border-radius: 10px;
            transition: all 0.3s linear;
            position: relative;
            transform-origin: 3px;
        }
 
        .hamburger.open span:first-child {
            transform: rotate(45deg);
            background-color: #fff; 
        }

        .hamburger.open span:nth-child(2) {
            opacity: 0;
            transform: translateX(20px); 
        }

        .hamburger.open span:last-child {
            transform: rotate(-45deg);
            background-color: #fff; 
        }
    }

</style>
