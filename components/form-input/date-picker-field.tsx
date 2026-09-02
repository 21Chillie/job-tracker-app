"use client";

import DynamicFieldDescription from "@/components/form-input/dynamic-field-errors";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { useFieldContext } from "@/lib/hooks/create-form.hook";
import { toCalendarDate } from "@/utils/job-helper";
import { CalendarDate, getLocalTimeZone } from "@internationalized/date";
import { Calendar as CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  label?: string;
  required?: boolean;
  fieldDescription?: string;
};

export default function DatePickerField({
  label,
  required = false,
  fieldDescription,
}: Props) {
  const { name, state, handleChange } = useFieldContext<Date | null>();
  const [today, setToday] = useState<CalendarDate | null>(null);

  useEffect(() => {
    (function () {
      const date = toCalendarDate(new Date());
      setToday(date);
      // Register today as the field value so the displayed date is
      // actually submitted even if the user never opens the picker.
      handleChange(date.toDate(getLocalTimeZone()));
    })();
  }, [handleChange]);

  const visibleDate = state.value
    ? toCalendarDate(state.value)
    : (today ?? new CalendarDate(2000, 1, 1));

  return (
    <Field>
      <FieldLabel htmlFor={name}>
        {" "}
        {label && (
          <FieldLabel className="text-xs" htmlFor={name}>
            {label} {required && <span className="text-destructive">*</span>}
          </FieldLabel>
        )}
      </FieldLabel>

      <PopoverTrigger>
        <Button
          name={name}
          id="date-picker-simple"
          className="border-input bg-input/30 hover:bg-input/50 text-foreground justify-start border font-normal transition-colors"
        >
          <CalendarIcon className="text-muted-foreground" />
          {state.value ? (
            state.value.toLocaleDateString(undefined, { dateStyle: "long" })
          ) : today ? (
            today.toDate(getLocalTimeZone()).toLocaleDateString(undefined, {
              dateStyle: "long",
            })
          ) : (
            <span className="text-muted-foreground">Pick a date</span>
          )}
        </Button>
        <Popover className="w-auto p-0" placement="bottom start">
          <Calendar
            value={visibleDate}
            onChange={(e) =>
              handleChange(e ? e.toDate(getLocalTimeZone()) : null)
            }
          />
        </Popover>
      </PopoverTrigger>

      <DynamicFieldDescription
        name={name}
        meta={state.meta}
        description={fieldDescription}
      />
    </Field>
  );
}
