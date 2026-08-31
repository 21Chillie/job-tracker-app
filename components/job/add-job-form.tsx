"use client";

import { FieldContent, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useFormAddJob } from "@/lib/hooks/use-job-form.hook";
import {
  ApplicationStatusOptions,
  PositionTypeOptions,
} from "@/types/job.type";
import { Link } from "lucide-react";
import { Separator } from "../ui/separator";

export default function AddJobForm() {
  const form = useFormAddJob();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    e.stopPropagation();

    form.handleSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup className="flex flex-col gap-3">
        <FieldLabel>Position</FieldLabel>
        <FieldContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <form.AppField name="jobTitle">
            {(field) => (
              <field.InputTextField
                type="text"
                label="Job Title"
                placeholder="e.g. Fullstack Developer"
                required={true}
              />
            )}
          </form.AppField>

          <form.AppField name="positionType">
            {(field) => (
              <field.SelectInputField
                data={PositionTypeOptions}
                label="Position Type"
                placeholder="Select a position type"
              />
            )}
          </form.AppField>
        </FieldContent>
      </FieldGroup>

      <Separator className="my-5" />

      <FieldGroup className="flex flex-col gap-3">
        <FieldLabel>Company</FieldLabel>

        <FieldContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <form.AppField name="company">
            {(field) => (
              <field.InputTextField
                type="text"
                label="Company Name"
                required={true}
                placeholder="e.g. Chillie Inc."
              />
            )}
          </form.AppField>

          <form.AppField name="location">
            {(field) => (
              <field.InputTextField
                type="text"
                label="Location"
                placeholder="e.g. Singapore or Remote"
              />
            )}
          </form.AppField>
        </FieldContent>
      </FieldGroup>

      <Separator className="my-5" />

      <FieldGroup className="flex flex-col gap-3">
        <FieldLabel>Application</FieldLabel>
        <FieldContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <form.AppField name="jobUrl">
            {(field) => (
              <field.InputTextField
                type="url"
                label="Job URL"
                placeholder="https://..."
                icon={<Link />}
              />
            )}
          </form.AppField>

          <form.AppField name="status">
            {(field) => (
              <field.SelectInputField
                data={ApplicationStatusOptions}
                label="Status"
              />
            )}
          </form.AppField>

          <form.AppField name="dateApplied">
            {(field) => (
              <field.DatePickerField label="Date Applied" required={true} />
            )}
          </form.AppField>
        </FieldContent>
      </FieldGroup>

      <Separator className="my-5" />

      <FieldGroup>
        <form.AppField name="notes">
          {(field) => (
            <field.TextAreaField
              className="text-sm"
              label="Notes"
              placeholder="Anything worth remembering — interview dates, contacts, follow-ups…"
            />
          )}
        </form.AppField>
      </FieldGroup>

      <div className="mt-6 flex justify-end gap-4">
        <form.AppForm>
          <form.ButtonSubmit size="lg" loadingLabel="Submitting">
            Submit
          </form.ButtonSubmit>

          <form.ButtonReset size="lg" variant="ghost">
            Reset
          </form.ButtonReset>
        </form.AppForm>
      </div>
    </form>
  );
}
