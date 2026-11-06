import type { ReactNode } from "react";

interface LoadingStateProps {
  children: ReactNode;
  items?: number;
  className?: string;
}

export default function LoadingState({
  children,
  items = 5,
  className = "",
}: LoadingStateProps) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index}>{children}</div>
      ))}
    </div>
  );
}
