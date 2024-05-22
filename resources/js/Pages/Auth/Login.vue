<template>  
    <Layout>
        <div class="max-w-sm mx-auto mt-8 bg-white p-4 ">
            <h1 class="text-3xl mb-4 text-blue-950">Login</h1>
            <form @submit.prevent="submit" class="text-gray-700" >

                <div class="mb-6">
                    <label class="block mb-2 font-bold text-xs text-gray-700">
                    Email
                    </label>
                    <input class="border-2 p-2 w-full focus:outline-none
                                focus:border-sky-600 rounded"
                            type="text" 
                            v-model="form.email"
                            @input="handleUserInput"/>
                    <div v-if="form.errors.email" class="text-red-500 text-xs mt-1">
                       {{ form.errors.email }}
                    </div>
                </div>
                <div class="mb-6">
                    <label for="password"
                    class="block mb-2 font-bold text-xs text-gray-700">
                    Password
                    </label>
                    <input class="border-2 p-2 w-full  focus:outline-none
                                focus:border-sky-600 rounded"
                            type="password"
                            v-model="form.password"
                            @input="handleUserInput"/>
                    <div v-if="form.errors.password" class="text-red-500 text-xs mt-1">
                    {{ form.errors.password }}
                    </div>
                </div>  
                <div class="mb-6">
                    <button type="submit"
                            class="primary-btn w-full"
                             :disabled="form.processing || serverError" >Login
                    </button>
                </div>  
                 
            </form>  
            <!-- <div><span class="text-blue-950">No account? </span>
                <Link class="text-blue-500 underline" :href="route('register.show')">
                    Register to keep track of your todos!
                </Link>

            </div>        -->
        </div>
    </Layout>
</template>


<script>

</script>

<script setup>
    import { useForm } from "@inertiajs/vue3"
    import { usePage } from '@inertiajs/vue3'
    import { ref, watch } from 'vue'
    import { useHandleErrors } from '@/Composables/useHandleErrors';
    import { useToast } from 'primevue/usetoast'

    import Layout from "@/Shared/Layout.vue"

    let form = useForm({
        email: '',
        password: ''
    })

    const page = usePage()

    const toast = useToast()

    const serverError = ref(false)

    const { handleAuthErrors,  
            hideErrorToast } = useHandleErrors(toast)  

    const handleUserInput = () => {
        if (serverError) {
            hideErrorToast()
            serverError.value = false
        }
    }

    watch(() => page.props, (newProps) => {
        if (newProps.auth_error.message) { 
            handleAuthErrors(newProps.auth_error.message)
            serverError.value = true
        }
    }, { deep: true });    

    const submit = () => form.post(route('authenticate'));

</script>