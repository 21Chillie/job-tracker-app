import BtnThemeToggle from "@/components/global/btn-theme-toggle";
import ButtonSignUp from "@/components/navigation/button-sign-up";
import LogoLink from "@/components/navigation/logo-link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between">
      <div>
        <LogoLink />
      </div>

      <div className="flex items-center gap-2">
        <BtnThemeToggle variant="outline" size="icon" />

        <ButtonSignUp targetURL="/dashboard" fallbackURL="/sign-up">
          Sign up
        </ButtonSignUp>
      </div>
    </nav>
  );
}
