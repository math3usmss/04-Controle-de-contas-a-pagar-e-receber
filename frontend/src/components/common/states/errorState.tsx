import { AlertTriangle } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  action?: ReactNode;
  className?: string;
}

export default function ErrorState({
  title = "Algo deu errado",
  description = "Não foi possível carregar os dados.",
  onRetry,
  action,
  className = "",
}: ErrorStateProps) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center ${className}`}
    >
      <div className="bg-destructive/10 mb-4 flex size-12 items-center justify-center rounded-full">
        <AlertTriangle className="text-destructive size-6" />
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>

      {description && (
        <p className="text-muted-foreground mt-1 max-w-md text-sm">
          {description}
        </p>
      )}

      {(onRetry || action) && (
        <div className="mt-5">
          {onRetry ? (
            <Button variant="outline" onClick={onRetry}>
              Tentar novamente
            </Button>
          ) : (
            action
          )}
        </div>
      )}
    </div>
  );
}
