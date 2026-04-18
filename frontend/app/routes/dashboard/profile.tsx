import ProfileForm from "@components/profile/ProfileForm";
import type { profileFormDataType } from "@hooks/user/useEditProfile.hook";
import type { Route } from "./+types/profile";
import profileService from "~/services/profile.service";
import toast from "react-hot-toast";
import { redirect } from "react-router";
import { getQueryClient } from "@configs/query-client.config";
import { sessionQueryOption } from "@hooks/auth/useSession.hook";

export default function Profile() {
  return (
    <>
      <ProfileForm></ProfileForm>
    </>
  );
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const queryClient = getQueryClient();
  const formData = await request.formData();
  const payload = Object.fromEntries(
    formData,
  ) as unknown as profileFormDataType;

  const { name, avatar, currentPassword, newPassword } = payload;

  try {
    if (name) {
      await profileService.update({ name, image: avatar });
    }

    if (currentPassword && newPassword) {
      await profileService.changePassword({
        currentPassword,
        newPassword,
      });
    }

    await queryClient.invalidateQueries(sessionQueryOption());

    toast.success("Profile updated successfully");
    return redirect("/profile");
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "An unexpected error occurred when trying to update profile";

    toast.error(errorMessage);

    return { error: errorMessage };
  }
}
