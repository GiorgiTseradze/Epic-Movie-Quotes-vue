<template>
    <div>
        <div class="flex justify-center">
            <router-view></router-view>
        </div>

        <div class="flex flex-col items-center w-full h-screen bg-[#181623]">
            <div class="flex justify-center items-center h-20 w-full bg-[#24222F]">
                <div class="flex items-center w-[22.3rem] lg:w-full">
                    <div class="flex justify-between items-center h-12 lg:h-[5.3rem] w-full ">
                        <div class="flex lg:hidden">
                            <img src="@/assets/list.svg" />
                        </div>

                        <div class="flex lg:hidden">
                            <div class="flex">
                                <img src="@/assets/notification.svg" />
                            </div>
                        </div>

                        <div class="hidden lg:flex w-full justify-between">
                            <div class="flex items-center text-[#DDCCAA] text-medium font-bold ml-20">
                            MOVIE QUOTES
                            </div>
                            <div class="flex items-center">
                                <div>
                                    <img src="@/assets/notification.svg" />
                                </div>
                                <div class="flex px-7">
                                    <p class="text-white">Eng</p>
                                    <img class="w-3 ml-2" src="@/assets/down-arrow.svg" />
                                </div>
                                <div class="flex justify-center items-center text-white border-[0.06rem] p-2 mr-10 rounded w-24">
                                    <button>Log out</button>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div class="flex items-center justify-center lg:hidden w-full bg-[#181623]">
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

            <div class="lg:flex w-full lg:w-full bg-[#181623]">
                <div class="hidden lg:flex flex-col ml-20 h-full lg:w-1/5">
                    <div class="flex mt-8 w-[15rem] ml-3">
                        <div>
                            <img src="@/assets/movie-female.svg" />
                        </div>
                        <div class="ml-6">
                            <p class="text-white text-2xl">Nino Tabagari</p>
                            <p class="text-[#CED4DA]">Edit your profile</p>
                        </div>
                    </div>
                    <div class="flex w-[15rem] ml-3 mt-10">
                        <HomeIcon />
                        <p class="ml-4 text-white fill-red-500">News Feed</p>
                    </div>
                    <div class="flex w-[15rem] ml-3 mt-10">
                        <CameraIcon />
                        <p class="ml-4 text-white">List of movies</p>
                    </div>
                </div>
                <div>
                    <div class="hidden lg:block w-full px-7 bg-[#181623] h-[5rem]">
                        <div class="flex items-center justify-between w-full">
                            <div class="flex h-full">
                                <p class="text-white font-medium text-2xl">My list of movies</p>
                                <p class="text-white ml-6 font-medium text-2xl">(Total 25)</p>
                            </div>
                            
                            <div class="flex items-center justify-center h-[5rem]">
                                    <div class="flex">
                                        <img src="@/assets/search.svg" />
                                        <input class="w-16 ml-3 outline-none bg-inherit text-[#CED4DA]" placeholder="Search" />
                                    </div>
                                    <div class="flex items-center justify-center bg-[#E31221] h-10 w-[7rem] rounded">
                                    <button class="flex items-center justify-center text-white"><img class="mr-2" src="@/assets/add.svg"/>Add movie</button>
                                </div>
                            </div>
                            
                     </div>
                    </div>
                    <div class="flex flex-col lg:grid lg:grid-cols-3 w-full lg:w-full">
                        <TheMovie />
                        <TheMovie />
                        <TheMovie />
                        <TheMovie />
                        <TheMovie />
                        <TheMovie />
                        <TheMovie />
                        <TheMovie />
                        <TheMovie />
                        <TheMovie />
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script setup>
import TheMovie from '@/components/Movie/TheMovie.vue';
import HomeIcon from '@/components/Icons/HomeIcon.vue';
import CameraIcon from '@/components/Icons/CameraIcon.vue';

</script>