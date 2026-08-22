import BtnThemeToggle from "@/components/global/btn-theme-toggle";
import ButtonLink from "@/components/navigation/button-link";
import LogoLink from "@/components/navigation/logo-link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between">
      <div>
        <LogoLink />
      </div>

      <div className="flex items-center gap-2">
        <BtnThemeToggle
          variant="outline"
          size="icon"
        />

        <ButtonLink href="/sign-up">Sign up</ButtonLink>
      </div>
    </nav>
  );
}
