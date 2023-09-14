import { Post } from "../db/schema.ts";

type BoardItemProps = {
  board: {
    name: string;
    description: string;
    slug: string;
    threadCount: number;
    postCount: number;
    latestPost?: Post;
  };
};

export const BoardItem = (props: BoardItemProps) => {
  return (
    <div class="flex w-full items-center justify-between border-b bg-white p-4 text-black">
      <div class="flex w-80 flex-col">
        <a
          href={`/board/${props.board.slug}`}
          class="text-xl font-medium leading-none text-sky-700 transition-colors duration-200 ease-in-out hover:text-sky-600"
        >
          {props.board.name}
        </a>
        <p class="opacity-80">{props.board.description}</p>
      </div>
      <p class="w-1/6">{props.board.threadCount}</p>
      <p class="w-1/6">{props.board.postCount}</p>
      <div class="flex w-1/4 flex-col gap-2">
        {props.board.latestPost ? (
          <>
            <a
              href="#"
              class="text-lg leading-none text-sky-700 transition-colors duration-200 ease-in-out hover:text-sky-600"
            >
              {props.board.latestPost.title}
            </a>
            <p class="text-sm leading-none">
              by{" "}
              <a
                href="#"
                class="text-sky-700 transition-colors duration-200 ease-in-out hover:text-sky-600"
              >
                {props.board.latestPost.author_id}
              </a>
            </p>
            <p class="text-sm leading-none opacity-70">
              {new Intl.DateTimeFormat(undefined, {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date(props.board.latestPost.creationDate))}
            </p>
          </>
        ) : (
          <p class="text-sm leading-none opacity-70">No posts yet</p>
        )}
      </div>
    </div>
  );
};
