<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";

useHead({
  title: "Sign Up",
});

definePageMeta({
  middleware: "guest",
});

const { handleSubmit, handleReset } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      username: z.string().min(4, "Username must be at least 4 characters"),
      password: z.string().min(4, "Password must be at least 4 characters"),
    })
  ),
});

const { signup } = useAuth();

const onSubmit = handleSubmit(async (data) => {
  await signup(data);
});
</script>

<template>
  <div class="mx-auto mt-24 max-w-sm p-4">
    <h1 class="my-8 text-center text-5xl font-bold text-slate-700">Sign Up</h1>
    <form @submit="onSubmit" class="flex flex-col gap-4">
      <InputField name="username" placeholder="Username" />
      <InputField name="password" placeholder="Password" type="password" />
      <Button>Sign In</Button>
    </form>
    <p class="mt-1 text-center text-sm text-gray-500">
      Already have an account?
      <NuxtLink
        to="/signin"
        class="font-medium text-indigo-600 transition hover:text-indigo-800 hover:underline"
        >Sign In</NuxtLink
      >
    </p>
  </div>
</template>
