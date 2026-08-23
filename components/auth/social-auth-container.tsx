"use client";

import SocialAuthButton from "@/components/auth/social-auth-button";
import GoogleIcon from "@/public/assets/icons/google-color.svg";
import { AuthErrorStatusTextType } from "@/types/auth.type";
import { getErrorMessage } from "@/utils/auth-helper";
import GithubIcon from "@icons-pack/react-simple-icons/icons/SiGithub";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function SocialAuthContainer({
  className,
}: {
  className?: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get("error") as AuthErrorStatusTextType | null;

  useEffect(() => {
    if (error) {
      const message = getErrorMessage(error);

      if (message) {
        toast.error(message, { duration: 3000 });
      }

      // Clean the url, to prevent this side effect of showing the error message on every page load
      router.replace(pathname, { scroll: false });
    }
  }, [error, router, pathname]);

  return (
    <div className={className}>
      <SocialAuthButton
        pathname={pathname}
        provider="google"
        variant="outline"
        className="flex-1">
        <Image
          src={GoogleIcon}
          width={16}
          height={16}
          alt="google icon"
        />{" "}
        Continue with Google
      </SocialAuthButton>

      <SocialAuthButton
        pathname={pathname}
        provider="github"
        variant="outline"
        className="flex-1">
        <GithubIcon />
        Continue with Github
      </SocialAuthButton>
    </div>
  );
}
