import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = ({ children, className, variant = 'primary', size = 'md', ...props }) => {
  const variants = {
    primary: 'bg-kids-sun hover:bg-yellow-400 text-slate-800 border-b-8 border-yellow-600 active:border-b-0 active:translate-y-2',
    secondary: 'bg-kids-sky hover:bg-sky-400 text-white border-b-8 border-sky-700 active:border-b-0 active:translate-y-2',
    success: 'bg-kids-grass hover:bg-green-400 text-white border-b-8 border-green-700 active:border-b-0 active:translate-y-2',
    danger: 'bg-red-500 hover:bg-red-400 text-white border-b-8 border-red-700 active:border-b-0 active:translate-y-2',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-8 py-4 text-xl font-bold rounded-2xl',
    lg: 'px-12 py-6 text-3xl font-black rounded-3xl',
  };

  return (
    <button
      className={twMerge(
        'transition-all duration-100 flex items-center justify-center gap-2',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const Card = ({ children, className, ...props }) => (
  <div
    className={twMerge(
      'bg-white rounded-[2rem] border-4 border-slate-800 shadow-[0_12px_0_0_rgba(30,41,59,1)] p-6',
      className
    )}
    {...props}
  >
    {children}
  </div>
);
