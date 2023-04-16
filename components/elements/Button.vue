<script lang="ts" setup>
import type { ButtonHTMLAttributes } from "vue";
interface Props extends ButtonHTMLAttributes {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}
withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "default",
});
const variants = {
  default: "bg-slate-900 text-white hover:bg-slate-700",
  danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
  outline: "bg-transparent border border-slate-200 hover:bg-slate-200",
  subtle: "bg-slate-100 text-slate-900 hover:bg-slate-200",
  ghost: "bg-transparent hover:bg-slate-100",
  link: "bg-transparent hover:underline text-slate-900 underline-offset-4",
};
const sizes = {
  default: "h-10 py-2 px-4",
  sm: "h-9 px-2 rounded-md",
  lg: "h-11 px-8 rounded-md",
};
</script>

<template>
  <button
    :class="
      cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size]
      )
    "
  >
    <slot />
  </button>
</template>
