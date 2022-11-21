<template>
    <div>
        <div class="flex justify-center">
            <router-view></router-view>
        </div>
        <div class="flex flex-col bg-[#181623] h-[27.1rem]">
        <div class="flex justify-between items-center h-12 mt-8">
            <div class="text-[#DDCCAA] text-medium font-bold ml-9">
                MOVIE QUOTES
            </div>
            <div class="text-white mr-9 border-2 p-2">
                <router-link to="login">
                    <button>Log in</button> 
                </router-link>
            </div>
        </div>

        <div class="flex w-full h-96">
            <div class="flex flex-col items-center w-full text-2xl font-bold text-[#DDCCAA] mt-32">
                <p>
                    Find any quote in 
                </p>
                <p>
                    millions of movie lines
                </p>
            </div>
        </div>

        <div class="flex lg:w-screen lg:h-screen h-96">
            <div class="flex flex-col justify-center w-full h-screen bg-interstellar text-2xl font-bold text-white mt-32">
                <p class="ml-10 font-bold text-xl">
                    - ”You have to leave something behind to go forward”
                </p>
                <p class="ml-10 mt-5 text-base font-bold">Interstellar, 2014</p>
            </div>
        </div>

        <div class="flex lg:w-screen lg:h-screen h-96">
            <div class="flex flex-col justify-center w-full h-screen bg-tenenbaums text-2xl font-bold text-white mt-32">
                <p class="ml-10 font-bold text-xl">
                    - “I think we’re just gonna
                        have to be secretly in love
                        with earch other and
                        leave it that”
                </p>
                <p class="ml-10 mt-5 text-base font-bold">The Royal Tenenbaums, 2001</p>
            </div>
        </div>

        <div class="flex lg:w-screen lg:h-screen h-96">
            <div class="flex flex-col justify-center w-full h-screen lg:h-screen bg-lotr text-2xl font-bold text-white mt-32">
                <p class="ml-10 font-bold text-xl">
                    - ”You have to leave something behind to go forward”
                </p>
                <p class="ml-10 mt-5 text-base font-bold">The Lord of The Rings, 2003</p>
            </div>
        </div>

</div>
    </div>
</template>

<script setup>
</script>