export const RegisterForm = () => (
  <div class="flex h-screen w-screen items-center justify-center">
    <div class="flex w-4/5 max-w-xl flex-col items-center gap-4 rounded-xl bg-white px-8 py-8 shadow-md">
      <h1 class="text-3xl font-medium">Register</h1>

      <form
        class="mt-4 flex w-full flex-col gap-2 self-start text-lg"
        action="/register"
        method="POST"
        _="
        on submit
      
        if #password's value is not equal to #confirm_password's value
          halt the event
          set #error_password_mismatch's innerText to 'Passwords do not match.'
        end
        "
      >
        <label
          class="mb-1 block text-sm font-bold uppercase tracking-wide text-gray-700"
          for="email"
        >
          Email
        </label>
        <input
          placeholder="Email"
          id="email"
          name="email"
          class="rounded border border-neutral-300 bg-neutral-50 px-3 py-2 placeholder:text-neutral-500"
        ></input>

        <label
          class="mb-1 mt-4 block text-sm font-bold uppercase tracking-wide text-gray-700"
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
          class="mb-1 mt-4 block text-sm font-bold uppercase tracking-wide text-gray-700"
          for="password"
        >
          Password
        </label>
        <input
          placeholder="***********"
          id="password"
          name="password"
          type="password"
          class="rounded border border-neutral-300 bg-neutral-50 px-3 py-2 placeholder:text-neutral-500"
        ></input>

        <label
          class="mb-1 mt-4 block text-sm font-bold uppercase tracking-wide text-gray-700"
          for="confirm_password"
        >
          Confirm password
        </label>
        <input
          placeholder="***********"
          id="confirm_password"
          type="password"
          class="rounded border border-neutral-300 bg-neutral-50 px-3 py-2 placeholder:text-neutral-500"
        ></input>

        <div class="mt-8 flex w-full items-center justify-between">
          <p class="text-sm text-neutral-600 ">
            Already have an account?{" "}
            <a
              href="/login"
              class="text-sky-700 transition-colors duration-200 ease-in-out hover:text-sky-600"
            >
              Login here
            </a>
          </p>
          <button class="w-max place-self-end rounded-md bg-emerald-700 px-4 py-2 text-lg font-medium text-white duration-200 ease-in-out hover:bg-emerald-600">
            Register
          </button>
        </div>
        <p id="error_password_mismatch" class="text-red-600"></p>
      </form>
    </div>
  </div>
);
