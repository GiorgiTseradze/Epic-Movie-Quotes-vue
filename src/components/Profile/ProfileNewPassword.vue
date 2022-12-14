<template>
    <div v-if="profileStore.newPassword" class="flex flex-col bg-[#171623] w-full h-screen fixed overflow-hidden"> 
            <div class="flex justify-center items-center h-20 bg-[#24222F]">
                <div class="flex justify-between w-[20rem]">
                    <TheBurger />
                </div>
            </div>
            <Form v-if="!makeChanges" @submit="handleChanges">
                <div class="flex w-full justify-center mt-10">
                    <div class="flex flex-col bg-[#24222F] w-full pt-5 pb-14">
                        <div>
                            <div class="flex justify-center w-full">
                                <div class="flex flex-col mt-4 w-[18rem] bg-[#171623] border-[0.1rem] rounded border-gray-600">
                                    <div class="mt-6 ml-6">
                                        <p class="text-white">{{$t("profile.passwords_should_contain")}}:</p>
                                    </div>
                                    <div class="flex mt-4 ml-6">
                                        <img v-if="passwordValue?.length < 8" src="@/assets/greycirc.svg"/>
                                        <img v-if="passwordValue?.length >= 8" src="@/assets/greencirc.svg"/>
                                        <p :class="passwordValue?.length >= 8 ? 'text-white' : ''" class="ml-2 text-gray-500">{{ $t("profile.8_or_more_characters") }}</p>
                                    </div>
                                    <div class="flex mt-1 ml-6 pb-4">
                                        <img v-if="passwordValue?.length < 8 || passwordValue?.length > 15" src="@/assets/greycirc.svg"/>
                                        <img v-if="passwordValue?.length <= 15 && passwordValue?.length >=8" src="@/assets/greencirc.svg"/>
                                        <p :class="passwordValue?.length <= 15 && passwordValue?.length >=8 ? 'text-white' : ''" class="ml-2 text-gray-500">{{ $t("profile.15_lowercase_characters") }}</p>
                                    </div>
                                </div>
                            </div>
                        
                            <div class="flex flex-col items-center mt-[2rem] w-full">
                                <div class="flex flex-col w-[20rem]">   
                                    <label class="text-white" for="password">{{ $t("profile.new_password")}}</label>
                                    <div class="flex w-full justify-center">
                                        <Field name="password" v-model="passwordValue" type="password" rules="required|min:8|max:15|lowalphanumeric" class="bg-[#CED4DA] w-full h-[3rem] rounded px-3 mt-2 outline-none" />
                                    </div>
                                </div>
                                <div class="flex flex-col w-[20rem] mt-6">
                                    <label class="text-white" for="password_confirmation">{{ $t("profile.confirm_new_password") }}</label>
                                    <div class="flex w-full justify-center relative">
                                        <Field name="password_confirmation" v-model="passwordConfirm" type="password" class="bg-[#CED4DA] w-full h-[3rem] rounded px-3 mt-2 outline-none" />
                                        <ErrorMessage name="password" class="absolute text-[#F15524] mt-16 w-full"/>
                                        <ErrorMessage name="password_confirmation" class="absolute text-[#F15524] mt-16 w-full"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex justify-center items-center mt-8 w-full">
                    <div class="flex items-center w-[20rem]">
                        <div class="text-[1.1rem]">
                            <p @click="handleCancel" class="cursor-pointer text-[#5B5C67] hover:text-[#525356] active:text-[#909092]">{{ $t("profile.cancel") }}</p>
                        </div>
                        <div class="flex items-center justify-center ml-[11rem] bg-[#E31221] hover:bg-[#CC0E10] active:bg-[#B80D0F] h-10 w-[5rem] rounded">
                                <button type="submit" class="flex text-white">{{ $t("profile.add") }}</button>
                        </div>
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
                                    <div class="flex items-center justify-center mt-4 ml-[9rem] bg-[#E31221] h-10 w-[6rem] rounded">
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
import { Field, ErrorMessage, Form } from 'vee-validate';
import axiosInstance from "@/config/axios/index.js";
import TheBurger from '@/components/General/TheBurger.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useProfileStore } from "@/stores/profile";
import { useUserStore } from "@/stores/userStore.js";

const router = useRouter()
const profileStore = useProfileStore();
const makeChanges = ref(false);
const userStore = useUserStore();

const passwordValue = ref(null);
const passwordConfirm = ref();

const handleChanges = () => {
    makeChanges.value = true;
}

const handleCancel = () => {
    makeChanges.value = false;
    profileStore.newUsername = false;
    profileStore.newPassword = false;
    router.push({name: 'profile'})
}

const handleSubmit = (values, actions) => {
    axiosInstance
        .post("update-profile", {
            password: passwordValue.value,
            password_confirmation: passwordConfirm.value
        },)
        .then((response) => {
          userStore.getUser();
          makeChanges.value = false;
          profileStore.newUsername = false;
          profileStore.newPassword = false;
          profileStore.success = true;
          router.push({name: 'profile'});
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          profileStore.success = false;
          const errors = error.response.data.errors;
          for(const key in errors){
            actions.setFieldError(key,errors[key]);
        }
    });
}
</script>