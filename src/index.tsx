import { Elysia, t } from "elysia";
import { PropsWithChildren, html } from "@elysiajs/html";
import { TitleCard } from "./components/TitleCard";
import { BoardContainer } from "./components/BoardContainer";
import { BoardHeader } from "./components/BoardHeader";
import { BoardItem } from "./components/BoardItem";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { getBoardBySlug, getUserByUsername, registerUser } from "./db/queries";
import { Post, boards, posts, threads } from "./db/schema";
import { db } from "./db";
import { ThreadItem } from "./components/ThreadItem";
import { eq, sql } from "drizzle-orm";
import { jwt } from "@elysiajs/jwt";
import { cookie } from "@elysiajs/cookie";
import { ThreadHeader } from "./components/ThreadHeader";
import { RoundedButton } from "./components/RoundedButton";

const app = new Elysia()
  .use(html())
  .use(
    jwt({
      name: "jwt",
      secret: "Fischl von Luftschloss Narfidort",
    }),
  )
  .use(cookie())
  .get("/", async ({ jwt, cookie: { auth: authCookie } }) => {
    const isAuth = await jwt.verify(authCookie);
    const dbBoards = await db.select().from(boards).all();

    let boardInfo: {
      threadCount: number;
      postCount: number;
      latestPost?: Post;
    }[] = [];

    for (const board of dbBoards) {
      const threadCount = await db
        .select({ count: sql<number>`count(*)` })
        .from(threads)
        .where(eq(threads.board_slug, board.slug))
        .get();

      const postCount = await db
        .select({ count: sql<number>`count(*)` })
        .from(posts)
        .where(eq(posts.board_slug, board.slug))
        .get();

      const latestPost = await db
        .select()
        .from(posts)
        .where(eq(posts.board_slug, board.slug))
        .orderBy(posts.creationDate)
        .limit(1)
        .get();

      boardInfo.push({
        threadCount: threadCount?.count || 0,
        postCount: postCount?.count || 0,
        latestPost: latestPost,
      });
    }

    return (
      <BaseHtml>
        <div>
          <TitleCard isAuth={!!isAuth} />
          <div class="flex flex-col max-w-5xl items-end mx-auto">
          <BoardContainer>
            <BoardHeader />
            <div>
              {dbBoards.map((board, idx) => (
                <BoardItem
                  board={{
                    name: board.name,
                    description: board.description,
                    slug: board.slug,
                    threadCount: boardInfo[idx].threadCount,
                    postCount: boardInfo[idx].postCount,
                    latestPost: boardInfo[idx].latestPost,
                  }}
                />
              ))}
            </div>
          </BoardContainer>
          </div>
        </div>
      </BaseHtml>
    );
  })
  .get(
    "/board/:slug",
    async ({ params, set, jwt, cookie: { auth: authCookie } }) => {
      const isAuth = await jwt.verify(authCookie);
      const { slug } = params;
      const board = await getBoardBySlug(slug);

      const dbThreads = await db
        .select()
        .from(threads)
        .where(eq(threads.board_slug, slug))
        .all();

      if (!board) {
        set.status = 404;

        return;
      }

      let threadInfo: {
        postCount: number;
      }[] = [];
  
      for (const thread of dbThreads) {
        const postCount = await db
          .select({ count: sql<number>`count(*)` })
          .from(posts)
          .where(eq(posts.thread_slug, thread.slug))
          .get();

        threadInfo.push({
          postCount: postCount?.count || 0,
        });
      }
      return (
        <BaseHtml>
        <>
          <TitleCard isAuth={!!isAuth}/>
          <div class="flex flex-col max-w-5xl items-end mx-auto">
            <span class="max-w-xl mt-4"><RoundedButton>New Thread</RoundedButton></span>
            <BoardContainer>
              <ThreadHeader />

              {dbThreads.map((thread, idx) => (
                <ThreadItem
                  thread={{
                    title: thread.title,
                    content: thread.content,
                    postCount: threadInfo[idx].postCount,
                  }}
                />
              ))}
            </BoardContainer>
          </div>
          </>
        </BaseHtml>
      );
    },
    {
      params: t.Object({
        slug: t.String(),
      }),
    },
  )
  .get("/login", ({ html }) =>
    html(
      <BaseHtml>
        <LoginForm />
      </BaseHtml>,
    ),
  )
  .post(
    "/login",
    async ({ body, set, html, setCookie, jwt }) => {
      const user = await getUserByUsername(body.username);

      if (!user) {
        return html("Invalid credentials");
      }

      const isMatch = await Bun.password.verify(body.password, user.password);

      if (!isMatch) {
        return html("Invalid credentials");
      }

      setCookie("auth", await jwt.sign({ id: String(user.id) }), {
        httpOnly: true,
        maxAge: 7 * 86400,
      });

      set.headers["HX-Redirect"] = "/";
    },

    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
    },
  )
  .get("/register", ({ html }) =>
    html(
      <BaseHtml>
        <RegisterForm />
      </BaseHtml>,
    ),
  )
  .post(
    "/register",
    async ({ body, jwt, setCookie }) => {
      const hashedPassword = await Bun.password.hash(body.password);

      const user = await registerUser({
        email: body.email,
        username: body.username,
        password: hashedPassword,
      });

      setCookie("auth", await jwt.sign({ id: String(user.id) }), {
        httpOnly: true,
        maxAge: 7 * 86400,
      });
    },
    {
      body: t.Object({
        username: t.String(),
        email: t.String(),
        password: t.String(),
      }),
    },
  )
  .post("/logout", ({ removeCookie, set }) => {
    removeCookie("auth");
    set.headers["HX-Refresh"] = "true";
  })
  

  .get("/styles.css", () => Bun.file("./tailwind-gen/styles.css"))
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);

const BaseHtml = ({ children }: PropsWithChildren) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Val's Forum</title>
  <script src="https://unpkg.com/htmx.org@1.9.3"></script>
  <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
  <link href="/styles.css" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap" rel="stylesheet">
</head>
<body class="bg-neutral-100 text-neutral-900">${children}</body>
</html>
`;

/* <BoardItem
              title="General"
              description="General Discussion"
              threadsAmount={10}
              postsAmount={100}
              latestPost={{
                title: "Test",
                author: "Val",
                createdAt: new Intl.DateTimeFormat().format(new Date()),
              }}
            /> */
