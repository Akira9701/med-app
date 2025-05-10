import { LoaderCircle } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({ message = 'Загрузка...' }: LoadingStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-12">
      <LoaderCircle className="h-10 w-10 animate-spin text-primary mb-4" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
};

interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
}

export const EmptyState = ({ message, icon }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-12 border rounded-lg bg-muted/20">
      {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
};
