import { createRouter, createWebHistory } from "vue-router";
import TheLanding from '@/pages/TheLanding.vue';
import PersonalProfile from '@/pages/PersonalProfile.vue';
import NewsFeed from '@/pages/NewsFeed.vue';
import MovieList from '@/pages/MovieList.vue';
import SignIn from '@/components/Auth/SignIn.vue';
import CheckEmail from '@/components/Auth/CheckEmail.vue';
import CreateAccount from '@/components/Auth/CreateAccount.vue';
import EmailConfirm from '@/components/Auth/EmailConfirm.vue';
import EmailSent from '@/components/Auth/EmailSent.vue'
import ForgotPassword from '@/components/Auth/ForgotPassword.vue'
import NewPassword from '@/components/Auth/NewPassword.vue'
import PasswordSuccess from '@/components/Auth/PasswordSuccess.vue'
import NotFound from '@/components/Error/NotFound.vue'
import PageForbidden from '@/components/Error/PageForbidden.vue'


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
          path: '/email-sent',
          name: 'emailSent',
          component: EmailSent
        },
        {
          path: '/email-confirm',
          name: 'emailConfirm',
          component: EmailConfirm
        },
        {
          path: '/forgot-password',
          name: 'forgotPassword',
          component: ForgotPassword
        },
        {
          path: '/new-password',
          name: 'newPassword',
          component: NewPassword
        },
        {
          path: '/password-success',
          name: 'passwordSuccess',
          component: PasswordSuccess
        },
      ]
    },
    {
      path: "/profile",
      name: "profile",
      component: PersonalProfile,
    },
    {
      path: "/not-found",
      name: "notFound",
      component: NotFound,
    },
    {
      path: "/page-forbidden",
      name: "pageForbidden",
      component: PageForbidden,
    },
    {
      path: "/news-feed",
      name: "newsFeed",
      component: NewsFeed,
    },
    {
      path: "/movie-list",
      name: "movieList",
      component: MovieList,
    },
  ],
});

export default router;
