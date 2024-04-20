<template>  
    <Layout>
        <div class="max-w-sm mx-auto mt-8 bg-white p-4 ">
            <h1 class="text-3xl mb-4 text-blue-950">Register</h1>
            <form @submit.prevent="submit" class="text-gray-700" >

                <div class="mb-3">
                    <label class="block mb-1 font-bold text-xs text-gray-700">
                    Name
                    </label>
                    <input class="border  p-2 w-full"
                            type="text" 
                            v-model="form.name"/>
                    <div v-if="form.errors.name" class="text-red-500 text-xs mt-1">
                    {{ form.errors.name }}
                    </div>
                </div>

                <div class="mb-3">
                    <label class="block mb-1 font-bold text-xs text-gray-700">
                    Email
                    </label>
                    <input class="border  p-2 w-full"
                            type="text" 
                            v-model="form.email"/>
                    <div v-if="form.errors.email" class="text-red-500 text-xs mt-1">
                    {{ form.errors.email }}
                    </div>
                </div>

                <div class="mb-3">
                    <label for="password"
                    class="block mb-1 font-bold text-xs text-gray-700">
                    Password
                    </label>
                    <input class="border  p-2 w-full"
                            type="password"
                            v-model="form.password"/>
                    <div v-if="form.errors.password" class="text-red-500 text-xs mt-1">
                    {{ form.errors.password }}
                    </div>
                </div>  

                <div class="mb-3">
                    <label for="confirmPassword"
                           class="block mb-1 font-bold text-xs text-gray-700">
                        Confirm Password
                    </label>
                    <input class="border p-2 w-full"
                            type="password"
                            v-model="form.password_confirmation"/>
                    <div v-if="form.errors.password_confirmation" class="text-red-500 text-xs mt-1">
                    {{ form.errors.password_confirmation }}
                    </div>
                </div>  

                <div class="mb-3">
                    <button type="submit"
                            class="primary-btn w-full"
                             :disabled="form.processing" >Register
                    </button>
                </div>  
            </form>  

            <div><span class="text-blue-950">Already have an account? </span>
                <Link class="text-blue-500 underline" :href="route('login')">
                    Login
                </Link>

            </div>       
        </div>
    </Layout>
</template>


<script>

</script>

<script setup>
    import { useForm } from "@inertiajs/vue3"
    import Layout from "@/Shared/Layout.vue"

    let form = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation : ''

    })

    const submit = () =>{
        // if (form.password !== form.password_confirmation ) {
        //     form.errors.password_confirmation  = 'Passwords do not match';
        //     return;
        // }

        form.post(route('register.submit'));       
    }


</script>