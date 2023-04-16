<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";
const { handleSubmit, handleReset } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      test: z.string().min(1, "test is required"),
    })
  ),
});

const testSubmit = handleSubmit((data) => {
  console.log(data);
});
</script>

<template>
  <h1 class="text-3xl font-bold underline">Hello world!</h1>
  <form
    @submit="testSubmit"
    class="mx-6 mt-16 flex max-w-2xl flex-col gap-4 md:mx-auto"
  >
    <InputField name="test" placeholder="test value..." />
    <Button> <Icon name="heroicons:circle-stack" class="mr-2" /> Submit</Button>
  </form>
</template>
