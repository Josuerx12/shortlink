type Variant = "primary" | "secondary" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const Button = ({ children, variant = "primary", ...props }: ButtonProps) => {
  const base =
    "w-full cursor-pointer rounded-md px-3 py-1 font-medium focus:outline-none focus-visible:ring-2";
  const primary =
    "bg-cyan-500 text-slate-900 hover:bg-cyan-400 focus-visible:ring-cyan-300";
  const secondary =
    "bg-slate-700 text-slate-100 hover:bg-slate-600 focus-visible:ring-cyan-300";
  const danger =
    "bg-red-500 text-white hover:bg-red-400 focus-visible:ring-red-300";

  const { className, ...rest } = props;

  const combinedClassName = `${base} ${
    variant === "primary"
      ? primary
      : variant === "secondary"
        ? secondary
        : danger
  } ${className ?? ""}`;

  return (
    <button {...rest} className={`btn ${combinedClassName}`}>
      {children}
    </button>
  );
};

export default Button;
