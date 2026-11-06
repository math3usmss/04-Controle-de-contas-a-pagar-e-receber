import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: ReactNode;
  className?: string;
}

export default function EmptyState({
  title,
  description,
  icon: Icon,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center ${className}`}
    >
      {Icon && (
        <div className="bg-muted mb-4 flex size-12 items-center justify-center rounded-full">
          <Icon className="text-muted-foreground size-6" />
        </div>
      )}

      <h3 className="text-lg font-semibold">{title}</h3>

      {description && (
        <p className="text-muted-foreground mt-1 max-w-md text-sm">
          {description}
        </p>
      )}

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
