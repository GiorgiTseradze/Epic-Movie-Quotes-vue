<template>
    <div v-if="profileStore.newUsername" class="flex flex-col bg-[#171623] w-screen h-screen fixed overflow-hidden">
          
        
        <div class="flex justify-center items-center px-9 h-20 bg-[#24222F]">
            <div class="flex justify-between w-[22rem]">
                <TheBurger />
            </div>
        </div>

        <div class="flex items-center justify-center h-[4rem]">
            <div @click="handleBack" class="cursor-pointer w-[20rem]">
                <img src="@/assets/back.svg" class="w-5" alt="back-icon" />
            </div>
        </div>
        <Form v-if="!makeChanges" @submit="handleChanges">
            <div class="flex flex-col h-[12rem]">
                <div>
                    <div class="flex flex-col items-center mt-[3rem] w-full">
                        <div class="flex flex-col w-[23rem] h-max py-15 bg-[#24222F] rounded">
                            <label class="text-white mt-10 ml-6" for="name">{{ $t("profile.add_new_username") }}</label>
                            <div class="flex flex-col w-full items-center pb-20">
                                <Field v-model="nameValue" name="name" :rules="userStore.user.google_id ? 'min:3' : 'required|min:3|max:15|lowalphanumeric'" class="bg-[#CED4DA] w-[20rem] h-[3rem] rounded px-3 mt-2 outline-none" />
                                <ErrorMessage name="name" class="absolute text-[#F15524] mt-16 mr-48"/>
                                <p  class="absolute text-[#F15524] mt-16 mr-48">{{errorValue}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-center items-center mt-20">
                <div @click="handleCancel" class="text-[1.1rem]">
                    <button>
                        <p class="text-gray-300">{{ $t("profile.cancel") }}</p>
                    </button>
                </div>
                <div class="flex items-center justify-center ml-[11rem] bg-[#E31221] hover:bg-[#CC0E10] active:bg-[#B80D0F] h-10 w-[5rem] rounded">
                    <button type="submit" class="flex cursor-pointer px-5 py-2 text-white">{{ $t("profile.add") }}</button>
                </div>
            </div>
        </Form>
            <div v-if="makeChanges">
                <div class="flex flex-col h-[12rem] mt-20">
                    <div class="flex justify-center w-full">
                        <div class="flex flex-col w-[23rem] bg-[#24222F] rounded h-[13rem] items-center">
                            <div class="flex flex-col items-center justify-center mt-[3rem]">
                                <div class="flex flex-col items-center justify-center text-white w-[20rem]">
                                    <p>{{$t("profile.are_you_sure_to_make_changes")}}</p>
                                </div>
                                <div class="flex items-center mt-12 border-t-2 border-gray-600">
                                    <div @click="handleCancel" class="cursor-pointer ml-6 text-[1.1rem] mt-4">
                                        <p class="text-[#5B5C67] hover:text-[#525356] active:text-[#909092]">{{$t("profile.cancel")}}</p>
                                    </div>
                                    <div class="flex items-center justify-center mt-4 ml-[9rem] bg-[#E31221] h-10 w-[6.2rem] rounded">
                                        <button @click="handleSubmit" class="flex text-white">{{$t('profile.confirm')}}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


    </div>
</template>

<script setup>
import { ref } from 'vue'
import axiosInstance from "@/config/axios/index.js";
import TheBurger from '@/components/General/TheBurger.vue';
import { useRouter } from 'vue-router'
import { Field, ErrorMessage, Form } from 'vee-validate';
import { useUserStore } from "@/stores/userStore.js";
import { useProfileStore } from "@/stores/profile";

const profileStore = useProfileStore();
const userStore = useUserStore();
const router = useRouter()
const nameValue = ref('');
const makeChanges = ref(false);
const errorValue = ref('');

const handleCancel = () => {
    makeChanges.value = false;
    profileStore.newUsername = false;
    router.push({name: 'profile'})
}
const handleChanges = () => {
    makeChanges.value = true;
}

const handleBack = () => {
    profileStore.newUsername = false;
}

const handleSubmit = (values, actions) => {
    const data = {};
    if(nameValue.value !== userStore.user.name){
        data['name'] = nameValue.value;
    } else {
        errorValue.value = "Username already exists"
        makeChanges.value = false;
    }

    axiosInstance
        .post("update-profile", data)
        .then((response) => {
          userStore.getUser();
          makeChanges.value = false;
          profileStore.newUsername = false;
          profileStore.success = true;
          router.push({name: 'profile'});
        })
        .catch((error) => {
          profileStore.success = false;
          const errors = error.response.data.errors;
          for(const key in errors){
            actions.setFieldError(key,errors[key]);
        }
        });
}

</script>