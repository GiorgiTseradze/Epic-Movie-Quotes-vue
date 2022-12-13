<template>
    <div @click="$router.push({name: 'landing'})" class="flex justify-center fixed w-screen h-screen backdrop-blur-sm z-40"></div>        
    <div class="flex justify-center md:w-[26.7rem] md:h-[42rem] md:mt-20 w-full h-screen fixed bg-[#181623] md:bg-inherit z-50">
        <div class="bg-[#24222F] w-[22.5rem] h-[25.8rem] mt-20 rounded">
            <div class="flex justify-center">
                <img class="mt-16" src="@/assets/sent.svg" />
            </div>
            <div class="flex justify-center mt-4">
                <p class="text-white text-2xl font-medium">{{ $t("auth.thank_you") }}</p>
            </div>
            <div class="flex flex-col justify-center mt-4">
                <p class="flex justify-center ml-2 text-white text-base">{{ $t("auth.please_check_your_email_and_follow_the") }}</p>
                <p class="flex justify-center ml-2 text-white text-base">{{ $t("auth.instructions_to_activate_your_account") }}</p>
            </div>
            <div class="flex flex-col items-center w-full mt-5">
                    <div class="flex items-center justify-center bg-[#E31221] h-10 w-3/5 rounded">
                        <a href="https://mail.google.com/" target="_blank">
                            <button class="flex text-white">{{ $t("auth.go_to_my_email") }}</button>
                        </a>
                    </div>
                </div>
        </div>  
    </div>
</template> 