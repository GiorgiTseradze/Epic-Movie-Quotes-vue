<template>
    <div class="flex justify-center md:w-[26.7rem] md:h-[42rem] md:mt-20 w-full h-screen fixed bg-[#181623] md:bg-inherit">
        <div class="bg-[#24222F] w-[22.5rem] h-[25.8rem] mt-20 rounded">
            <div class="flex justify-center">
                <img class="mt-16" src="@/assets/tick.svg" />
            </div>
            <div class="flex justify-center mt-4">
                <p class="text-white text-2xl font-medium">{{ $t("auth.thank_you") }}</p>
            </div>
            <div class="flex justify-center mt-4">
                <p class="flex justify-center ml-2 text-white text-base">{{ $t("auth.your_email_has_been_activated") }}</p>
            </div>
            <div @click="$router.push({name: 'profile'})" class="cursor-pointer flex flex-col items-center w-full mt-5">
                <div class="flex items-center justify-center bg-[#E31221] h-10 w-3/5 rounded">
                        <p class="flex text-white">{{ $t("texts.close") }}</p>
                </div>
            </div>
        </div>  
    </div>
</template>

<script setup>
import { onMounted, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import router from "@/router";
import axiosInstance from "@/config/axios/index.js";
import { useUserStore } from "@/stores/userStore.js";


const userStore = useUserStore();
const token = ref();
const email = ref('');

onBeforeMount(()=>{
    if(useRoute().query.verify_user_token){
        token.value = useRoute().query.verify_user_token;
        email.value = useRoute().query.email;
    }
    else{
        router.push({name:'profile'});
    }
});

onMounted(() => {
    axiosInstance
        .post("verify-email", {
            email: email.value,
            token: token.value,
        })
        .then((response) => {
            console.log(response)
          alert("Verification Successful!");
          userStore.getUser();
        })
        .catch((error) => {
            console.log(error);
        });
});


</script>