<template>
    <div class="flex justify-center">
        <div class="flex mt-[5.4rem] h-14 items-center w-[20rem] text-sm fixed bg-[#D1E7DD]">
            <img class="ml-4" src="@/assets/greentick.svg" />
            <p class="w-[14rem] ml-4 text-[#0F5132]">
                {{ $t("profile.changes_updated_successfully") }}
            </p>
            <button class="">
                <img src="@/assets/x.svg"/>
            </button>
        </div>
    </div>
</template>