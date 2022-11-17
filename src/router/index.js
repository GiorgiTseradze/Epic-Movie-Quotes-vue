import { createRouter, createWebHistory } from "vue-router";
import TheLanding from '@/pages/TheLanding.vue';
import PersonalProfile from '@/pages/PersonalProfile.vue';
import SignIn from '@/components/Auth/SignIn.vue';
import CheckEmail from '@/components/Auth/CheckEmail.vue';
import CreateAccount from '@/components/Auth/CreateAccount.vue';
import EmailConfirm from '@/components/Auth/EmailConfirm.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: TheLanding,
      children: [
        {
          path: '/login',
          name: 'login',
          component: SignIn,
        },
        {
          path: '/check-email',
          name: 'checkEmail',
          component: CheckEmail,
        },
        {
          path: '/create-account',
          name: 'createAccount',
          component: CreateAccount
        },
        {
          path: '/email-confirm',
          name: 'emailConfirm',
          component: EmailConfirm
        }
      ]
    },
    {
      path: "/profile",
      name: "profile",
      component: PersonalProfile,
    },
  ],
});

export default router;
