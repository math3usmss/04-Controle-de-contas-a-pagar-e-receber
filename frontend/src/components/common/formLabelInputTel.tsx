import type { ChangeEvent, ComponentProps } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { Input, Label } from "@/components/ui";

interface FieldFormTelProps extends Omit<
  ComponentProps<typeof Input>,
  "name" | "type" | "onChange"
> {
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
}

export default function FieldFormTel({
  label,
  register,
  error,
  id,
  ...props
}: FieldFormTelProps) {
  const inputId = id ?? register.name;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/\D/g, "");

    if (value.length <= 10) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else {
      value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
    }

    event.target.value = value;

    register.onChange(event);
  }

  return (
    <div className="space-y-1">
      <Label htmlFor={inputId} className="text-lg font-semibold">
        {label}
      </Label>

      <Input
        id={inputId}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        maxLength={15}
        {...register}
        {...props}
        onChange={handleChange}
        aria-invalid={!!error}
        className="w-full py-4"
      />

      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
}
