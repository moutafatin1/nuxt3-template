import { ClassArray, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export default (...classes: ClassArray) => twMerge(clsx(classes));
