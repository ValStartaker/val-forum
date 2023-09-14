import { InferModel, relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
});

export const boards = sqliteTable("boards", {
  id: text("id").primaryKey(),
  name: text("name").unique().notNull(),
  description: text("description").notNull(),
  slug: text("slug").unique().notNull(),
});

export const threads = sqliteTable("threads", {
  id: text("id").primaryKey(),
  author_id: text("author_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  creationDate: text("creationDate").notNull(),
  board_slug: text("board_slug").notNull(),
  slug: text("slug").unique().notNull(),
}); 

export const posts = sqliteTable("posts", {
  id: text("id").primaryKey(),
  author_id: text("author_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  creationDate: text("creationDate").notNull(),
  board_slug: text("board_slug").notNull(),
  thread_slug: text("thread_slug").notNull(),
});

export const boardsRelations = relations(boards, ({ many }) => ({
  threads: many(threads),
}));

export const threadsRelations = relations(threads, ({ many, one }) => ({
  posts: many(posts),
  board: one(boards, {
    fields: [threads.board_slug],
    references: [boards.slug]
  }),
  user: one(users, {
    fields: [threads.author_id],
    references: [users.id],
  }),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  thread: one(threads, {
    fields: [posts.id],
    references: [threads.id],
  }),
  user: one(users, {
    fields: [posts.author_id],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ many, one }) => ({
	posts: many(posts),
  threads: many(threads),
}));

// board -> threads
//          -> initial post -> replies

export type User = InferModel<typeof users>;
export type Boards = InferModel<typeof boards>;
export type Post = typeof posts.$inferSelect;
