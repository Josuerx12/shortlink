import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface InputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputPassword = (props: InputPasswordProps) => {
  const { className, type = "password", ...rest } = props;

  const combinedClassName = `w-full focus:outline-none bg-transparent ${className ?? ""}`;

  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <div
      className="
        flex justify-between items-center flex-nowrap
        rounded-md border border-slate-700 bg-slate-800 px-4 py-2
        placeholder:text-slate-400
        focus-within:ring-2 focus-within:ring-cyan-300
        focus-within:border-cyan-300
        transition-all duration-150
      "
    >
      <input
        type={isShowPassword ? "text" : type}
        className={combinedClassName}
        {...rest}
      />
      <button
        type="button"
        className="cursor-pointer text-slate-400 hover:text-slate-200"
        onClick={() => setIsShowPassword(!isShowPassword)}
      >
        {isShowPassword ? <EyeOff /> : <Eye />}
      </button>
    </div>
  );
};

export default InputPassword;
