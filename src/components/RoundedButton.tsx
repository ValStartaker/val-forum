import { PropsWithChildren } from "@elysiajs/html";

export const RoundedButton = ({ children }: PropsWithChildren) => (
  <button class="rounded-md bg-emerald-700 px-4 py-2.5 text-white transition-colors duration-200 ease-in-out hover:bg-emerald-600">
    {children}
  </button>
);