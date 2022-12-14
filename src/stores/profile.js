import { defineStore } from "pinia";
import { ref,computed } from "vue";
import { useRouter } from 'vue-router';
import { useUserStore } from "@/stores/userStore.js";


export const useProfileStore = defineStore("profile", () => {
const router = useRouter();
const userImage = computed(()=>useUserStore().user?.thumbnail)
  const newUsername = ref(false);

  const handleNewUsername = () => {
    router.push({name: 'newUsername'})
    newUsername.value = true
}

const newPassword = ref(false);

const handleNewPassword = () => {
  router.push({name: 'profileNewPassword'})
  newPassword.value = true
}

const newEmail = ref(false);

const handleNewEmail = () => {
  router.push({name: 'profileEmail'})
  newEmail.value = true
}

const success = ref(false);

const handleSuccess = () => {
  success.value = false
}

const emailSuccess = ref(false);

const handleEmailSuccess = () => {
  emailSuccess.value = false
}


return { newUsername, handleNewUsername, newPassword, handleNewPassword, 
  newEmail, handleNewEmail, success, handleSuccess, emailSuccess, handleEmailSuccess,userImage };
});