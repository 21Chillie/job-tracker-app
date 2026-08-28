import BtnThemeToggle from "@/components/global/btn-theme-toggle";
import ButtonSignUp from "@/components/navigation/button-sign-up";
import LogoLink from "@/components/navigation/logo-link";
import { Suspense } from "react";
import { Loader } from "../motion/loader";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between">
      <div>
        <LogoLink />
      </div>

      <div className="flex items-center gap-2">
        <BtnThemeToggle variant="outline" size="icon" />

        <Suspense
          fallback={
            <Button>
              <Loader variant="spinner" /> Loading
            </Button>
          }
        >
          <ButtonSignUp targetURL="/dashboard" fallbackURL="/sign-up">
            Sign up
          </ButtonSignUp>
        </Suspense>
      </div>
    </nav>
  );
}
