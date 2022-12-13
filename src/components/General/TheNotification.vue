
<template>
  <div v-if="notification" @click="handleNotification" class="flex justify-center top-20 lg:top-0 lg:right-0 fixed w-screen h-[100rem] z-40"></div>        
  <div class="z-41">
      <div @click="handleNotification" class="flex relative z-41 w-10 py-2 px-2">
          <img class="ml-[0.55rem] mt-1 cursor-pointer" src="@/assets/notification.svg" />
          <img v-if="unread>0" class="absolute w-5 ml-5" src="@/assets/red-circle.svg" />
          <p v-if="unread>0" class="absolute text-white text-xs mt-[0.1rem] ml-[1.65rem]">{{unread}}</p>
          <img v-if="notification" class="absolute hidden lg:block mt-8" src="@/assets/polygon.svg" />
      </div>
      
      <div v-if="notification" class="absolute flex flex-col items-center w-full lg:w-[40rem] 2xl:w-[50rem] right-0 lg:right-40 pb-10 top-20 bg-[#11101A] h-max z-50">
          <div class="flex flex-col h-max w-[22rem] lg:w-[40rem] 2xl:w-[50rem] overflow-scroll max-h-[25rem] lg:max-h-[35rem]">
              <div class="px-7 py-3 flex justify-between items-center text-white">
                  <p class="text-lg">{{ $t("texts.notifications") }}</p>
                  <p @click="handleRead" class="underline cursor-pointer pl-5">{{ $t("texts.mark_all_as_read") }}</p>
              </div>
              <div v-for="notif in notifications" class="flex mt-2 w-[20rem] lg:w-[37rem] 2xl:w-[47rem] ml-6 px-2 py-2 rounded border-[0.06rem] border-[#363A3E]">
                  <div class="flex flex-col justify-center items-center w-max lg:h-20 rounded-full">
                      <div class="rounded-full lg:w-18 lg:h-18"  :class="notif.read ? '' : 'border-2 border-[#179315ed] rounded-full'">
                          <img class="w-10 h-10 lg:w-16 lg:h-16 object-cover rounded-full" :src="notif.sender.thumbnail" />
                      </div>
                      <p v-if="!notif.read" class="mt-1 lg:hidden lg:text-lg border-[#179315ed]">{{ $t("texts.new") }}</p>
                  </div>
                  <div class="flex flex-col ml-4 lg:text-xl w-full justify-center">
                      <div class="hidden lg:flex items-center justify-between">
                          <p class="text-white">{{notif.sender.name}}</p>
                          <p class="text-[#CED4DA]">{{time_ago(notif.created_at)}}</p>
                      </div>
                      <div class="lg:flex items-center hidden py-1">
                          <img v-if="notif.type == 'comment'" class="w-5 lg:w-6" src="@/assets/thought.svg" />
                          <div class="flex justify-between w-full">
                              <p v-if="notif.type == 'like'" class="lg:text-xl text-[#CED4DA]">
                                <img class="w-5 lg:w-6 inline-block" src="@/assets/red-heart.svg" />
                                {{$t("texts.reacted_to_your_quote")}}
                              </p>
                              <p v-if="notif.type == 'comment'" class="ml-2 lg:text-xl text-[#CED4DA]">{{$t("texts.commented_to_your_movie_quote")}}</p>
                              <p v-if="!notif.read" class="mt-1 hidden lg:block lg:text-lg border-[#179315ed]">{{ $t("texts.new") }}</p>
                          </div>
                      </div>
                      
                      <div class="lg:hidden">
                          <p class="text-white">{{notif.sender.name}}</p>
                          <div class="flex py-1">
                            <p v-if="notif.type == 'like'" class="lg:text-xl text-[#CED4DA]">
                                <img class="w-5 lg:w-6 inline-block" src="@/assets/red-heart.svg" />
                                {{$t("texts.reacted_to_your_quote")}}
                              </p>
                              <img v-if="notif.type == 'comment'" class="w-5 lg:w-7" src="@/assets/thought.svg" />
                              <p v-if="notif.type == 'comment'" class="ml-2 lg:text-xl text-[#CED4DA]">{{$t("texts.commented_to_your_movie_quote")}}</p>
                          </div>
                          <p class="lg:hidden text-[#CED4DA]">{{time_ago(notif.created_at)}}</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/userStore.js";
