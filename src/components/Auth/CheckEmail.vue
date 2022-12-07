<template>
    <div @click="$router.push({name: 'landing'})" class="flex justify-center fixed w-screen h-screen backdrop-blur-sm z-40"></div>        
    <div class="flex justify-center md:w-[26.7rem] md:h-[42rem] md:mt-20 w-full h-screen fixed bg-[#181623] md:bg-inherit z-50">
        <div class="bg-[#24222F] w-[22.5rem] h-[25.8rem] mt-20 rounded">
            <div class="flex justify-center">
                <img class="mt-16" src="@/assets/sent.svg" />
            </div>
            <div class="flex justify-center mt-4">
                <p class="text-white text-2xl font-medium">{{ $t("auth.check_your_email") }}</p>
            </div>  
            <div class="flex flex-col justify-center mt-4">
                <p class="flex justify-center ml-2 text-white text-sm">{{ $t("auth.recover_instructions_sent") }}</p>
                <p class="flex justify-center ml-2 text-white text-sm">{{ $t("auth.to_your_email") }}</p>
            </div>
            <div class="flex flex-col justify-center items-center w-full mt-5">
                <div class="flex items-center justify-center bg-[#E31221] h-10 w-72 rounded">
                    <button class="flex text-white">{{ $t("auth.go_to_my_email")}}</button>
                </div>
            </div>

            <div @click="$router.push({name: 'landing'})" class="cursor-pointer flex justify-center w-full mt-5">
                    <p class="flex text-[#6C757D]">{{ $t("auth.skip_i_will_confirm_later" )}}</p>
            </div>

        </div>  
    </div>
    </template>