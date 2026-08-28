export const avatarImageFallback =
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

export function getNameInitials(name: string | null | undefined): string {
  const trimmed = (name ?? "").trim();
  if (!trimmed) return "?";

  const parts = trimmed.split(/\s+/).filter(Boolean);
  const first = parts[0].charAt(0).toUpperCase();
  const second =
    parts.length > 1
      ? parts[parts.length - 1].charAt(0).toUpperCase()
      : parts[0].charAt(1).toUpperCase();

  return first + second;
}
