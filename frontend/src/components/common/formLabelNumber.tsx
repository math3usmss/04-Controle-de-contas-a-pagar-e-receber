import type { ChangeEvent, ComponentProps } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { Input, Label } from "@/components/ui";

interface FieldFormNumberProps extends Omit<
  ComponentProps<typeof Input>,
  "name" | "type" | "onChange"
> {
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
}

export default function FieldFormNumber({
  label,
  register,
  error,
  id,
  className,
  ...props
}: FieldFormNumberProps) {
  const inputId = id ?? register.name;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(/\D/g, "");

    event.target.value = value;

    register.onChange(event);
  }

  return (
    <div className={`space-y-1 ${className ?? ""}`}>
      <Label htmlFor={inputId} className="text-lg font-semibold">
        {label}
      </Label>

      <Input
        id={inputId}
        type="text"
        inputMode="numeric"
        {...register}
        {...props}
        onChange={handleChange}
        aria-invalid={!!error}
        className="border-border w-full border py-4"
      />

      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
}
