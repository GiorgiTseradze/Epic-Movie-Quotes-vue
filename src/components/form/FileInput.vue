<template>
    <div class="flex items-center h-16 border-[0.06rem] mt-4 border-[#6C757D] rounded">
    <Field name="image" v-slot="{ meta, value }" v-model="fileModel">
        <div
            @dragover.prevent 
            @drop.prevent="onDrop"
            class="relative bg-transparent border-1 border-gray-500 placeholder-white w-full px-2.5 py-4 rounded lg:py-2 outline-none">
            <div class="flex justify-between itmes-center lg:justify-start lg:gap-3 w-full lg:w-[38rem]">
            <div v-if="fileModel" class="flex text-white items-center">
                {{ fileModel.name }}
            </div>
            <div v-else class="flex items-center">
                <img src="@/assets/photocamera.svg" />
                <span class="mt-1 ml-2 text-sm w-40 text-white lg:hidden">Upload image</span>
                <span class="mt-1 lg:hidden text-white invisible absolute w-full">Drag and Drop</span>
                <span class="mt-1 lg:ml-2 hidden lg:block text-white invisible lg:visible">Drag & drop your image here or</span>
            </div>

            <label for="movieImage" class="flex justify-center h-10 w-36 mt-1 bg-[#462676] text-white px-2 py-2">{{$t("feed.choose_file")}}</label
            >
            </div>

            <input type="file" class="placeholder-white text-white hidden" @input="setValue" id="movieImage" placeholder="Choose file" />
        </div>
    </Field> 
</div>
</template>

<script setup>
import { Field} from 'vee-validate';
import { ref } from 'vue';
const fileModel = ref(null);

function setValue(e) {
    fileModel.value = e.target.files[0];
}
function onDrop(e) {
  e.preventDefault();
  fileModel.value = e.dataTransfer.files[0];
  console.log(fileModel.value);
}
</script>