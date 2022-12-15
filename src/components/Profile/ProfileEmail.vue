<template>
    <div v-if="profileStore.newEmail" class="flex flex-col bg-[#171623] w-full h-screen fixed">
        <div class="flex justify-center items-center h-20 bg-[#24222F]">
            <div class="flex justify-between w-[20rem]">
                <TheBurger />
            </div>
        </div>

        <div class="flex items-center justify-center py-2">
            <div @click="handleBack" class="cursor-pointer w-[20rem] py-5">
                <img src="@/assets/back.svg" class="w-5" alt="back-svg" />
            </div>
        </div>

        <div v-if="!makeChanges && !newEmail" class="flex flex-col items-center">
            <div class="flex flex-col items-center bg-[#24222F] w-[23rem]">
                <div class="flex flex-col mt-[1.5rem] w-[20rem]">
                    <div>
                        <p class=" text-white text-sm">{{ $t("profile.primary_email") }}</p>
                        <div class="flex flex-col relative mt-3 border-b-[0.1rem] bg-[#203856] border-[0.1rem] border-[#179315ed] rounded">
                            <p class="text-white ml-4 py-1">
                                {{userStore?.user?.email}}
                            </p>
                            <img class="flex absolute ml-[16.3rem] mt-[0.5rem] justify-end w-4" src="@/assets/greentick.svg" alt="green-tick" />
                        </div>
                        <div class="w-[20rem] mt-5 border-b-[0.1rem] border-gray-500"></div>
                    </div>
                </div>
            </div>

            <div v-if="userStore?.user?.emails?.length > 0" v-for="email in userStore.user.emails" class="flex flex-col items-center bg-[#24222F] w-[23rem] py-2">
                <div class="flex flex-col w-[20rem]">
                    <div>
                        <div class="flex flex-col relative h-3">
                            <div>
                                <p class="text-white mt-[0.3rem]">
                                    {{email.email}}
                                </p>
                            </div>
                            <div class="flex mt-3 w-full">
                                <div v-if="!email.email_verified_at" class="flex w-40">
                                    <img src="@/assets/unverified.svg" alt="unverified-icon"/>
                                    <p class="py-1 px-2 text-white">{{ $t("profile.unverified") }}</p>
                                </div>
                                <div v-if="email.email_verified_at" class="border-[0.1rem] border-white rounded">
                                    <input @click="handlePrimary" :value="email.email" class="cursor-pointer absolute opacity-0 w-[9.3rem] pb-2"/>
                                    <p class="py-1 px-2 text-white">{{ $t("profile.make_this_primary") }}</p>
                                </div>
                                <input @click="handleDelete" :value="email.id" class="cursor-pointer bg-red-500 absolute mt-2 ml-[15rem] opacity-0 w-16"/>
                                <p class="flex ml-[8rem] mt-[0.4rem] justify-end w-4 text-gray-300">{{$t ("profile.remove") }}</p>
                            </div>
                        </div>
                        <div class="mt-20 w-[20rem] border-b-[0.1rem] border-gray-500"></div>
                    </div>
                </div>
            </div>

            <div class="flex flex-col items-center w-[23rem] bg-[#24222F] pb-10">
                <div class="w-[20rem]">
                    <div>
                        <p class="pt-2 text-white text-sm">{{ $t("profile.add_new_email") }}</p>
                    </div>
                    <div @click="handleNewEmail" class="flex justify-center cursor-pointer items-center mt-4 border-[0.1rem] h-8 w-80 rounded">
                        <img src="@/assets/add.svg" alt="add-icon" />
                        <p class="text-white ml-2">{{ $t("profile.add") }}</p>
                    </div>
                </div>
                
            </div>
        </div>
        <!--  -->
        <Form v-if="newEmail && !makeChanges" @submit="handleChanges" class="flex flex-col bg-[#171623] w-full h-screen fixed mt-32">
            <div class="flex">
                <div class="flex flex-col items-center mt-[3rem] w-full">
                    <div class="flex flex-col w-[23rem] pt-7 pb-20 bg-[#24222F] rounded">
                        <label class="text-white mt-10 ml-6" for="new_email">{{ $t("profile.add_new_email") }}</label>
                        <div class="flex w-full justify-center relative">
                            <Field name="email" rules="required|email" v-model="emailValue" class="bg-[#CED4DA] w-[20rem] h-[3rem] rounded px-3 mt-2 outline-none" />
                            <ErrorMessage name="email" class="absolute ml-[2.9rem] text-[#F15524] mt-[4.2rem] w-full"/>
                            <p class="absolute ml-[2.9rem] text-[#F15524] mt-[5rem] w-full">{{errorValue}}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-center items-center mt-20">
                <div @click="handleCancel" class="text-[1.1rem] cursor-pointer">
                    <p class="text-[#5B5C67] hover:text-[#525356] active:text-[#909092]">{{ $t("profile.cancel") }}</p>
                </div>
                <div class="flex items-center justify-center ml-[11rem] bg-[#E31221] hover:bg-[#CC0E10] active:bg-[#B80D0F] h-10 w-[5rem] rounded">
                    <button type="submit" class="flex text-white">{{ $t("profile.add") }}</button>
                </div>
            </div>
        </Form>
        <div v-if="makeChanges">
                <div class="flex flex-col h-[12rem] mt-20">
                    <div v-if="loading" class="flex items-center w-screen h-screen z-10 mt-20">
                        <div class="flex justify-center fixed w-screen h-screen backdrop-blur-sm"></div>        
                            <div role="status" class="absolute ml-44">
                                <svg aria-hidden="true" class="mr-2 w-14 h-14 md:h-24 md:w-24 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                            </div>
                    </div> 
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
        <!--  -->
    </div>
</template>

<script setup>
import TheBurger from '@/components/General/TheBurger.vue';
import { Field, ErrorMessage, Form } from 'vee-validate';
import axiosInstance from "@/config/axios/index.js";
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useProfileStore } from "@/stores/profile";
import { useUserStore } from "@/stores/userStore.js";

const router = useRouter()
const profileStore = useProfileStore();
const makeChanges = ref(false);
const userStore = useUserStore();
const newEmail = ref(false);
const errorValue = ref();
const emailValue = ref();
const loading = ref(false);

const handleNewEmail = () => {
    newEmail.value = true;
}

const handleBack = () => {
    profileStore.newEmail = false;
}
const handleChanges = () => {
    makeChanges.value = true;
}
const handleCancel = () => {
    makeChanges.value = false;
    profileStore.newUsername = false;
    profileStore.newPassword = false;
    profileStore.newEmail = false;
    router.push({name: 'profile'})
}

const handlePrimary = (e) => {

    axiosInstance
        .post("update-profile", {
            email: e.target.value
        })
        .then((response) => {
          userStore.getUser();
        })
        .catch((error) => {
});
}

const handleDelete = (e) => {
    axiosInstance
        .post('delete-email/'+e.target.value)
        .then((response) => {
          userStore.getUser();
        })
        .catch((error) => {
        });
}

const handleSubmit = () => {
    loading.value = true;

    axiosInstance
        .post("add-email", {
            email: emailValue.value
        },)
        .then((response) => {
          userStore.getUser();
          loading.value = false;
          makeChanges.value = false;
          profileStore.newUsername = false;
          profileStore.newPassword = false;
          profileStore.newEmail = false;
          profileStore.emailSuccess = true;
          router.push({name: 'profile'});
        })
        .catch((error) => {
              loading.value = false;
            profileStore.emailSuccess = false;
            errorValue.value = error.response.data.message
            makeChanges.value = false;
            newEmail.value = true;
    });
}

</script>