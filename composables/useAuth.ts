import { SignInDto } from "~/server/api/auth/signin.post";
import { SignUpDto } from "~/server/api/auth/signup.post";
export default () => {
  const currentUser = useCurrentUser();

  async function signin(signinDto: SignInDto) {
    const { data, error } = await useFetch("/api/auth/signin", {
      method: "POST",
      body: {
        ...signinDto,
      },
    });
    if (error.value) {
      console.dir(error.value); // TODO: Handle Error
    }

    if (data.value) {
      currentUser.value = {
        ...data.value,
        createdAt: new Date(data.value.createdAt),
        updatedAt: new Date(data.value.updatedAt),
      };
    }
    await navigateTo("/protected");
  }

  async function signup(signupDto: SignUpDto) {
    const { data, error } = await useFetch("/api/auth/signup", {
      method: "POST",
      body: {
        ...signupDto,
      },
    });
    if (error.value) {
      console.dir(error.value); // TODO: Handle Error
    }

    if (data.value) {
      currentUser.value = convertToObjWithDates(data.value);

      await navigateTo("/protected");
    }
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
      });

      if (data.value) {
        currentUser.value = convertToObjWithDates(data.value);
      }
    }
    return currentUser;
  }
  return {
    signin,
    signup,
    logout,
    me,
  };
};

// create a function that convert object with string ISO dates to object with Date type with typescript
