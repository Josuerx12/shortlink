interface InputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: InputPasswordProps) => {
  const { className, ...rest } = props;

  const combinedClassName = `w-full rounded-md bg-slate-800 border border-slate-700 px-4 py-2 placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${className ?? ""}`;

  return <input className={combinedClassName} {...rest} />;
};

export default Input;
