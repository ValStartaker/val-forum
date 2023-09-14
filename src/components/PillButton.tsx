import { PropsWithChildren } from "@elysiajs/html";

export const PillButton = ({ children }: PropsWithChildren) => (
  <button class="rounded-full bg-emerald-700 px-4 py-2.5 text-white transition-colors duration-200 ease-in-out hover:bg-emerald-600">
    {children}
  </button>
);
