<template>
    <div @click="$router.push({name: 'profile'})" class="flex justify-center fixed w-screen h-screen backdrop-blur-sm z-40"></div>        
    <div class="hidden lg:flex flex-col items-center w-full fixed mt-[15%] z-50">
        <Form @submit="handleSubmit"  class="w-[40%] bg-[#11101A]">
            <div v-if="loading" class="fixed flex items-center w-screen h-screen z-10">
                <div class="flex justify-center fixed w-screen h-screen backdrop-blur-sm"></div>        
                    <div role="status" class="absolute md:ml-[17%] md:mb-[40rem]">
                        <svg aria-hidden="true" class="mr-2 w-14 h-14 md:h-24 md:w-24 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                    </div>
            </div> 
            <div class="border-b border-b-[#24222F] w-full py-6">
                <p class="text-2xl ml-10 text-white">
                    {{$t("profile.add_new_email")}}
                </p>
            </div>
            <div class="flex flex-col pb-5">
                <div class="flex flex-col items-center w-full">
                    <div class="flex flex-col w-[90%] h-[10rem] py-15 rounded">
                        <label class="text-white mt-10 text-xl" for="email">{{ $t("profile.new_email") }}</label>
                        <div class="flex flex-col w-full justify-center">
                            <Field rules="required|email" name="email" class="bg-[#CED4DA] w-full h-[3rem] rounded px-3 mt-2 outline-none" />
                            <ErrorMessage class="flexmt-[3rem] text-lg mt-1 text-[#F15524]" name="email" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-end items-center pb-10 mr-5">
                <div class="flex">
                    <div @click="$router.push({name: 'profile'})" class="cursor-pointer flex items-center text-[1.1rem] h-10 mr-3">
                        <p class="text-[#5B5C67] hover:text-[#525356] active:text-[#909092]">{{ $t("profile.cancel") }}</p>
                    </div>
                    <div class="flex items-center justify-center ml-2 bg-[#E31221] h-10 w-[5rem] rounded">
                        <button type="submit" class="flex py-2 px-4 text-white">{{ $t("profile.add") }}</button>
                    </div>
                </div>

            </div>
        </Form>
        
</div>
</template>

<script setup>
import { Field, ErrorMessage, Form } from 'vee-validate';
import { ref } from 'vue';
import axiosInstance from "@/config/axios/index.js";
import { useRouter } from 'vue-router'
import { useUserStore } from "@/stores/userStore.js";
import { useProfileStore } from "@/stores/profile";


const profileStore = useProfileStore();
const loading = ref(false);
const userStore = useUserStore();
const router = useRouter()

const handleSubmit = (values, actions) => {
    console.log(values.email)
    loading.value = true;

    axiosInstance
        .post("add-email", {
            email: values.email
        })
        .then((response) => {
          loading.value = false;
          profileStore.emailSuccess = true;
          console.log(response);
          userStore.getUser();
          router.push({name: 'profile'})
        })
        .catch((error) => {
          console.log(error);
          loading.value = false;
          profileStore.emailSuccess = false;
          const errors = error.response.data.errors;
          for(const key in errors){
            actions.setFieldError(key,errors[key]);
        }
        });
}
</script>