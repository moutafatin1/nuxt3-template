<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";

useHead({
  title: "Sign In",
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

const { signin } = useAuth();

const onSubmit = handleSubmit(async (data) => {
  await signin(data);
});
</script>

<template>
  <div class="mx-auto mt-24 max-w-sm p-4">
    <h1 class="my-8 text-center text-5xl font-bold text-slate-700">Sign In</h1>
    <form @submit="onSubmit" class="flex flex-col gap-4">
      <InputField name="username" placeholder="Username" />
      <InputField name="password" placeholder="Password" type="password" />
      <Button>Sign In</Button>
    </form>
    <p class="mt-1 text-center text-sm text-gray-500">
      Don't have an account?
      <NuxtLink
        to="/signup"
        class="font-medium text-indigo-600 transition hover:text-indigo-800 hover:underline"
        >Sign Up</NuxtLink
      >
    </p>
  </div>
</template>
