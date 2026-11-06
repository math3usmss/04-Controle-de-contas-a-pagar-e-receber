import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { Label, RadioGroup, RadioGroupItem } from "@/components/ui";

interface RadioInputProps<
  TInput extends FieldValues,
  TOutput extends FieldValues = TInput,
> {
  control: Control<TInput, unknown, TOutput>;
  name: Path<TInput>;
}

export default function RadioInput<
  TInput extends FieldValues,
  TOutput extends FieldValues = TInput,
>({ control, name }: RadioInputProps<TInput, TOutput>) {
  return (
    <div className="space-y-2">
      <Label className="text-lg font-semibold">Tipo</Label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RadioGroup
            value={field.value ?? ""}
            onValueChange={field.onChange}
            className="grid grid-cols-2 gap-3"
          >
            <Label
              htmlFor="payable"
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-md border p-3 transition-colors ${
                field.value === "PAYABLE"
                  ? "border-red-600 bg-red-600 text-white"
                  : "border-border hover:bg-red-500/10"
              }`}
            >
              <RadioGroupItem
                value="PAYABLE"
                id="payable"
                className="sr-only"
              />
              <ArrowUpCircle className="size-5" />A pagar
            </Label>

            <Label
              htmlFor="receivable"
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-md border p-3 transition-colors ${
                field.value === "RECEIVABLE"
                  ? "border-green-600 bg-green-600 text-white"
                  : "border-border hover:bg-green-500/10"
              }`}
            >
              <RadioGroupItem
                value="RECEIVABLE"
                id="receivable"
                className="sr-only"
              />
              <ArrowDownCircle className="size-5" />A receber
            </Label>
          </RadioGroup>
        )}
      />
    </div>
  );
}
