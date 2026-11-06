import type { ComponentProps } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { Input, Label } from "@/components/ui";

interface FieldFormCurrencyProps<T extends FieldValues> extends Omit<
  ComponentProps<typeof Input>,
  "name" | "type" | "onChange"
> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  error?: string;
}

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function FieldFormCurrency<T extends FieldValues>({
  label,
  name,
  control,
  error,
  id,
  className,
  ...props
}: FieldFormCurrencyProps<T>) {
  const inputId = id ?? name;

  return (
    <div className={`space-y-1 ${className ?? ""}`}>
      <Label htmlFor={inputId} className="text-lg font-semibold">
        {label}
      </Label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...props}
            id={inputId}
            name={field.name}
            ref={field.ref}
            onBlur={field.onBlur}
            type="text"
            inputMode="numeric"
            placeholder="R$ 0,00"
            value={
              field.value == null || field.value === ""
                ? ""
                : currencyFormatter.format(Number(field.value))
            }
            onChange={(event) => {
              const digits = event.target.value.replace(/\D/g, "");

              field.onChange(digits === "" ? undefined : Number(digits) / 100);
            }}
            aria-invalid={!!error}
            className="border-border w-full border py-4"
          />
        )}
      />

      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
}
