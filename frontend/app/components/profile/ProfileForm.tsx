import { useAppDispatch } from "@configs/store.config";
import { sessionQueryOption } from "@hooks/auth/useSession.hook";
import { useEditProfile } from "@hooks/user/useEditProfile.hook";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LuEye, LuEyeOff, LuKeyRound } from "react-icons/lu";
import { useNavigate } from "react-router";
import avatarProfileImg from "./avatar-profile";
import authService from "@services/auth.service";
import { ModalBody, ModalButton } from "@components/reuse-ui/Modal";

export default function ProfileForm() {
  const { data: session } = useQuery(sessionQueryOption());
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [viewCurrentPassword, setViewCurrentPassword] = useState(false);
  const [viewNewPassword, setViewNewPassword] = useState(false);

  const { handleSubmit, Subscribe, Field } = useEditProfile({
    name: session?.user.name ?? "",
    email: session?.user.email ?? "",
    avatar: session?.user.image ?? avatarProfileImg[0].file,
  });

  const handleEditProfile = (e: React.SubmitEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit();
  };

  if (!session) return null;

  return (
    <>
      <section
        id="section-job-form"
        className="bg-base-100 border-base-300 m-3 max-w-4xl space-y-3 rounded-xl border py-4 shadow-md max-sm:mb-16 md:m-4 md:py-6 xl:mx-auto"
      >
        <header className="border-b-base-300 space-y-1 border-b px-4 pb-3 md:px-6">
          <div className="badge badge-soft badge-primary badge-sm">Profile</div>
          <h2 className="text-2xl font-semibold">Update Profile</h2>
          <p className="text-base-content/60 text-xs font-medium text-pretty md:text-sm">
            Change the details of your profile here.
          </p>
        </header>

        <form
          className="grid grid-cols-2 gap-3 px-4 md:px-6"
          onSubmit={handleEditProfile}
        >
          <Field name="name">
            {(field) => {
              const { errors } = field.state.meta;

              return (
                <fieldset className="fieldset col-span-2">
                  <legend className="fieldset-legend">Full Name</legend>
                  <input
                    type="text"
                    id={field.name}
                    name={field.name}
                    className="input input-sm md:input-md focus-within:outline-primary/20 focus-within:border-primary/50 w-full"
                    placeholder="John Doe"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />

                  {errors && (
                    <div className="space-y-1">
                      {errors.map((err, index) => (
                        <p
                          key={`fieldNameErr${index}`}
                          className="text-error text-xs"
                        >
                          {err?.message}
                        </p>
                      ))}
                    </div>
                  )}
                </fieldset>
              );
            }}
          </Field>

          <Field name="email">
            {(field) => {
              const { errors } = field.state.meta;

              return (
                <fieldset className="fieldset col-span-2">
                  <legend className="fieldset-legend">Email</legend>
                  <input
                    type="text"
                    id={field.name}
                    name={field.name}
                    className="input input-sm md:input-md focus-within:outline-primary/20 focus-within:border-primary/50 w-full"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    disabled
                  />

                  {errors && (
                    <div className="space-y-1">
                      {errors.map((err, index) => (
                        <p
                          key={`fieldNameErr${index}`}
                          className="text-error text-xs"
                        >
                          {err?.message}
                        </p>
                      ))}
                    </div>
                  )}
                </fieldset>
              );
            }}
          </Field>

          <Field name="currentPassword">
            {(field) => {
              const { errors } = field.state.meta;

              return (
                <fieldset className="fieldset col-span-2 md:col-span-1">
                  <legend className="fieldset-legend">Current Password</legend>
                  <label className="input focus-within:outline-primary/20 focus-within:border-primary/50 w-full">
                    <span>
                      <LuKeyRound className="text-base-content/50 size-4" />
                    </span>
                    <input
                      className="grow"
                      type={viewCurrentPassword ? "text" : "password"}
                      id={field.name}
                      name={field.name}
                      placeholder="Type your current password here"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setViewCurrentPassword(!viewCurrentPassword)
                      }
                    >
                      {viewCurrentPassword ? <LuEyeOff /> : <LuEye />}
                    </button>
                  </label>

                  {errors.length > 0 ? (
                    <div className="space-y-1">
                      {errors.map((err, index) => (
                        <p
                          key={`fieldCurrentPasswordErr${index}`}
                          className="label text-error whitespace-normal"
                        >
                          {err?.message}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="label whitespace-normal">
                      Required, if you want to set a new password
                    </p>
                  )}
                </fieldset>
              );
            }}
          </Field>

          <Field name="newPassword">
            {(field) => {
              const { errors } = field.state.meta;

              return (
                <fieldset className="fieldset col-span-2 md:col-span-1">
                  <legend className="fieldset-legend">New Password</legend>
                  <label className="input focus-within:outline-primary/20 focus-within:border-primary/50 w-full">
                    <span>
                      <LuKeyRound className="text-base-content/50 size-4" />
                    </span>
                    <input
                      className="grow"
                      type={viewNewPassword ? "text" : "password"}
                      id={field.name}
                      name={field.name}
                      placeholder="Type your new password here"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />

                    <button
                      type="button"
                      onClick={() => setViewNewPassword(!viewNewPassword)}
                    >
                      {viewNewPassword ? <LuEyeOff /> : <LuEye />}
                    </button>
                  </label>

                  {errors.length > 0 ? (
                    <div className="space-y-1">
                      {errors.map((err, index) => (
                        <p
                          key={`fieldNewPasswordErr${index}`}
                          className="label text-error whitespace-normal"
                        >
                          {err?.message}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="label whitespace-normal">
                      Must be 8+ characters, includes uppercase and number
                    </p>
                  )}
                </fieldset>
              );
            }}
          </Field>

          <Field name="avatar">
            {(field) => {
              const { errors } = field.state.meta;

              return (
                <fieldset className="fieldset col-span-2">
                  <legend className="fieldset-legend">Avatar</legend>
                  <ul className="mt-1 flex flex-wrap gap-3">
                    {avatarProfileImg.map((avatar) => {
                      const { id, file } = avatar;
                      const isSelected = field.state.value === file;

                      return (
                        <li key={id}>
                          <button
                            key={id}
                            type="button"
                            id="fAvatar"
                            name="fAvatar"
                            className={`btn btn-lg btn-circle ${isSelected ? "outline-primary outline-3" : "outline-primary/30 hover:outline-3"}`}
                            onClick={() => {
                              field.handleChange(file);
                            }}
                          >
                            <img
                              className="rounded-full object-cover"
                              src={file}
                              alt={`select avatar profile ${id}`}
                            />
                          </button>
                        </li>
                      );
                    })}
                  </ul>

                  {errors.length > 0 && (
                    <div className="space-y-1">
                      {errors.map((err, index) => (
                        <p
                          key={`fieldNameErr${index}`}
                          className="text-error text-xs"
                        >
                          {err?.message}
                        </p>
                      ))}
                    </div>
                  )}
                </fieldset>
              );
            }}
          </Field>

          <div className="col-span-2 mt-6 flex flex-wrap justify-end gap-4">
            <ModalButton
              buttonName="Log Out"
              buttonGhost={true}
              buttonBlock={false}
              buttonSmall={false}
              textLeft={true}
            ></ModalButton>

            <Subscribe
              selector={(state) => [state.isSubmitting, state.canSubmit]}
            >
              {([isSubmitting, canSubmit]) => (
                <button
                  type="submit"
                  disabled={isSubmitting || !canSubmit}
                  className="btn btn-primary"
                >
                  {isSubmitting ? (
                    <span className="loading loading-spinner"></span>
                  ) : null}{" "}
                  Save profile
                </button>
              )}
            </Subscribe>
          </div>
        </form>
      </section>

      <ModalBody
        title="Confirm Sign Out"
        message="Are you sure you want to sign out? this will end your current session. You will need to re-authenticate to access your account data"
        action={{
          danger: true,
          method: () => {
            dispatch(authService.logout());
            navigate("/login");
          },
        }}
      ></ModalBody>
    </>
  );
}
