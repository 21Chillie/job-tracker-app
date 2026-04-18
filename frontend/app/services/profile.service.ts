import authClient from "~/configs/auth-client";

const profileService = {
  update: async ({ name, image }: { name?: string; image?: string }) => {
    const { data, error } = await authClient.updateUser({
      name,
      image,
    });

    if (error) throw new Error(error.message);

    return data;
  },

  changePassword: async ({
    currentPassword,
    newPassword,
  }: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const { data, error } = await authClient.changePassword({
      currentPassword,
      newPassword,
    });

    if (error) throw new Error(error.message);

    return data;
  },
};

export default profileService;
