<script setup lang="ts">
import { useField } from "vee-validate";
import type { InputHTMLAttributes } from "vue";
interface Props extends InputHTMLAttributes {
  name: string;
}
const props = defineProps<Props>();
const { value, errorMessage } = useField(() => props.name);
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <label class="w-full">
    <input
      type="text"
      class="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      v-model="value"
      v-bind="$attrs"
    />
    <p v-show="errorMessage" class="mt-1 text-sm text-red-500">
      {{ errorMessage }}
    </p>
  </label>
</template>
