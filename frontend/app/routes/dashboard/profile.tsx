import { DangerousZone } from "@components/profile/DangerZone";
import ProfileForm from "@components/profile/ProfileForm";
import { getQueryClient } from "@configs/query-client.config";
import { sessionQueryOption } from "@hooks/auth/useSession.hook";
import type { profileFormDataType } from "@hooks/user/useEditProfile.hook";
import authService from "@services/auth.service";
import profileService from "@services/profile.service";
import toast from "react-hot-toast";
import { redirect } from "react-router";
import type { Route } from "./+types/profile";

export default function Profile() {
  return (
    <>
      <ProfileForm></ProfileForm>
      <DangerousZone></DangerousZone>
    </>
  );
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const queryClient = getQueryClient();
  const formData = await request.formData();

  // This will decide which action will do:O
  // It's either `edit-profile` and `delete-account`
  const actionIntent = formData.get("action");

  try {
    switch (actionIntent) {
      case "edit-profile": {
        const data = Object.fromEntries(
          formData,
        ) as unknown as profileFormDataType;

        const { name, avatar, currentPassword, newPassword } = data;

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
      }

      case "delete-account": {
        const data = Object.fromEntries(formData) as unknown as {
          password: string;
        };

        if (!data.password || data.password.trim().length === 0) {
          return toast.error("Password is required to delete account");
        }

        const deleteSuccess = await authService.deleteAccount(data.password);

        if (deleteSuccess.success) {
          toast.success("Account deleted successfully");
          await queryClient.invalidateQueries(sessionQueryOption());
          return redirect("/login");
        }
      }
    }
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "An unexpected error occurred when trying to update profile";

    toast.error(errorMessage);

    return { error: errorMessage };
  }
}
