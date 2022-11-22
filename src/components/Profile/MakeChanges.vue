<template>
    <div class="flex flex-col bg-[#171623] w-full h-screen fixed">
        <div class="flex justify-center items-center px-9 h-20 bg-[#24222F]">
            <div class="flex justify-between items-center w-[20rem]">
                <div>
                <img class="text-gray-600" src="@/assets/list.svg" />
                </div>
                <div>
                <img class="text-gray-600" src="@/assets/bell.svg" />
                </div>
            </div>

        </div>

        <div class="flex items-center h-[4rem]">
        </div>

        <div class="flex flex-col h-[12rem]">
            <div class="flex justify-center w-full">

                <div class="flex flex-col w-[23rem] bg-[#24222F] rounded h-[13rem] items-center">
                    <div class="flex flex-col items-center justify-center mt-[3rem]">
                        <div class="flex items-center justify-center text-white w-[20rem]">
                            <p>{{$t("profile.are_you_sure_to_make_changes")}}</p>
                        </div>

                        <div class="flex items-center mt-12 border-t-2 border-gray-600">
                            <div class="ml-6 text-[1.1rem] mt-4">
                                <p class="text-white">{{$t("profile.cancel")}}</p>
                            </div>
                            <div class="flex items-center justify-center mt-4 ml-[9rem] bg-[#E31221] h-10 w-[6rem] rounded">
                                    <button class="flex text-white">{{$t('profile.confirm')}}</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script setup>



</script>