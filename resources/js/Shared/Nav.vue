<template>
    <nav class="nav bg-blue-950 text-white flex justify-between px-4 h-12">    
          
            <div class="title-nav w-full lg:w-auto flex-1 flex justify-between items-center lg:justify-start">
                <h3 class="text-xl lg:flex items-center">Lara Todos</h3>
                <Link :href="route('dashboard')" 
                       class="hidden lg:flex items-center h-full ml-8  hover:bg-blue-900">
                       Dashboard
                </Link>
                <Link :href="route('about')" 
                       class="hidden lg:flex items-center h-full px-4 hover:bg-blue-900">
                          About
                </Link>
                <div >
                    <button @click="toggleMenu"
                            :class="{ 'open': menuOpen }" class="lg:hidden hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

            </div>
              
            <div class="auth-and-mobile bg-blue-950"
                :class="{'auth-and-mobile-visible': menuOpen, 
                        'auth-and-mobile-not-visible': !menuOpen }">
                <Link :href="route('dashboard')" 
                       class="block lg:hidden mx-auto hover:bg-blue-900 py-2 px-1 w-32">
                            Dashboard
                </Link>
                <Link :href="route('about')" 
                       class="block lg:hidden mx-auto hover:bg-blue-900 py-2 px-1 w-32">
                    About
                </Link>
                <div class="lg:hidden bg-white h-[0.1rem] w-32 mx-auto mt-2"></div>

                <div v-if="!username" class="flex flex-col lg:flex-row items-stretch gap-4 h-full">
                    <!-- <Link :href="route('register.show')" 
                          class="block px-2 hover:bg-blue-900 lg:flex lg:items-center">
                            Register
                    </Link> -->
                    <Link :href="route('login')" 
                          class="block px-2 hover:bg-blue-900 lg:flex lg:items-center">
                            Login
                    </Link>
                </div>   
                <div v-else class="flex flex-col lg:flex-row lg:items-center gap-4 h-full">
                    <div class="hidden lg:block">Welcome {{ username }}</div>
                    <button @click="logout" class="block  w-32 h-full mx-auto mt-2 mb-5 lg:my-0 px-2 py-2 hover:bg-blue-900">
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

const toggleMenu = () => {
    if (menuOpen.value) {  
        setTimeout(() => menuOpen.value = false, 500);
    } else {
        menuOpen.value = true;
    }
}

const logout = async () => {
    try {
        const response = await axios.post('/logout');
        if (response.data.success) {  
            if (menuOpen.value) {              
                menuOpen.value = false;
                setTimeout(() => window.location.href = '/', 500); // Delay redirection
            } else {
                window.location.href = '/';
            }     
        }
    } catch (error) {
        console.error("Logout failed", error);                  
    }   
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

        .auth-and-mobile {
            position: absolute;
            right: 0;
            left: 0;
            transition: top 0.5s ease, opacity 0.5s ease; /* Standardized transition */
            z-index: 50; 
            display: block;  
            text-align: center;
        }

        .auth-and-mobile-visible {
            top: 100%;
            opacity: 1;
            visibility: visible;
        }

        .auth-and-mobile-not-visible {
            top: -6rem; 
            opacity: 0;
            visibility: hidden;
            transition: top 0.5s ease, opacity 0.5s ease, visibility 0s 0.5s; 
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
