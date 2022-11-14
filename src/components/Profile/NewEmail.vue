<template>
    <div class="flex flex-col bg-[#171623] w-full h-screen fixed">
        <div class="flex justify-center items-center px-9 h-20 bg-[#24222F]">
            <div class="flex justify-between w-[20rem]">
                <div>
                    <img src="/src/assets/list.svg" />
                </div>
                <div>
                    <img src="/src/assets/bell.svg" />
                </div>
            </div>
        </div>
        <div class="flex items-center justify-center h-[4rem]">
            <div class="w-[20rem]">
                <img src="/src/assets/back.svg" class="w-5" />
            </div>
        </div>

        <div class="flex flex-col bg-[#24222F] h-[12rem]">

            <div>
                <form class="flex flex-col items-center mt-[3rem] w-full">
                    <div class="flex flex-col w-[20rem]">
                        <label class="text-white" for="new_username">Add new email</label>
                        <div class="flex w-full justify-center">
                            <input name="new_username" class="bg-[#CED4DA] w-full h-[3rem] rounded px-3 mt-2 outline-none" />
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="flex justify-center items-center mt-20">
            <div class="ml-10 text-[1.1rem]">
                <p class="text-gray-300">Cancel</p>
            </div>
            <div class="flex items-center justify-center ml-[11rem] bg-[#E31221] h-10 w-[4.3rem] rounded">
                    <button class="flex text-white">Add</button>
            </div>
        </div>

        <div>

        </div>
    </div>
</template>

<script setup>



</script>