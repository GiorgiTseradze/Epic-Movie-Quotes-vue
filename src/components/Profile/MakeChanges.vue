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

        <div class="flex flex-col bg-[#24222F] h-[12rem]">

            <div>
                <div class="flex flex-col items-center justify-center mt-[3rem] w-full">
                    <div class="flex items-center justify-center text-white w-[20rem]">
                        <p>Are you sure to make changes ?</p>
                    </div>

                    <div class="flex items-center mt-12 border-t-2 border-gray-600">
                        <div class="ml-10 text-[1.1rem] mt-4">
                            <p class="text-white">Cancel</p>
                        </div>
                        <div class="flex items-center justify-center mt-4 ml-[11rem] bg-[#E31221] h-10 w-[4.3rem] rounded">
                                <button class="flex text-white">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>

        </div>
    </div>
</template>

<script setup>



</script>