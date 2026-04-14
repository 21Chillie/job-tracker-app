import api from "@configs/axiosInstance.config";
import type { AxiosResponse } from "axios";
import type { SessionType } from "~/types/user.type";

export async function getUserSession(request: Request) {
  try {
    const cookie = request.headers.get("cookie") || "";

    const response: AxiosResponse<SessionType> = await api.get(
      "/api/auth/get-session",
      {
        headers: {
          // Forward the user's cookie to the backend
          Cookie: cookie,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// export async function getUserSession(request: Request) {
//   const session = await getSession(request);

//   if (!session || !session.user) {
//     return null;
//   }

//   return session.user;
// }
