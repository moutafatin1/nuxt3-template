export default defineNuxtRouteMiddleware((to, from) => {
  const currentUser = useCurrentUser();

  if (currentUser.value) {
    return navigateTo("/");
  }
});
