<template>
    <div>
        <div class="flex justify-center">
            <router-view></router-view>
        </div>

        <div class="flex flex-col items-center w-full h-screen bg-[#181623]">
            <div class="flex justify-center items-center h-20 w-full bg-[#24222F]">
                <div class="flex items-center w-[22.3rem]">
                    <div class="flex justify-between items-center h-12 w-full">
                        <div class="flex">
                            <img src="@/assets/list.svg" />
                        </div>

                        <div class="flex">
                            <div class="flex">
                                <img src="@/assets/notification.svg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex items-center justify-center w-full bg-[#181623]">
                <div class="flex flex-col justify-center w-[22.3rem] h-24">
                    <div class="flex items-center justify-between w-full">
                        <div class="h-full">
                            <p class="text-white font-medium text-2xl">My list of movies</p>
                        </div>
                        <div class="flex items-center justify-center bg-[#E31221] h-10 w-[7.9rem] rounded">
                            <button class="flex items-center justify-center text-white"><img class="mr-2" src="@/assets/add.svg"/>Add movie</button>
                        </div>
                    </div>
                    <div>
                        <p class="text-white">
                            (Total 25)
                        </p>
                    </div>
                </div>
            </div>

            <TheMovie />
            <TheMovie />


        </div>
    </div>
</template>

<script setup>
import TheMovie from '@/components/Movie/TheMovie.vue';

</script>