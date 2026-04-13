import { Link } from "react-router";
import type { UserNavbarType } from "~/types/global.type";
import { ModalBody, ModalButton } from "../Modal";
import authClient from "~/utils/auth/auth-client";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function ProfileDropdownMenu({
  name,
  email,
  image,
}: UserNavbarType) {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState(image || "/mob-psycho.webp");

  return (
    <>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-circle size-8">
          <img
            className="rounded-full"
            src={imgSrc}
            alt="avatar image"
            onError={() => setImgSrc("mob-psycho.webp")}
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
                buttonName="Sign Out"
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
        title="Confirm Sign Out"
        message="Are you sure you want to sign out? this will end your current session. You will need to re-authenticate to access your account data"
        action={{
          danger: true,
          method: () => {
            authClient.signOut();
            navigate("/login");
          },
        }}
      ></ModalBody>
    </>
  );
}
