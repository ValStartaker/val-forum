type ThreadItemProps = {
  thread: {
    title: string;
    content: string;
    postCount: number;
  };
};

export const ThreadItem = (props: ThreadItemProps) => (
  <div class="flex w-full items-center justify-between border-b bg-white p-4 text-black">
    <div class="flex w-80 flex-col">
      <a
        href="#"
        class="text-xl font-medium leading-none text-sky-700 transition-colors duration-200 ease-in-out hover:text-sky-600"
      >
        {props.thread.title}
      </a>
      <p class="opacity-80">{props.thread.content}</p>
      <p>{props.thread.postCount}</p>
    </div>
  </div>
);
