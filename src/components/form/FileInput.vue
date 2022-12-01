<template>
    <div class="flex items-center h-16 border-[0.06rem] mt-4 border-[#6C757D] rounded">
    <Field name="image" v-slot="{ meta, value }" v-model="fileModel">
        <div
            @dragover.prevent 
            @drop.prevent="onDrop"
            class="relative mt-4 bg-transparent border-1 border-gray-500 placeholder-white w-full px-2.5 py-4 rounded lg:py-2 outline-none"
            :class="{
            'border-red-500': !meta.valid && meta.touched,
            'border-green-500': meta.valid && meta.touched,
            // 'border-dotted border-4 border-blue-700': isDragging,
            }"
        >
            <div class="flex justify-between lg:justify-start lg:gap-3">
            <div v-if="fileModel" class="text-white">
                {{ fileModel.name }}
            </div>
            <div v-else class="flex gap-3 items-center">
                <img src="@/assets/photocamera.svg" />
                <span class="mt-1 text-white lg:hidden">Upload image</span>
                <span class="mt-1 text-white invisible lg:visible">Drag and Drop</span>
            </div>

            <label for="movieImage" class="bg-purple-500 px-2 py-2" >Choose File</label
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