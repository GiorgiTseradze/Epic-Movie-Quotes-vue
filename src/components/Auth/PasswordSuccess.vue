<template>
    <div class="flex justify-center md:w-[26.7rem] md:h-[42rem] md:mt-20 w-full h-screen fixed bg-[#181623] md:bg-inherit">
        <div class="bg-[#252330] w-[22.5rem] h-[25.8rem] mt-20 rounded">
            <div class="flex justify-center">
                <img class="mt-16" src="@/assets/sent.svg" alt="send-icon" />
            </div>
            <div class="flex justify-center mt-4">
                <p class="text-white text-[2rem] font-medium">{{ $t("auth.success")}}</p>
            </div>
            <div class="flex flex-col justify-center mt-4">
                <p class="flex justify-center ml-2 text-white text-base">{{ $t("auth.your_password_changed_successfully") }}</p>
            </div>
            <div class="flex flex-col items-center w-full mt-5">
                    <div @click="$router.push({name: 'login'})" class="flex items-center justify-center bg-[#E31221] h-10 w-[10rem] rounded">
                        <button class="flex text-white">{{ $t("auth.log_in") }}</button>
                    </div>
                </div>
        </div>  
    </div>
</template>