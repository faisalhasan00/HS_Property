import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const LoaderIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("animate-spin", className)}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
  </svg>
);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'solid', size = 'md', isLoading, children, ...props }, ref) => {
    
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={cn(
          // base classes included in index.css mapped utility classes
          variant === 'solid' ? 'btn-solid' : 'btn-outline',
          sizeClasses[size],
          props.disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...props}
      >
        {isLoading && <LoaderIcon className="mr-2 h-4 w-4 flex-shrink-0" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
