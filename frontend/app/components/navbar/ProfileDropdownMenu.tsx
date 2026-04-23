import avatarProfileImg from "@components/profile/avatar-profile";
import { ModalBody, ModalButton } from "@components/reuse-ui/Modal";
import { useAppDispatch } from "@configs/store.config";
import { clearAuthState } from "@features/auth/authSlice";
import { sessionQueryOption } from "@hooks/auth/useSession.hook";
import authService from "@services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";

export default function ProfileDropdownMenu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: session } = useQuery(sessionQueryOption());

  if (!session) {
    return null;
  }

  const { name, email, image } = session.user;

  return (
    <>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-circle size-8">
          <img
            className="size-8 rounded-full object-cover"
            src={image ?? avatarProfileImg[0].file}
            alt="avatar image"
          />
        </div>
        <div
          tabIndex={0}
          className="dropdown-content card card-sm bg-base-100 border-base-300 z-1 mt-1 w-64 overflow-hidden border shadow-md"
        >
          <div className="card-body p-0">
            <div className="border-base-300 space-y-1 border-b p-4">
              <p className="text-base-content text-xs font-medium">{name}</p>
              <p className="text-base-content/70 text-xs">{email}</p>
            </div>

            <div className="space-y-2 p-4 pt-2">
              <Link
                className="btn btn-sm btn-ghost btn-block flex justify-start"
                to={"/profile"}
              >
                Your Profile
              </Link>

              <ModalButton
                buttonModalId="modalConfirmSignout"
                buttonName="Log Out"
                buttonGhost={true}
                buttonBlock={true}
                buttonSmall={true}
                textLeft={true}
              ></ModalButton>
            </div>
          </div>
        </div>
      </div>

      <ModalBody
        modalId="modalConfirmSignout"
        title="Confirm Log out"
        actionName="Log out"
        message="Are you sure you want to sign out? this will end your current session. You will need to re-authenticate to access your account data"
        action={{
          danger: true,
          method: () => {
            dispatch(authService.logout());
            dispatch(clearAuthState());
            navigate("/login");
          },
        }}
      ></ModalBody>
    </>
  );
}
