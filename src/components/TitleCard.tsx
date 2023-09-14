import { PillButton } from "./PillButton";

export const TitleCard = ({ isAuth }: { isAuth: boolean }) => (
  <div class="bg-white pb-5 shadow-md">
    <div class="container mx-auto max-w-5xl pt-5">
      <div class="flex justify-between ">
        <h1 class="text-3xl font-medium">Val's Forum</h1>
        <div>
          {isAuth ? (
            <div class="flex gap-6">
            <PillButton>Profile</PillButton>
            <PillButton><div hx-post="/logout" HX-Refresh="/">Log Out</div></PillButton>
            </div>
          ) : (
            <div class="flex gap-6">
              <PillButton>
                <a href="/login">Login</a>
              </PillButton>
              <PillButton>
                <a href="/register">Register</a>
              </PillButton>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
