export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useCurrentUser();

  if (!user.value) {
    return navigateTo("/signin");
  }
});
