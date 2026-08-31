import {
  ButtonReset,
  ButtonSubmit,
} from "@/components/form-input/button-submit";
import DatePickerField from "@/components/form-input/date-picker-field";
import InputTextField from "@/components/form-input/input-text-field";
import SelectInputField from "@/components/form-input/select-input-field";
import TextAreaField from "@/components/form-input/text-area-field";
import { fieldContext, formContext } from "@/lib/hooks/create-form.hook";
import { jobFormSchema, JobFormSchemaType } from "@/types/job.type";
import { createFormHook, revalidateLogic } from "@tanstack/react-form-nextjs";
import { toast } from "sonner";

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    InputTextField,
    TextAreaField,
    SelectInputField,
    DatePickerField,
  },
  formComponents: {
    ButtonSubmit,
    ButtonReset,
  },
});

const validationLogic = revalidateLogic();

export function useFormAddJob() {
  const defaultValues: JobFormSchemaType = {
    jobTitle: "",
    positionType: "FULL_TIME",
    company: "",
    location: "",
    jobUrl: "",
    status: "APPLIED",
    dateApplied: null,
    notes: "",
  };

  const form = useAppForm({
    defaultValues,
    validationLogic,
    validators: {
      onDynamicAsyncDebounceMs: 500,
      onDynamic: jobFormSchema,
    },

    // TODO: finish the logic and remove console log
    onSubmit: async (state) => {
      if (state.value.jobTitle) {
        console.log("ADD JOB: ", state.value);

        toast.success("Job added successfully");
      }
    },
  });

  return form;
}
