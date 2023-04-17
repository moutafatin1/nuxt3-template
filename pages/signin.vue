<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";

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
  <form @submit="onSubmit" class="mx-auto mt-24 flex max-w-2xl flex-col gap-4">
    <InputField name="username" placeholder="Username" />
    <InputField name="password" placeholder="Password" type="password" />
    <Button>Sign In</Button>
  </form>
</template>
