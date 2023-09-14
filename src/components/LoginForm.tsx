export const LoginForm = () => (
  <div class="flex h-screen w-screen items-center justify-center">
    <div class="flex w-4/5 max-w-xl flex-col items-center gap-4 rounded-xl bg-white px-8 py-8 shadow-md ">
      <h1 class="text-3xl font-medium">Login</h1>

      <form
        class="mt-4 flex w-full flex-col gap-2 self-start text-lg"
        hx-post="/login"
        hx-target="#server-error"
      >
        <label
          class="mb-2 block text-sm font-bold uppercase tracking-wide text-gray-700"
          for="username"
        >
          Username
        </label>
        <input
          placeholder="Username"
          id="username"
          name="username"
          class="rounded border border-neutral-300 bg-neutral-50 px-3 py-2 placeholder:text-neutral-500"
        ></input>

        <label
          class="mb-2 mt-6 block text-sm font-bold uppercase tracking-wide text-gray-700"
          for="password"
        >
          Password
        </label>
        <input
          placeholder="Password"
          id="password"
          name="password"
          type="password"
          class="rounded border border-neutral-300 bg-neutral-50 px-3 py-2 placeholder:text-neutral-500"
        ></input>
        <div class="mt-8 flex w-full items-center justify-between">
          <p class="text-sm text-neutral-600 ">
            Don't have an account?{" "}
            <a
              href="/register"
              class="text-sky-700 transition-colors duration-200 ease-in-out hover:text-sky-600"
            >
              Register here
            </a>
          </p>
          <button class="w-max place-self-end rounded-md bg-emerald-700 px-4 py-2 text-lg font-medium text-white duration-200 ease-in-out hover:bg-emerald-600">
            Login
          </button>
        </div>
        <p id="server-error" class="text-red-600"></p>
      </form>
    </div>
  </div>
);
