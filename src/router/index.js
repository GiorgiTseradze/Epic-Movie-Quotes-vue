import { createRouter, createWebHistory } from "vue-router";
import TheLanding from '@/pages/TheLanding.vue';
import PersonalProfile from '@/pages/PersonalProfile.vue';
import NewsFeed from '@/pages/NewsFeed.vue';
import MovieList from '@/pages/MovieList.vue';
import CurrentMovie from '@/pages/CurrentMovie.vue';
import SignIn from '@/components/Auth/SignIn.vue';
import CheckEmail from '@/components/Auth/CheckEmail.vue';
import CreateAccount from '@/components/Auth/CreateAccount.vue';
import EmailConfirm from '@/components/Auth/EmailConfirm.vue';
import EmailSent from '@/components/Auth/EmailSent.vue';
import ForgotPassword from '@/components/Auth/ForgotPassword.vue';
import NewPassword from '@/components/Auth/NewPassword.vue';
import PasswordSuccess from '@/components/Auth/PasswordSuccess.vue';
import NotFound from '@/components/Error/NotFound.vue';
import PageForbidden from '@/components/Error/PageForbidden.vue';
import NewUsername from '@/components/Profile/NewUsername.vue';
import MakeChanges from '@/components/Profile/MakeChanges.vue';
import ChangeSuccessfull from '@/components/Profile/ChangeSuccessfull.vue';
import ProfileNewPassword from '@/components/Profile/ProfileNewPassword.vue';
import ProfileEmail from '@/components/Profile/ProfileEmail.vue';
import NewEmailDesktop from '@/components/Profile/NewEmailDesktop.vue';
import NewEmailConfirm from '@/components/Profile/NewEmailConfirm.vue';
import NewEmail from '@/components/Profile/NewEmail.vue';
import EmailSuccessfull from '@/components/Profile/EmailSuccessfull.vue';
import AddMovie from '@/components/Movie/AddMovie.vue';
import AddMovieQuote from '@/components/Movie/AddMovieQuote.vue';
import UpdateMovie from '@/components/Movie/UpdateMovie.vue';
import AddQuote from '@/components/Quote/AddQuote.vue';
import UpdateQuote from '@/components/Quote/UpdateQuote.vue';
import CurrentQuote from '@/components/Quote/CurrentQuote.vue';
import isAuthenticated from "./guards";
import { useAuthStore } from "@/stores/auth";
import axios from "@/config/axios/jwt-axios.js";
import { useUserStore } from "../stores/userStore";

// axios.defaults.withCredentials = true;

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
      beforeEnter: isAuthenticated,
      children: [
        {
          path: '/new-username',
          name: 'newUsername',
          component: NewUsername
        },
        {
          path: '/make-changes',
          name: 'makeChanges',
          component: MakeChanges
        },
        {
          path: '/change-successfull',
          name: 'changeSuccessfull',
          component: ChangeSuccessfull
        },
        {
          path: '/profile-new-password',
          name: 'profileNewPassword',
          component: ProfileNewPassword
        },
        {
          path: '/profile-email',
          name: 'profileEmail',
          component: ProfileEmail
        },
        {
          path: '/new-email',
          name: 'newEmail',
          component: NewEmail
        },
        {
          path: '/email-successfull',
          name: 'emailSuccessfull',
          component: EmailSuccessfull
        },
        {
          path: '/new-email-desktop',
          name: 'newEmailDesktop',
          component: NewEmailDesktop
        },
        {
          path: '/new-email-confirm',
          name: 'newEmailConfirm',
          component: NewEmailConfirm
        }
      ]
    },
    {
      path: "/:pathMatch(.*)",
      name: "notFound",
      component: NotFound,
    },
    {
      path: "/forbidden",
      name: "pageForbidden",
      component: PageForbidden,
    },
    {
      path: "/news-feed",
      name: "newsFeed",
      component: NewsFeed,
      beforeEnter: isAuthenticated,
      children: [
        {
          path: '/add-quote',
          name: 'addQuote',
          component: AddQuote
        },
        {
          path: '/update-quote/:quoteId',
          name: 'updateQuote',
          component: UpdateQuote
        },
        {
          path: "/current-quote/:quoteId",
          name: 'currentQuote',
          component: CurrentQuote
        },
      ]
    },
    {
      path: "/movie-list",
      name: "movieList",
      component: MovieList,
      beforeEnter: isAuthenticated,
      children: [
        {
          path: '/add-movie',
          name: 'addMovie',
          component: AddMovie
        },
      ]
    },
    {
      path: "/current-movie/:movieId",
      name: "currentMovie",
      component: CurrentMovie,
      beforeEnter: isAuthenticated,
      children: [
        {
          path: '/update-movie/:movieId',
          name: 'updateMovie',
          component: UpdateMovie
        },
        {
          path: '/add-movie-quote/:movieId',
          name: 'addMovieQuote',
          component: AddMovieQuote
        },
      ]
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const userStore = useUserStore();

  if (authStore.authenticated === null) {
    try {axios
      await axios.get(`${import.meta.env.VITE_API_BASE_URL}/me`);
      authStore.authenticated = true;
      userStore.getUser();
    } catch (err) {
      authStore.authenticated = false;
      router.push({name: 'landing'});
    } finally {
      return next();
    }
  }
  return next();
});

export default router;
