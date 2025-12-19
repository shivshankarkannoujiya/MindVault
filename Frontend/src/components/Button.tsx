import type { ReactElement } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  varient: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
}

const varientClass = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-600",
};

const defaultStyle = `px-4 py-2 rounded-md font-light flex justify-center items-center`;

const Button = ({
  varient,
  text,
  startIcon,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${varientClass[varient]} ${defaultStyle} ${className || ""}`}
      {...props}
    >
      <div className="pr-2">{startIcon}</div>
      {text}
    </button>
  );
};

export default Button;
