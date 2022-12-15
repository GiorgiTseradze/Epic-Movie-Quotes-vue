<template>

    <div class="flex flex-col bg-[#171623] w-full h-screen">
        <div class="flex justify-center">
            <router-view></router-view>
        </div>

        <div class="flex justify-center items-center h-20 w-full bg-[#24222F]">
                <div class="flex items-center w-[22.3rem] lg:w-full">
                    <div class="flex justify-between items-center h-12 lg:h-[5.3rem] w-full ">
                        <TheBurger class="ml-2" />
                        <div class="flex mr-2 lg:hidden">
                            <div class="flex">
                                <TheNotification />
                            </div>
                        </div>

                        <div class="hidden lg:flex w-full justify-between">
                            <div class="flex items-center text-[#DDCCAA] text-medium font-bold ml-20">
                            MOVIE QUOTES
                            </div>
                            <div class="flex items-center">
                                <div>
                                    <TheNotification />
                                </div>
                                <div class="flex flex-col px-7">
                                    <div>
                                        <div @click="handleLang" class="flex items-center cursor-pointer">
                                            <p class="text-white">{{i18n.global.locale === 'en' ? "ENG" : "KA"}}</p>
                                            <img class="w-3 ml-2" src="@/assets/down-arrow.svg" />
                                        </div>
                                    </div>

                                    <div v-if="lang" class="text-white bg-[#24222F] fixed mt-8 rounded">
                                        <div class="pr-5 pb-2 border-b-[0.06rem] border-[#CED4DA]">
                                            <div @click="changeLangEn">ENG</div>
                                        </div>
                                        <div class="py-2">
                                            <div @click="changeLangKa">KA</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex justify-center items-center text-white border-[0.06rem] p-2 mr-10 rounded w-24">
                                    <form @click="handleLogout" :action="url" class="cursor-pointer" >
                                        <div>{{$t("auth.log_out")}}</div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        <div class="flex lg:w-full lg:bg-[#181624]">
            <div class="hidden lg:flex flex-col ml-20 h-full lg:w-1/4">
                <div class="flex mt-8 w-[16rem] ml-3">
                    <div :class="routeName == 'profile' ? 'border-2 border-red-300 w-[4.2rem] h-[4.2rem] rounded-full' : ''">
                        <img class="rounded-full w-16 h-16 object-cover" :src="userStore.user?.thumbnail" />
                    </div>
                    <div class="ml-4">
                        <p class="text-white text-2xl">{{userStore.user?.name}}</p>
                        <p @click="$router.push({name: 'profile'})" class="text-[#CED4DA]">{{ $t("texts.edit_your_profile")}}</p>
                    </div>
                </div>
                <div @click="$router.push({name: 'newsFeed'})" class="cursor-pointer flex items-center w-[15rem] ml-3 mt-10">
                    <HomeIcon />
                    <p class="ml-4 text-white fill-red-400">{{ $t("texts.news_feed") }}</p>
                </div>
                <div @click="$router.push({name: 'movieList'})" class="cursor-pointer flex items-center w-[15rem] ml-3 mt-10">
                    <CameraIcon />
                    <p class="ml-4 text-white">{{ $t("texts.list_of_movies") }}</p>
                </div>
            </div>

            <div class="w-full">
                <div class="lg:w-[35rem] xl:w-[45rem] 2xl:w-[60rem] bg-[#181624]">
                    <div class="flex items-center justify-center lg:justify-start h-[4rem]">
                        <div @click="$router.push({name: 'newsFeed'})" class="cursor-pointer lg:hidden w-[20rem]">
                            <img src="@/assets/back.svg" class="w-5" />
                        </div>
                        <div class="hidden lg:flex ml-20 xl:ml-10 w-40">
                            <p class="text-white font-medium">My Profile</p>
                        </div>
                        <div class="hidden lg:flex lg:w-[15rem] xl:w-[25rem] 2xl:w-[40rem] justify-center mt-48 mr-20 xl:mr-32">
                            <div class="w-[10.2rem] h-[10.2rem] border-2 border-red-300 rounded-full">
                                <img class="rounded-full w-40 h-40 object-cover" id="output" :src="userImage" />
                            </div>
                            <div v-if="profileStore.success">
                                <UpdatedSuccess />
                            </div>
                            <div v-if="profileStore.emailSuccess">
                                <EmailSuccess />
                            </div>
                        </div>
                    </div>

                <Form @submit="handleSubmit" class="hidden lg:flex flex-col lg:w-[100%] bg-[#24222F] lg:bg-[#11101A] h-max py-10 lg:ml-20 xl:ml-10 lg:mt-20">
                    <div class="flex justify-center lg:mt-8 ml-36 w-full">
                        <label class="cursor-pointer text-white" for="thumbnail">{{$t('profile.upload_new_photo')}}</label>
                        <Field name="thumbnail" id="thumbnail" type="file" @input="loadFile" v-model="userImage" @click="handleEdit" class="invisible cursor-pointer placeholder-white" />
                    </div>
                    <div>
                        <div class="hidden lg:flex flex-col lg:w-[35rem] xl:w-[45rem] 2xl:w-[60rem] lg:ml-10 xl:ml-20">
                            <div class="flex flex-col items-center w-full mt-5">
                                <div class="w-full">
                                    <section class="flex text-white">{{ $t("auth.username") }}</section>
                                </div>
                                <div class="flex flex-col w-full">
                                    <div class="flex w-full">
                                        <div class="flex border-b-2 pb-10 border-[#40414A]">
                                            <Field v-if="editOn" name="name" :rules="userStore.user.google_id ? 'min:3' : 'min:3|max:15|lowalphanumeric'"
                                            class="bg-[#CED4DA] border-2 border-black lg:w-[15rem] xl:w-[20rem] 2xl:w-[30rem] h-[2.3rem] rounded px-3 mt-2 outline-none placeholder-black" 
                                            :class="editOn ? '' : 'focus:outline-none'" :value="userStore.user.name" />
                                            <div v-if="!editOn" name="name" class="flex items-center pointer-events-none bg-white lg:w-[15rem] xl:w-[20rem] 2xl:w-[30rem] h-[2.3rem] rounded px-3 mt-2">
                                                {{userStore.user?.name}}
                                            </div>
                                            <ErrorMessage class="absolute text-[#F15524] mt-12 text-base ml-1" name="name" />
                                        </div>
                                        <div class="ml-6 py-3">
                                            <div @click="handleEdit" class="cursor-pointer text-[#CED4DA]">{{ $t("profile.edit") }}</div>
                                        </div>
                                    </div>
                                    <div v-if="userStore?.user.google_id" class="flex flex-col mt-7">
                                        <p class="text-white">Email</p>
                                        <div class="flex text-black mt-2 break-all items-center pointer-events-none bg-white lg:w-[15rem] xl:w-[20rem] 2xl:w-[30rem] h-[2.3rem] rounded px-3 outline-none">
                                            {{ userStore.user?.email }}
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div v-if="!userStore?.user.google_id" class="flex flex-col items-center w-full mt-10">
                                <div class="w-full">
                                    <section class="flex text-white">{{ $t("auth.email") }}</section>
                                </div>
                                <div class="flex w-full">
                                    <div class="">
                                        <div class="flex text-white border-[0.06rem] border-[#179315ed] break-all items-center pointer-events-none bg-[#132826] lg:w-[15rem] xl:w-[20rem] 2xl:w-[30rem] rounded px-3 mt-2 outline-none" 
                                        ><p class="break-all py-2">{{userStore.user?.email}}</p></div>
                                    </div>
                                    <div class="ml-6 py-3">
                                        <div class="text-[#CED4DA]">{{ $t("profile.primary_email") }}</div>
                                    </div>
                                </div>
                            </div>

                            <div v-if="userStore?.user?.emails?.length > 0" v-for="email in userStore?.user.emails" class="flex flex-col items-center w-full mt-10">
                                <div class="w-full">
                                    <section class="flex text-white">{{ $t("auth.email") }}</section>
                                </div>
                                <div class="flex w-full items-center">
                                        <div class="flex w-full items-center">
                                            <div class="">
                                                <div :class="email.email_verified_at ? 'text-white border-[0.06rem] border-[#179315ed]' : 'bg-[#3D2B1C] border-[0.06rem] border-[#EC9524]'"
                                                class="flex text-white break-all items-center pointer-events-none bg-[#132826] lg:w-[15rem] xl:w-[20rem] 2xl:w-[30rem] rounded px-3 mt-2 outline-none" 
                                                ><p class="break-all py-1">{{ email.email }}</p>
                                                </div>
                                            </div>
                                            <div v-if="!email.email_verified_at" class="ml-6 pr-3 h-5 border-r-[0.06rem] border-[#40414A]">
                                                <div class="text-[#CED4DA]">{{ $t("profile.unverified") }}</div>
                                            </div>
                                            <div v-if="email.email_verified_at" class="cursor-pointer ml-6 pr-3 h-5 border-r-[0.06rem] border-[#40414A]">
                                                <input @click="handlePrimary" :value="email.email" class="cursor-pointer opacity-0 absolute w-[8.2rem]"/>
                                                <div class="text-[#CED4DA]">{{ $t("profile.make_this_primary") }}</div>
                                            </div>
                                            <div class="ml-5 h-5">
                                                <input @click="handleDelete" :value="email.id" class="cursor-pointer opacity-0 absolute w-16"/>
                                                <div class="text-[#CED4DA]">{{ $t("profile.remove") }}</div>
                                            </div>
                                        </div>
                                </div>
                                <ErrorMessage class="text-[#F15524]" name="email" />
                            </div>

                            <div v-if="!userStore.user.google_id" class="flex flex-col lg:w-[15rem] xl:w-[20rem] 2xl:w-[30rem] mt-5 border-b-2 pb-8 border-[#40414A]">
                                <div @click="$router.push({name: 'newEmailDesktop'})" class="flex justify-center cursor-pointer items-center w-52 h-10 border-[0.06rem] rounded">
                                    <img src="@/assets/add.svg" />
                                    <p class="ml-2 text-white">{{ $t("profile.add_new_email")}}</p>
                                </div>
                            </div>

                            <div v-if="!userStore.user.google_id" class="flex flex-col items-center w-full mt-5">
                                <div class="w-full">
                                    <section class="flex text-white">{{ $t("auth.password") }}</section>
                                </div>
                                <div class="flex w-full">
                                    <div class="pb-10">
                                        <div class="flex items-center pointer-events-none bg-white lg:w-[15rem] xl:w-[20rem] 2xl:w-[30rem] h-[2.3rem] rounded px-3 mt-2">
                                            <p>••••••••••••</p>
                                        </div>
                                    </div>
                                    <div class="ml-6 py-3">
                                        <div @click="handleEditPassword" class="cursor-pointer text-[#CED4DA]">{{ $t("profile.edit") }}</div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="passwordEditOn && !userStore?.user.google_id">
                                <div class="flex w-full">
                                    <div class="flex flex-col mt-4 lg:w-[15rem] xl:w-[20rem] 2xl:w-[30rem] bg-[#171623] rounded">
                                        <div class="mt-6 ml-6">
                                            <p class="text-white">{{$t("profile.passwords_should_contain")}}:</p>
                                        </div>
                                        <div class="flex mt-4 ml-6">
                                            <img v-if="passwordValue?.length < 8" src="@/assets/greycirc.svg"/>
                                            <img v-if="passwordValue?.length >= 8" src="@/assets/greencirc.svg"/>
                                            <p :class="passwordValue?.length >= 8 ? 'text-white' : ''" class="ml-2 text-gray-400">{{ $t("profile.8_or_more_characters") }}</p>
                                        </div>
                                        <div class="flex mt-1 ml-6 pb-4">
                                            <img v-if="passwordValue?.length < 8 || passwordValue?.length > 15" src="@/assets/greycirc.svg"/>
                                            <img v-if="passwordValue?.length <= 15 && passwordValue?.length >=8" src="@/assets/greencirc.svg"/>
                                            <p :class="passwordValue?.length <= 15 && passwordValue?.length >=8 ? 'text-white' : ''" class="ml-2 text-gray-400">{{ $t("profile.15_lowercase_characters") }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-col items-center w-full mt-5">
                                    <div class="w-full">
                                        <section class="flex text-white">{{ $t("profile.new_password") }}</section>
                                    </div>
                                    <div class="flex w-full">
                                        <div class="pb-10">
                                            <Field class="flex items-center placeholder-black bg-white lg:w-[15rem] xl:w-[20rem] 2xl:w-[30rem] h-[2.3rem] rounded px-3 mt-2" 
                                            name="password" v-model="passwordValue" placeholder="••••••••••••" type="password" />
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-col items-center w-full">
                                    <div class="w-full">
                                        <section class="flex text-white">{{ $t("profile.confirm_new_password") }}</section>
                                    </div>
                                    <div class="flex w-full">
                                        <div class="pb-10">
                                            <Field class="flex items-center placeholder-black bg-white lg:w-[15rem] xl:w-[20rem] 2xl:w-[30rem] h-[2.3rem] rounded px-3 mt-2"
                                            name="password_confirmation" placeholder="••••••••••••" type="password"/>
                                        </div>
                                    </div>
                                    <ErrorMessage class="text-[#F15524]" name="password" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="editOn || passwordEditOn" class="hidden lg:flex items-center pt-14 gap-4 w-full justify-end">
                        <div @click="removeEdit" class="cursor-pointer ml-6 text-[1.1rem]">
                                <p class="text-[#5B5C67] hover:text-[#525356]">{{$t("profile.cancel")}}</p>
                        </div>
                        <div class="flex w-40 rounded bg-[#E31221] hover:bg-[#CC0E10] active:bg-[#B80D0F] h-9 items-center justify-center mr-10">
                            <button type="submit" class="text-white">{{ $t("texts.save_changes") }}</button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    </div>
    <!--  MOBILE -->

    <div v-if="!profileStore?.newUsername && !profileStore?.newPassword && !profileStore?.newEmail" class="lg:hidden flex flex-col items-center w-screen h-[60%] fixed mt-40 bg-[#24222F]">
        <div v-if="profileStore?.success">
            <UpdatedSuccess />
        </div>
        <div v-if="profileStore?.emailSuccess">
            <EmailSuccess />
        </div>
        <div :class="routeName == 'profile' ? 'border-2 border-red-300 w-28 h-28 rounded-full mt-5' : ''">
            <img class="object-cover w-[6.8rem] h-[6.8rem] rounded-full" id="output-2" :src="userImage" />
        </div>
        <div class="flex justify-center lg:mt-8 w-full">
            <label class="flex justify-center cursor-pointer text-white mt-2" for="thumbnail" @click="handleEditMobile">
                {{$t('profile.upload_new_photo')}}
            </label>
            <Field name="thumbnail" id="thumbnail" type="file" @input="loadFile" v-model="userImage" 
            class="absolute invisible cursor-pointer placeholder-white" />
        </div>
        <div class="flex flex-col border-b-2 border-gray-400 w-[20rem] mt-5">
            <label class="text-white" for="name">{{ $t("profile.username")}}</label>
            <div class="flex justify-between w-full">
                <p class="py-2 bg-inherit outline-none text-white placeholder-white placeholder-py-1">
                    {{userStore?.user.name}}
                </p>
                <div @click="profileStore?.handleNewUsername" class="py-2 cursor-pointer text-[#CED4DA]">{{ $t("profile.edit") }}</div>
            </div>
        </div>
        <div v-if="userStore?.user.google_id" class="flex flex-col border-b-2 border-gray-400 w-[20rem] mt-5 py-2">
            <label class="text-white" for="name">{{ $t("auth.email")}}</label>
            <div class="flex justify-between w-full">
                <p class="py-2 bg-inherit outline-none text-white placeholder-white placeholder-py-1">
                    {{userStore?.user.email}}
                </p>
            </div>
        </div>
        <div v-if="!userStore?.user.google_id" class="flex flex-col mt-6 border-b-2 border-gray-400 w-[20rem] py-2">
            <label class="text-white" for="password">{{ $t("auth.password") }}</label>
            <div class="flex justify-between w-full">
                <div class="bg-inherit text-gray-400 placeholder-white" type="password"></div>
                <div @click="profileStore?.handleNewPassword" class="cursor-pointer text-[#CED4DA]">{{ $t("profile.edit") }}</div>
            </div>
        </div>

        <div v-if="!userStore?.user.google_id" class="flex justify-between items-center text-white w-[20rem] mt-8">
            <div>
                <p>{{ $t("auth.email") }}</p>
            </div>
            <div @click="profileStore?.handleNewEmail" class="cursor-pointer px-2 py-1">
                <img src="@/assets/next.svg" />
            </div>
        </div>
        <div v-if="editMobile" class="lg:hidden flex items-center pt-14 gap-4 w-full justify-center">
            <div @click="removeEditMobile" class="cursor-pointer ml-40 text-[1.1rem]">
                    <p class="text-[#5B5C67] hover:text-[#525356] active:text-[#909092]">{{$t("profile.cancel")}}</p>
            </div>
            <Form @click="handleSubmit" class="flex rounded px-1 bg-[#E31221] hover:bg-[#CC0E10] active:bg-[#B80D0F] h-9 items-center justify-center mr-10">
                <button class="text-white">{{ $t("texts.save_changes") }}</button>
            </Form>
        </div>
    </div>
                        <!--  -->
</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Field, ErrorMessage, Form } from 'vee-validate';
import axiosInstance from "@/config/axios/index.js";
import i18n from '@/i18n/index.js';
import { useRouter } from 'vue-router';
import { useAuthStore } from "@/stores/auth";
import HomeIcon from '@/components/Icons/HomeIcon.vue';
import CameraIcon from '@/components/Icons/CameraIcon.vue';
import TheBurger from '@/components/General/TheBurger.vue';
import TheNotification from '@/components/General/TheNotification.vue';
import { useProfileStore } from "@/stores/profile";
import UpdatedSuccess from '@/components/Profile/ChangeSuccessfull.vue'
import EmailSuccess from '@/components/Profile/EmailSuccessfull.vue'
import { useUserStore } from "@/stores/userStore.js";


