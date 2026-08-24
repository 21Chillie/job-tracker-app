import ButtonLink from "@/components/global/button-link";
import { checkSession } from "@/services/auth/auth-session.server";
import { ButtonLinkProps } from "@/types/global.type";

export default async function ButtonStarted({
  target,
  targetURL,
  fallbackURL,
  children,
  variant = "default",
  size = "default",
  className,
}: Omit<ButtonLinkProps, "href"> & { targetURL: string; fallbackURL: string }) {
  const session = await checkSession();
  const isSessionAvailable = session !== null;

  return (
    <ButtonLink
      target={target}
      className={className}
      size={size}
      variant={variant}
      href={isSessionAvailable ? targetURL : fallbackURL}>
      {children}
    </ButtonLink>
  );
}
