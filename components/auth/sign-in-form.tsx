"use client";

import { FieldGroup } from "@/components/ui/field";
import { useFormSignIn } from "@/hooks/use-form-auth.hook";
import { Key, Mail } from "lucide-react";

export default function SignInForm() {
  const form = useFormSignIn();
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    e.stopPropagation();

    form.handleSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup className="gap-4">
        <form.AppField name="email">
          {(field) => {
            return (
              <field.InputTextField
                type="email"
                label="Email"
                placeholder="Enter your email address"
                required={true}
                icon={<Mail />}
              />
            );
          }}
        </form.AppField>

        <form.AppField name="password">
          {(field) => {
            return (
              <field.InputPasswordField
                label="Password"
                placeholder="Create strong password"
                required={true}
                icon={<Key />}
                fieldDescription="Must be 8+ characters, includes uppercase and number."
              />
            );
          }}
        </form.AppField>

        <form.AppForm>
          <form.ButtonSubmit
            size="lg"
            className="mt-6 mb-2"
            loadingLabel="Please wait trying to sign in">
            Sign in with email
          </form.ButtonSubmit>
        </form.AppForm>
      </FieldGroup>
    </form>
  );
}
