<template>  
    <Layout>
        <div class="max-w-sm mx-auto mt-8 bg-white p-4 ">
            <h1 class="text-3xl mb-4 text-blue-950">Login</h1>
            <form @submit.prevent="submit" class="text-gray-700" >

                <div class="mb-6">
                    <label class="block mb-2 font-bold text-xs text-gray-700">
                    Email
                    </label>
                    <input class="border  p-2 w-full"
                            type="text" 
                            v-model="form.email"/>
                    <div v-if="form.errors.email" class="text-red-500 text-xs mt-1">
                    {{ form.errors.email }}
                    </div>
                </div>
                <div class="mb-6">
                    <label for="password"
                    class="block mb-2  font-bold text-xs text-gray-700">
                    Password
                    </label>
                    <input class="border  p-2 w-full"
                            type="password"
                            v-model="form.password"/>
                    <div v-if="form.errors.password" class="text-red-500 text-xs mt-1">
                    {{ form.errors.password }}
                    </div>
                </div>  
                <div class="mb-6">
                    <button type="submit"
                            class="bg-orange-500 text-white rounded py-2 px-4 w-full
                                    hover:bg-orange-600" :disabled="form.processing" >Login
                    </button>
                </div>  
                 
            </form>  
            <div><span class="text-blue-950">No account? </span>
                 <Link class="text-blue-500 underline" href="/login">
                    Register to keep track of your todos!
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
        email: '',
        password: ''
    })

    const submit = () => form.post(route('authenticate'));

</script>