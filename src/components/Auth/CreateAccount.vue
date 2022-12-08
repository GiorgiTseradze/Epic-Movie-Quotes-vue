<template>
    <div @click="$router.push({name: 'landing'})" class="flex justify-center fixed w-screen h-screen backdrop-blur-sm z-40"></div>        
    <div class="md:w-[26.7rem] md:h-[42rem] md:mt-20 w-full h-screen fixed bg-black z-50">
        <div class="flex flex-col items-center w-full mt-10 lg:mt-16 text-white">
            <p class="text-2xl">{{ $t("auth.create_an_account")}}</p>
            <p class="text-[#6C757D]">{{ $t("auth.start_your_journey") }}</p>
        </div>
        <div>
        <div class="flex flex-col">
            <Form @submit="handleSubmit">
                <div class="flex flex-col items-center w-full mt-5">
                    <div class="w-[22.5rem]">
                        <section class="flex text-white">{{ $t("auth.name") }}<p class="text-red-500 ml-1"> *</p></section>
                    </div>
                    <div class="flex flex-col relative w-[22.5rem]">
                        <Field name="name" rules="required|min:3|max:15|lowalphanumeric" class="bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2 outline-none" :placeholder="$t('auth.enter_your_name')" />
                        <ErrorMessage class="absolute mt-[3rem] text-sm text-[#F15524]" name="name" />
                    </div>
                </div>

                <div class="flex flex-col items-center w-full mt-6">
                    <div class="w-[22.5rem]">
                        <section class="flex text-white">{{ $t("auth.email") }}<p class="text-red-500 ml-1"> *</p></section>
                    </div>
                    <div class="flex flex-col w-[22.5rem] relative">
                        <Field name="email" rules="required|email" class="bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2 outline-none" :placeholder="$t('auth.enter_your_email')" />
                        <ErrorMessage class="absolute mt-[3rem] text-sm text-[#F15524]" name="email" />
                    </div>
                </div>

                <div class="flex flex-col items-center w-full mt-6">
                    <div class="w-[22.5rem]">
                        <section class="flex text-white">{{ $t("auth.password") }}<p class="text-red-500 ml-1"> *</p></section>
                    </div>
                    <div class="flex w-[22.5rem] relative">
                        <Field name="password" rules="required|min:3|max:15|lowalphanumeric" type="password" class="bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2 outline-none" :placeholder="$t('auth.password')" />
                    </div>
                </div>

                <div class="flex flex-col items-center w-full mt-6">
                    <div class="w-[22.5rem]">
                        <section class="flex text-white">{{ $t("auth.confirm_password")}}<p class="text-red-500 ml-1"> *</p></section>
                    </div>
                    <div class="flex w-[22.5rem] relative">
                        <Field name="password_confirmation" rules="required|min:3|max:15|lowalphanumeric" type="password" class="bg-[#CED4DA] w-full h-[2.3rem] rounded px-3 mt-2 outline-none" :placeholder="$t('auth.confirm_password')" />
                        <ErrorMessage class="absolute mt-[3rem] text-sm text-[#F15524]" name="password" />
                    </div>
                </div>

                <div class="flex flex-col items-center w-full mt-7">
                    <div class="flex items-center justify-center bg-[#E31221] h-10 w-[22.5rem] rounded">
                            <button class="flex text-white" type="submit">{{ $t("auth.get_started") }}</button>
                    </div>
                </div>
            </Form>
        
                <div class="flex flex-col items-center w-full mt-3">
                    <div class="flex items-center justify-center bg-black border rounded border-white h-10 w-[22.5rem]">
                        <button class="flex items-center text-white">
                            <img class="mr-2" src="@/assets/gmail.svg" /> 
                            {{ $t("auth.sign_in_with_google") }}
                        </button>
                    </div>
                </div>

                <div @click="$router.push({name: 'login'})" class="flex justify-center w-full mt-5">
                    <p class="text-[#6C757D]">{{ $t("auth.already_have_an_account") }}</p>
                    <button class="text-[#0D6EFD] underline ml-1">{{ $t("auth.log_in") }}</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { Field, ErrorMessage, Form } from 'vee-validate';
import axiosInstance from "@/config/axios/index.js";
import { useRouter } from 'vue-router'

const router = useRouter()

const handleSubmit = (values, actions) => {
    console.log(values)
    axiosInstance
        .post("register", {
          name: values.name,
          email: values.email,
          password: values.password,
          password_confirmation: values.password_confirmation,
        })
        .then((response) => {
          alert("Registration Successful!");
          router.push({ name: 'emailSent'});
          console.log(response);
          error.value = '';
        })
        .catch((error) => {
          const errors = error.response.data.errors;

          for(const key in errors){
            actions.setFieldError(key,errors[key]);
        }
        });
}

</script>