import { DangerZoneSkeleton } from "@components/profile/skeleton/DangerZoneSkeleton";
import { ProfileFormSkeleton } from "@components/profile/skeleton/ProfileFormSkeleton";
import { getQueryClient } from "@configs/query-client.config";
import { sessionQueryOption } from "@hooks/auth/useSession.hook";
import type { profileFormDataType } from "@hooks/user/useEditProfile.hook";
import authService from "@services/auth.service";
import profileService from "@services/profile.service";
import { lazy, Suspense } from "react";
import toast from "react-hot-toast";
import { redirect } from "react-router";
import type { Route } from "./+types/profile";

const ProfileForm = lazy(() => import("@components/profile/ProfileForm"));
const DangerZone = lazy(() => import("@components/profile/DangerZone"));

export default function Profile() {
  return (
    <>
      <Suspense fallback={<ProfileFormSkeleton />}>
        <ProfileForm></ProfileForm>
      </Suspense>

      <Suspense fallback={<DangerZoneSkeleton />}>
        <DangerZone></DangerZone>
      </Suspense>
    </>
  );
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const queryClient = getQueryClient();
  const formData = await request.formData();

  // This will decide which action will run:
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

        await queryClient.invalidateQueries({ queryKey: ["user"] });

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
        }

        queryClient.clear();
        return redirect("/login");
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
