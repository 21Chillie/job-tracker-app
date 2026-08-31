import { Button } from "@/components/ui/button";
import GoogleIcon from "@/public/assets/icons/google-color.svg";
import GithubIcon from "@icons-pack/react-simple-icons/icons/SiGithub";
import Image from "next/image";

export default function SocialAuthContainerFallback({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={className} aria-hidden="true">
      <Button type="button" variant={"outline"} className="flex-1">
        <Image src={GoogleIcon} width={16} height={16} alt="google icon" />{" "}
        Continue with Google
      </Button>

      <Button type="button" variant={"outline"} className="flex-1">
        <GithubIcon />
        Continue with Google
      </Button>
    </div>
  );
}
