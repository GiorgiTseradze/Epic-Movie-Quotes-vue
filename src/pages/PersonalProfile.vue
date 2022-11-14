<template>
    <div class="flex flex-col bg-[#171623] h-screen">
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

        <NewUsername />
        <!-- <MakeChanges /> -->
        <!-- <ChangeSuccessfull /> -->
        <!-- <NewPassword /> -->
        <!-- <ProfileEmail /> -->
        <!-- <NewEmail /> -->
        <!-- <EmailSuccessfull /> -->


        <div class="flex flex-col bg-[#24222F] h-[35.5rem]">
            <div class="flex justify-center mt-8">
                <img src="/src/assets/profpic.svg" />
            </div>
            <div class="flex justify-center">
                <p class="text-white text-xl mt-2">Upload new photo</p>
            </div>

            <div>
                <form class="flex flex-col items-center mt-[3rem] w-full">
                    <div class="flex flex-col border-b-2 border-gray-500 w-[20rem]">
                        <label class="text-white" for="username">Username</label>
                        <div class="flex justify-between w-full">
                            <input name="username" class="bg-[#24222F] outline-none text-white placeholder-white" />
                            <button class="text-[#CED4DA]">Edit</button>
                        </div>
                    </div>
                    <div class="flex flex-col mt-6 border-b-2 border-gray-500 w-[20rem]">
                        <label class="text-white" for="password">Password</label>
                        <div class="flex justify-between w-full">
                            <input name="username" class="bg-[#24222F] text-gray-400 placeholder-white outline-none" type="password" />
                            <button class="text-[#CED4DA]">Edit</button>
                        </div>
                    </div>

                    <div class="flex justify-between items-center text-white w-[20rem] mt-8">
                        <div>
                            <p>EMAIL</p>
                        </div>
                        <div>
                            <img src="/src/assets/next.svg" />
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div>

        </div>
    </div>
</template>

<script setup>
import NewUsername from '/src/components/Profile/NewUsername.vue';
import MakeChanges from '/src/components/Profile/MakeChanges.vue';
import ChangeSuccessfull from '/src/components/Profile/ChangeSuccessfull.vue';
import NewPassword from '/src/components/Profile/NewPassword.vue';
import ProfileEmail from '/src/components/Profile/ProfileEmail.vue';
import NewEmail from '/src/components/Profile/NewEmail.vue';
import EmailSuccessfull from '/src/components/Profile/EmailSuccessfull.vue';


</script>