import axiosInstance from "@/config/axios/index.js";
import i18n from '@/i18n/index.js';

const authStore = useAuthStore();
const router = useRouter();
const notification = ref(false);
const notifications = ref([]);
const unread = ref(0);

const getUnread = () => {
  unread.value = 0;
  notifications.value.forEach(x=> x.read == 0 ? unread.value++ : '')
}

const getNotifications = async () => {
  try {
      const response = await axiosInstance.get("/notifications/show");
          notifications.value = response.data;
          getUnread()
  } catch(error) {
      console.log(error);
  }
}

const handleRead = () => {
  unread.value = 0;
  axiosInstance
      .post("read")
      .then((response) => {
          getNotifications()
          console.log(response);
      })
      .catch((error) => {
        console.log(error);
      }); 
}

onMounted(()=> {
  getNotifications()
  getUnread()
})

setTimeout(() => {
  window.Echo.private("add-notification." + useUserStore().user.id).listen('.new-notification',(e)=>{
      notifications.value.unshift(e.notification);
      getUnread();
  })
  }, 
200);

const handleNotification = () => {
  notification.value = !notification.value
}

function time_ago(time) {
switch (typeof time) {
case 'number':
  break;
case 'string':
  time = +new Date(time);
  break;
case 'object':
  if (time.constructor === Date) time = time.getTime();
  break;
default:
  time = +new Date();
}

let time_formats = i18n.global.locale === 'en' ? [
[60, 'seconds', 1], // 60
[120, '1 minute ago', '1 minute from now'], // 60*2
[3600, 'minutes', 60], // 60*60, 60
[7200, '1 hour ago', '1 hour from now'], // 60*60*2
[86400, 'hours', 3600], // 60*60*24, 60*60
[172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
[604800, 'days', 86400], // 60*60*24*7, 60*60*24
[1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
[2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
[4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
[29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
[58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
[2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
[5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
[58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
] : [
[60, 'წამები', 1], // 60
[120, '1 წუთის', '1 minute from now'], // 60*2
[3600, 'წუთის', 60], // 60*60, 60
[7200, '1 საათის', '1 hour from now'], // 60*60*2
[86400, 'საათის', 3600], // 60*60*24, 60*60
[172800, 'გუშინ', 'Tomorrow'], // 60*60*24*2
[604800, 'დღის', 86400], // 60*60*24*7, 60*60*24
[1209600, 'წინა კვირა', 'Next week'], // 60*60*24*7*4*2
[2419200, 'კვირის', 604800], // 60*60*24*7*4, 60*60*24*7
[4838400, 'წინა თვე', 'Next month'], // 60*60*24*7*4*2
[29030400, 'თვეები', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
[58060800, 'წინა წელი', 'Next year'], // 60*60*24*7*4*12*2
[2903040000, 'წლები', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
[5806080000, 'წინა საუკუნე', 'Next century'], // 60*60*24*7*4*12*100*2
[58060800000, 'საუკუნეები', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
];
var seconds = (+new Date() - time) / 1000,
token = i18n.global.locale === 'en' ? 'ago' : 'წინ',
list_choice = 1;

if (seconds == 0) {
return i18n.global.locale === 'en' ? 'Just now' : 'ახლა'
}
if (seconds < 0) {
seconds = Math.abs(seconds);
token = 'from now';
list_choice = 2;
}
var i = 0,
format;
while (format = time_formats[i++])
if (seconds < format[0]) {
  if (typeof format[2] == 'string')
    return format[list_choice];
  else
    return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
}
return time;
}



</script>