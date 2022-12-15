<template>
    <div class="flex justify-center">
        <div class="flex h-14 items-center w-[20rem] lg:w-[20%] lg:ml-[25%] text-sm fixed bg-[#D1E7DD] animate-pulse">
            <img class="ml-4" src="@/assets/greentick.svg" />
            <p class="w-[14rem] ml-4 text-[#0F5132]">
                {{ $t("profile.changes_updated_successfully") }}
            </p>
            <div @click="profileStore.handleSuccess" class="cursor-pointer p-2">
                <img src="@/assets/x.svg" alt="close-icon" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useProfileStore } from "@/stores/profile";

const profileStore = useProfileStore();
</script>