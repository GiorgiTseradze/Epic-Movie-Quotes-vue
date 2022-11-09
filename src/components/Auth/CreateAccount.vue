<template>
<div class="w-full h-screen fixed bg-black">
    <div class="flex flex-col items-center w-full mt-16 text-white">
        <p class="text-2xl">Create an account</p>
        <p class="text-[#6C757D]">Start your journey!</p>
    </div>
    <div>
        <div class="flex flex-col">
            <div class="flex flex-col items-center w-full mt-5">
                <div class="w-4/5">
                    <section class="flex text-white">Name<p class="text-red-500 ml-1"> *</p></section>
                </div>
                <div class="flex w-4/5 justify-center">
                    <input class="bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2" placeholder="Enter your name" />
                </div>
            </div>

            <div class="flex flex-col items-center w-full mt-5">
                <div class="w-4/5">
                    <section class="flex text-white">Email<p class="text-red-500 ml-1"> *</p></section>
                </div>
                <div class="flex w-4/5 justify-center">
                    <input class="bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2" placeholder="Enter your email" />
                </div>
            </div>

            <div class="flex flex-col items-center w-full mt-5">
                <div class="w-4/5">
                    <section class="flex text-white">Password<p class="text-red-500 ml-1"> *</p></section>
                </div>
                <div class="flex w-4/5 justify-center">
                    <input class="bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2" placeholder="Password" />
                </div>
            </div>

            <div class="flex flex-col items-center w-full mt-5">
                <div class="w-4/5">
                    <section class="flex text-white">Confirm Password<p class="text-red-500 ml-1"> *</p></section>
                </div>
                <div class="flex w-4/5 justify-center">
                    <input class="bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2" placeholder="Password" />
                </div>
            </div>

            <div class="flex flex-col items-center w-full mt-5">
                <div class="flex items-center justify-center bg-[#E31221] h-10 w-4/5 rounded">
                    <button class="flex text-white">Get Started</button>
                </div>
            </div>

            <div class="flex flex-col items-center w-full mt-3">
                <div class="flex items-center justify-center bg-black border rounded border-white h-10 w-4/5">
                    <button class="flex items-center text-white">
                        <img class="mr-2" src="/src/assets/gmail.svg" /> 
                        Sign up with Google
                    </button>
                </div>
            </div>

            <div class="flex justify-center w-full mt-5">
                <p class="text-[#6C757D]">Already have an account?</p>
                <button class="text-[#0D6EFD] underline ml-1">Log in</button>
            </div>

        </div>
    </div>
</div>
</template>