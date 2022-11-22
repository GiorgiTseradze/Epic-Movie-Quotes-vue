<template>
    <div class="flex justify-center w-full h-screen fixed bg-[#181623]">
        <div class="bg-[#181623] w-4/5 h-3/5 mt-20 rounded">
            <div class="flex justify-center">
                <img class="mt-16" src="@/assets/ghost.svg" />
            </div>
            <div class="flex justify-center mt-4">
                <p class="text-white text-2xl font-medium">Whoops!</p>
            </div>
            <div class="flex flex-col justify-center mt-4">
                <p class="flex justify-center ml-2 text-white text-base">{{ $t("texts.please_check_your_email_and_follow_the") }}</p>
                <p class="flex justify-center ml-2 text-white text-base">{{ $t("texts.instructions_to_activate_your_account") }}</p>
            </div>
            <div class="flex flex-col items-center w-full mt-5">
                    <div class="flex items-center justify-center bg-[#E31221] h-12 w-[10rem] rounded">
                        <button class="flex text-white">{{ $t("texts.go_to_my_email") }}</button>
                    </div>
                </div>
        </div>  
    </div>
</template>