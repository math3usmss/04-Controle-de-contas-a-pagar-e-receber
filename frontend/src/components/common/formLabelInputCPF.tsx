import type { ChangeEvent, ComponentProps } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { Input, Label } from "@/components/ui";

interface FieldFormCPFProps extends Omit<
  ComponentProps<typeof Input>,
  "name" | "type" | "onChange"
> {
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
}

export default function FieldFormCPF({
  label,
  register,
  error,
  id,
  ...props
}: FieldFormCPFProps) {
  const inputId = id ?? register.name;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/\D/g, "");

    value = value
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

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
        type="text"
        inputMode="numeric"
        maxLength={14}
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