const profileStore = useProfileStore();
const userStore = useUserStore();
const authStore = useAuthStore();
const router = useRouter();
const routeName = ref(router.currentRoute.value.name);
const passwordValue = ref()
const userImage = computed(()=>userStore?.user?.thumbnail) 
const lang = ref(false);
const editOn = ref(false);
const editMobile = ref(false);
const passwordEditOn = ref(false);
const url = "http://127.0.0.1:8000/api/logout";

const removeEdit = () => {
    let output = document.getElementById('output');
    output.src = userStore.user.thumbnail;
    passwordEditOn.value = false;
    editOn.value = false;
}

const loadFile = function(event) {
    let output = document.getElementById('output');
    let output2 = document.getElementById('output-2');
    output.src = URL.createObjectURL(event.target.files[0]);
    output2.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
    output2.onload = function() {
      URL.revokeObjectURL(output2.src) // free memory
    }
  };

const removeEditMobile = () => {
    passwordEditOn.value = false;
    editMobile.value = false;
    let output2 = document.getElementById('output-2');

    output2.src = userStore.user.thumbnail;

}

const handleDelete = (e) => {
    console.log(e.target.value)
    axiosInstance
        .post('delete-email/'+e.target.value)
        .then((response) => {
          userStore.getUser();
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
}

const handleEdit = () => {
    editOn.value = true;
}

const handleEditMobile = () => {
    editMobile.value = true;
}

const handleEditPassword = () => {
    passwordEditOn.value = true;
}
const handleLogout = () => {
    axiosInstance
        .get("logout")
        .then(() => {
            authStore.authenticated = false
            router.push({name: "landing"})
        })
        .catch((error) => {
          console.log(error)    
        });

}

const handleLang = () => {
    return lang.value = !lang.value
}

const changeLangEn = () => {
    i18n.global.locale = 'en'
    lang.value = !lang.value
}

const changeLangKa = () => {
    i18n.global.locale = 'ka'
    lang.value = !lang.value
}

const handlePrimary = (e) => {
    console.log(e.target.value)

    axiosInstance
        .post("update-profile", {
            email: e.target.value
        })
        .then((response) => {
          userStore.getUser();
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
          console.log(error);
});
}

const handleSubmit = (values, actions) => {
    console.log(values.name)
    const data = {};
    if(values.name !==userStore.user.name){
        data['name'] = values.name;
    }

    if(values.thumbnail){
        data['thumbnail'] = values.thumbnail;
    }

    if(values.password){
        data['password'] = values.password;
    }

    if(values.password_confirmation){
        data['password_confirmation'] = values.password_confirmation;
    }

    axiosInstance
        .post("update-profile", data,{
            headers: {
                "content-type": "multipart/form-data",
            },
        })
        .then((response) => {
          profileStore.success = true;
          userStore.getUser();
          removeEdit()
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
          console.log(error);
          profileStore.success = false;
          const errors = error.response.data.errors;
          for(const key in errors){
            actions.setFieldError(key,errors[key]);
        }
        });
}
</script>