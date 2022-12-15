<template>
    <div class="flex justify-center">
        <div class="flex absolute flex-col mt-2 h-28 w-[20rem] lg:w-[20%] lg:h-[12%] lg:ml-[25%] bg-[#D1E7DD] rounded mx-3 animate-pulse">
            <div class="flex mt-3">
                <div class="flex justify-center w-30">
                    <img class="ml-4 h-6 lg:h-max w-6" src="@/assets/greentick.svg" alt="green-tick" />
                    <p class="ml-2 text-[#0F5132]">
                    New email added succsessfully
                    </p>
                </div>
                <div>
                    <div @click="profileStore.handleEmailSuccess" class="cursor-pointer ml-12 lg:ml-0 2xl:ml-10 mr-3">
                        <img class="w-5 xl:w-max 2xl:ml-2" src="@/assets/x.svg" alt="close-icon" />
                    </div>
                </div>
            </div>
            <div class="flex h-40 lg:h-max mt-4 lg:hidden xl:flex">
                <p class="ml-10 text-sm">
                    Please check email to verify new address
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useProfileStore } from "@/stores/profile";

const profileStore = useProfileStore();
</script>