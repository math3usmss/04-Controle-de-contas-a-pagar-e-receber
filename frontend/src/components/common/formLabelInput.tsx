import type { ComponentProps } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { Input, Label } from "@/components/ui";

interface FieldFormProps extends Omit<ComponentProps<typeof Input>, "name"> {
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
}

export default function FieldForm({
  label,
  register,
  error,
  id,
  ...props
}: FieldFormProps) {
  const inputId = id ?? register.name;

  return (
    <div className="space-y-1">
      <Label htmlFor={inputId} className="text-lg font-semibold">
        {label}
      </Label>

      <Input
        id={inputId}
        {...register}
        {...props}
        aria-invalid={!!error}
        className="w-full"
      />

      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
}
