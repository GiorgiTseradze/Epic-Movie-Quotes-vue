<template>
    <div class="flex justify-center w-full h-screen fixed bg-[#181623]">
        <div class="bg-[#181623] w-4/5 h-3/5 mt-20 rounded">
            <div class="flex justify-center">
                <img class="absolute" src="@/assets/gandalf.svg" alt="gandalf" />
                <img class="mt-16" src="@/assets/union.svg" alt="union" />
            </div>
            <div class="flex justify-center mt-8">
                <p class="text-white text-2xl font-medium">You shall not pass!</p>
            </div>
            <div class="flex flex-col justify-center mt-4">
                <p class="flex justify-center ml-2 text-white text-base font-medium">{{ $t("texts.sorry_but_you_dont_have_permission_to") }}</p>
                <p class="flex justify-center ml-2 text-white text-base font-medium">{{ $t("texts.access_this_page") }}</p>
            </div>
            <div class="flex flex-col items-center w-full mt-5">
                    <div @click="$router.push({name: 'landing'})" class="flex items-center justify-center bg-[#E31221] h-[3.1rem] w-[10rem] rounded">
                        <button class="flex text-white">{{ $t("texts.return_home") }}</button>
                    </div>
                </div>
        </div>  
    </div>
    </template>