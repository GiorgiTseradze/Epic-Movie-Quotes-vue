<template>
    <div>
        <div class="flex justify-center">
            <router-view></router-view>
        </div>
        <div class="flex flex-col bg-[#000006] h-[40rem]">
            <div class="flex justify-between items-center h-12 mt-8">
                <div class="text-[#DDCCAA] text-medium font-bold ml-9">
                    MOVIE QUOTES
                </div>
                <div class="flex">
                    <div class="flex flex-col h-10 justify-center mr-4">
                        <div>
                            <button @click="handleLang" class="flex items-center">
                                <p class="text-white">{{i18n.global.locale === 'en' ? "ENG" : "KA"}}</p>
                                <img class="w-3 ml-2" src="@/assets/down-arrow.svg" />
                            </button>
                        </div>

                        <div v-if="lang" class="text-white bg-[#24222F] fixed mt-[6.5rem] rounded">
                            <div class="pr-5 pb-2 border-b-[0.06rem] border-[#CED4DA]">
                                <button @click="changeLangEn">ENG</button>
                            </div>
                            <div class="py-2">
                                <button @click="changeLangKa">KA</button>
                            </div>
                        </div>
                    </div>
                    <router-link :to="{name: 'createAccount'}">
                        <div class="hidden lg:flex w-28 h-10 rounded bg-[#E31221] items-center justify-center mx-4">
                            <button type="submit" class="text-white">{{ $t("auth.sign_up") }}</button>
                        </div>
                    </router-link>
                    <div class="text-white mr-9 border-[0.06rem] rounded h-10 w-20 flex justify-center items-center p-2">
                        <router-link to="login">
                            <button>{{ $t("auth.log_in") }}</button> 
                        </router-link>
                    </div>
                </div>

            </div>

        <div class="flex w-full lg:h-full h-[20rem]">
            <div class="flex flex-col items-center w-full h-[20rem] lg:h-max text-2xl font-bold text-[#DDCCAA] mt-20 lg:mt-72">
                <p>
                    Find any quote in 
                </p>
                <p class="pb-5">
                    millions of movie lines
                </p>
                <router-link :to="{name: 'createAccount'}">
                <div class="flex w-36 text-lg font-normal h-10 rounded bg-[#E31221] items-center justify-center mx-4">
                    <button type="submit" class="text-white">{{ $t("auth.get_started") }}</button>
                </div>
            </router-link>
            </div>
        </div>

        <div class="flex lg:w-screen lg:h-screen h-96">
            <div class="relative w-full h-full lg:hidden">
                <img src="@/assets/interstellar.png" />
                <div class="absolute top-12 flex flex-col justify-center w-4/5 text-white">
                    <p class="ml-10 font-bold">
                        - ”You have to leave something behind to go forward”
                    </p>
                    <p class="ml-10 mt-5 text-base font-bold">Interstellar, 2014</p>
                </div>
            </div>
            <div class="hidden lg:flex flex-col justify-center w-full h-screen bg-interstellar text-2xl font-bold text-white mt-32">
                <p class="ml-10 font-bold text-xl">
                    - ”You have to leave something behind to go forward”
                </p>
                <p class="ml-10 mt-5 text-base font-bold">Interstellar, 2014</p>
            </div>
        </div>

        <div class="flex lg:w-screen lg:h-screen h-96">
            <div class="relative w-full h-full lg:hidden">
                <img src="@/assets/tenenbaums.png" />
                <div class="absolute top-12 flex flex-col justify-center w-4/5 text-white">
                    <p class="ml-10 font-bold">
                        - “I think we’re just gonna
                            have to be secretly in love
                            with earch other and
                            leave it that”
                    </p>
                    <p class="ml-10 mt-5 text-base font-bold">The Royal Tenenbaums, 2001</p>
                </div>
            </div>
            <div class="hidden lg:flex flex-col justify-center w-full h-screen bg-tenenbaums text-2xl font-bold text-white mt-32">
                <p class="ml-10 font-bold text-xl">
                    - “I think we’re just gonna
                        have to be secretly in love
                        with earch other and
                        leave it that”
                </p>
                <p class="ml-10 mt-5 text-base font-bold">The Royal Tenenbaums, 2001</p>
            </div>
        </div>

        <div class="flex lg:w-screen lg:h-screen h-96">
            <div class="relative w-full h-full lg:hidden">
                <img src="@/assets/lotr.png" />
                <div class="absolute top-12 flex flex-col justify-center w-4/5 text-white">
                    <p class="ml-10 font-bold">
                        - “I see in your eyes the same fear that would take the heart of me....”
                    </p>
                    <p class="ml-10 mt-5 text-base font-bold">The Lord of The Rings, 2003</p>
                </div>
            </div>
            <div class="hidden lg:flex flex-col justify-center w-full h-screen lg:h-screen bg-lotr text-2xl font-bold text-white mt-32">
                <p class="ml-10 font-bold text-xl">
                    - ”You have to leave something behind to go forward”
                </p>
                <p class="ml-10 mt-5 text-base font-bold">The Lord of The Rings, 2003</p>
            </div>
        </div>

</div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import i18n from '@/i18n/index.js'

const lang = ref(false);

const handleLang = () => {
    return lang.value = !lang.value
}

const changeLangEn = () => {
    i18n.global.locale = 'en'
    lang.value = !lang.value
}

const changeLangKa = () => {
    i18n.global.locale = 'ka'
    lang.value = !lang.value
}
</script>