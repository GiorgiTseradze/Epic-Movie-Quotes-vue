<template>
    <div class="flex flex-col bg-[#171623] w-full h-screen fixed">
        <div class="flex justify-center items-center h-20 bg-[#24222F]">
            <div class="flex justify-between w-[20rem]">
                <div>
                    <img src="@/assets/list.svg" />
                </div>
                <div>
                    <img src="@/assets/bell.svg" />
                </div>
            </div>
        </div>

        <div class="flex items-center justify-center h-[4rem]">
            <div class="w-[20rem]">
                <img src="@/assets/back.svg" class="w-5" />
            </div>
        </div>

        <div class="flex flex-col items-center">
            <div class="flex flex-col items-center bg-[#24222F] w-[23rem] h-[10rem]">
                <div class="flex flex-col mt-[1.5rem] w-[20rem]">
                    <div>
                        <p class=" text-white text-sm">{{ $t("profile.primary_email") }}</p>
                        <div class="flex flex-col relative mt-5 h-12 border-b-[0.1rem] bg-[#203856] border-[0.1rem] border-[#198754] z-0 rounded">
                            <p class="text-white ml-4 mt-[0.7rem]">
                                ninotabagari@gmail.com
                            </p>
                            <img class="flex absolute ml-[16.3rem] mt-[0.9rem] justify-end z-10 w-4" src="@/assets/greentick.svg" />
                        </div>
                        <div class="w-[20rem] mt-5 border-b-[0.1rem] border-gray-500"></div>
                    </div>
                </div>
            </div>

            <div class="flex flex-col items-center bg-[#24222F] w-[23rem] h-[8rem]">
                <div class="flex flex-col w-[20rem]">
                    <div>
                        <div class="flex flex-col relative h-5">
                            <div>
                                <p class="text-white mt-[0.5rem]">
                                    ninotabagari@gmail.com
                                </p>
                            </div>
                            <div class="flex mt-3">
                                <div class="border-[0.1rem] border-white rounded">
                                    <p class="py-1 px-2 text-white">{{ $t("profile.make_this_primary") }}</p>
                                </div>
                                <p class="flex absolute ml-[16.3rem] mt-[0.4rem] justify-end z-10 w-4 text-gray-300">{{$t ("profile.remove") }}</p>
                            </div>
                        </div>
                        <div class="mt-20 w-[20rem] border-b-[0.1rem] border-gray-500"></div>
                    </div>
                </div>
            </div>

            <div class="flex flex-col items-center bg-[#24222F] w-[23rem] h-[8.5rem]">
                <div class="flex flex-col w-[20rem]">
                    <div>
                        <div class="flex flex-col relative h-5">
                            <div>
                                <p class="text-white mt-[0.5rem]">
                                    ninotabagari@gmail.com
                                </p>
                            </div>
                            <div class="flex mt-3">
                                <div class="border-[0.1rem] border-white rounded">
                                    <p class="py-1 px-2 text-white">{{ $t("profile.make_this_primary") }}</p>
                                </div>
                                <p class="flex absolute ml-[16.3rem] mt-[0.4rem] justify-end z-10 w-4 text-gray-300">{{$t ("profile.remove") }}</p>
                            </div>
                        </div>
                        <div class="mt-20 w-[20rem] border-b-[0.1rem] border-gray-500"></div>
                    </div>
                </div>
            </div>

            <div class="flex flex-col items-center h-[6.4rem] w-[23rem] bg-[#24222F]">
                <div class="w-[20rem]">
                    <div>
                        <p class=" text-white text-sm">{{ $t("profile.add_new_email") }}</p>
                    </div>
                    <div class="flex justify-center items-center mt-4 border-[0.1rem] h-8 w-80 rounded">
                        <img src="@/assets/add.svg" />
                        <p class="text-white ml-2">{{ $t("profile.add") }}</p>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>



</script>