import { cn } from "@/shared/lib";

interface EmptyPlaceholderProps {
  text: string;
  className?: string;
}

export const EmptyPlaceholder = ({
  text,
  className,
}: EmptyPlaceholderProps) => {
  return (
    <div className={cn("text-center py-12 text-gray-500", className)}>
      {text}
    </div>
  );
};
