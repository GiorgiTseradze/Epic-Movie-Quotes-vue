<template>
    <div>
        <div class="flex justify-center">
            <router-view></router-view>
        </div>

        <div class="flex flex-col items-center w-full h-full bg-[#101019]">
            <div class="flex justify-center items-center h-20 w-full bg-[#24222F]">
                <div class="flex items-center w-[22.3rem]">
                    <div class="flex justify-between items-center h-12 w-full">
                        <div class="flex">
                            <img src="@/assets/list.svg" />
                        </div>

                        <div class="flex">
                            <div class="flex">
                                <img src="@/assets/search.svg" />
                            </div>
                            <div class="flex ml-5">
                                <img src="@/assets/notification.svg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex items-center justify-center w-full bg-[#181623]">
                <div class="flex items-center w-[22.3rem] h-24">
                    <img class="" src="@/assets/type.svg" />
                    <p class="ml-2 text-white">Write new quote</p>
                </div>
            </div>

            <div>
                <ThePost name="Maia Nakashidze" />
                <ThePost />

            </div>
        </div>
    </div>
</template>

<script setup>
import ThePost from '@/components/NewsFeed/ThePost.vue';

</script>