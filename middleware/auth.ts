import { defineNuxtRouteMiddleware, useCookie } from 'nuxt/app';

export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('auth_token');

  if (!token.value) {
    return navigateTo('/login');
  }
});
