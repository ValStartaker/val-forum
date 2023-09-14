import { PropsWithChildren } from "@elysiajs/html";

export const BoardContainer = ({ children }: PropsWithChildren) => (
  <div class="mx-auto mt-4 h-full w-full rounded-3xl bg-white leading-none text-gray-900 shadow-md">
    {children}
  </div>
);
