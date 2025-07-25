export default defineNuxtRouteMiddleware(async (to) => {
  const id = to.params.id;

  const isValid = typeof id === 'string' && /^\d+$/.test(id);

  if (!isValid) {
    console.warn(`[middleware] Formation ID "${id}" invalide`);
    return navigateTo('/dashboard');
  }
});
