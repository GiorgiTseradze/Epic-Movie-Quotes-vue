<template>
    <div class="flex justify-center md:w-[26.7rem] md:h-[42rem] md:mt-20 w-full h-screen fixed bg-[#181623] md:bg-inherit">
        <div class="bg-[#24222F] w-[22.5rem] h-[25.8rem] mt-20 rounded">
            <div class="flex justify-center">
                <img class="mt-16" src="@/assets/sent.svg" />
            </div>
            <div class="flex justify-center mt-4">
                <p class="text-white text-2xl font-medium">Check your email</p>
            </div>
            <div class="flex flex-col justify-center mt-4">
                <p class="flex justify-center ml-2 text-white text-sm">We have sent a password recover instructions</p>
                <p class="flex justify-center ml-2 text-white text-sm">to your email</p>
            </div>
            <div class="flex flex-col justify-center items-center w-full mt-5">
                <div class="flex items-center justify-center bg-[#E31221] h-10 w-72 rounded">
                    <button class="flex text-white">Go to my email</button>
                </div>
            </div>

            <div class="flex justify-center w-full mt-5">
                    <p class="flex text-[#6C757D]">Skip, I’ll confirm later</p>
            </div>

        </div>  
    </div>
    </template>