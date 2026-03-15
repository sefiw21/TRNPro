import { cva, type VariantProps } from "class-variance-authority";
import { ArrowLeft, MoreVertical } from "lucide-react";
import type { ComponentProps } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export const buttonStyles = cva(["transetion-colors"], {
  variants: {
    variant: {
      default: ["bg-gray-200", "hover:bg-gray-300", "text-black"],
      ghost: ["hover:bg-gray-200"],
      dark: ["bg-black", "hover:bg-greay-800", "text-white"],
    },
    size: {
      default: ["rounded", "p-2"],
      icon: [
        "rounded-full",
        "w-10",
        "h-10",
        "flex",
        "items-center",
        "justify-center",
        "p-2.5",
      ],
    },
  },

  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">;

const Button = ({ variant, size, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      //remember to fix this thing import teMerge from "tailwind-merge";
      className={twMerge(buttonStyles({ variant, size }), className)}
    ></button>
  );
};
export const BackButton = ({ variant, size, className, ...props }: ButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      {...props}
      onClick={() => navigate(-1)}
      className={twMerge(buttonStyles({ variant, size }), className,
        className = "flex cursor-pointer mr-3 bg-transparent hover:text-gray-600 hover:bg-transparent items-center text-sm font-medium text-slate-100 transition-colors rounded-full w-max h-max"

      )}
    >
      <ArrowLeft />

    </button>

  )
}
export const TaskbarButton = () => {
  return (
    <button
      className="flex justify-center items-center mx-3 mb-2 bg-transparent rounded-md hover:text-gray-500 text-slate-300 transition-colors cursor-pointer">
      <MoreVertical size={20} strokeWidth={3} />
    </button>
  );
};
export default Button;
