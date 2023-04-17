import superjson from "superjson";
import { SignInDto } from "~/server/api/auth/signin.post";
import { CurrentUser } from "~/types";
export default () => {
  const currentUser = useCurrentUser();

  async function signin(signinDto: SignInDto) {
    const { data, error } = await useFetch("/api/auth/signin", {
      method: "POST",
      body: {
        ...signinDto,
      },
      transform: (value) =>
        superjson.parse<CurrentUser>(value as unknown as string),
    });

    if (error.value) {
      console.dir(error.value); // TODO: Handle Error
    }
    currentUser.value = data.value;
    await navigateTo("/protected");
  }

  async function logout() {
    try {
      await $fetch("/api/auth/logout", { method: "DELETE" });
      currentUser.value = null;
      await navigateTo("/signin");
    } catch (error) {
      console.log(error);
    }
  }

  async function me() {
    if (!currentUser.value) {
      const { data, error } = await useFetch("/api/auth/me", {
        headers: useRequestHeaders(["cookie"]) as HeadersInit,
        transform: (value) =>
          superjson.parse<CurrentUser>(value as unknown as string),
      });
      currentUser.value = data.value;
    }
    return currentUser;
  }
  return {
    signin,
    logout,
    me,
  };
};
