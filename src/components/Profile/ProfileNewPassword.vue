<template>
    <div class="flex flex-col bg-[#171623] w-full h-screen">
        <div class="flex justify-center items-center h-20 bg-[#24222F]">
            <div class="flex justify-between w-[20rem]">
                <div>
                    <img src="@/assets/list.svg" />
                </div>
                <div>
                    <img src="@/assets/bell.svg" />
                </div>
            </div>
        </div>


        <div class="flex items-center h-[2rem]">
        </div>

        <div class="flex flex-col bg-[#24222F] h-[25.5rem]">

            <div>
                <div class="flex justify-center w-full">
                    <div class="flex flex-col mt-4 w-[18rem] bg-[#171623] border-[0.1rem] rounded border-gray-600">
                        <div class="mt-6 ml-6">
                            <p class="text-white">Passwords should contain:</p>
                        </div>
                        <div class="flex mt-4 ml-6">
                            <img src="@/assets/greycirc.svg"/>
                            <p class="ml-2 text-gray-500">8 or more characters</p>
                        </div>
                        <div class="flex mt-1 ml-6 pb-4">
                            <img src="@/assets/greencirc.svg"/>
                            <p class="ml-2 text-white">15 lowercase character</p>
                        </div>
                    </div>
                </div>
               
                <Form @submit="handlesubmit" class="flex flex-col items-center mt-[2rem] w-full">
                    <div class="flex flex-col w-[20rem]">   
                        <label class="text-white" for="new_password">New password</label>
                        <div class="flex w-full justify-center">
                            <Field name="new_password" type="password" class="bg-[#CED4DA] w-full h-[3rem] rounded px-3 mt-2 outline-none" />
                        </div>
                    </div>
                    <div class="flex flex-col w-[20rem] mt-6">
                        <label class="text-white" for="confirm_password">Confirm new password</label>
                        <div class="flex w-full justify-center">
                            <Field name="confirm_password" type="password" class="bg-[#CED4DA] w-full h-[3rem] rounded px-3 mt-2 outline-none" />
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="flex justify-center items-center mt-8 w-full">
            <div class="flex items-center w-[20rem]">
                <div class="text-[1.1rem]">
                    <p class="text-white">Cancel</p>
                </div>
                <div class="flex items-center justify-center ml-[11rem] bg-[#E31221] h-10 w-[4.3rem] rounded">
                        <button class="flex text-white">Add</button>
                </div>
            </div>
        </div>

        <div>

        </div>
    </div>
</template>

<script setup>

import { Field, ErrorMessage, Form } from 'vee-validate';
import axios from "@/config/axios/index.js";


//to be changed
const handleSubmit = (values) => {
    axios
        .post("reset", {
          password: values.password,
          password_confirmation: values.password_confirmation,
        })
        .then(() => {
          alert("reset Successful!");
          this.$router.push({ name: "landing" });
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
}

</script>