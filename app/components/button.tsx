import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const Button = ({ children = 'Click me!', ...props }) => {
  return (
    <button
      className="bg-primary text-primary-foreground rounded-md px-4 py-2 hover:bg-primary/90 cursor-pointer active:translate-y-0.5 active:-translate-x-[1px] transition-all shadow-md active:shadow-sm w-full"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
