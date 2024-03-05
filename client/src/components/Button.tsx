import { ReactNode } from "react";
import Spinner from "./Spinner";

type Props = {
  children: ReactNode;
  className?: string;
  loadingElement?: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

function Button(props: Props) {
  const disabled = props.disabled;
  const loadingStyle = "p-3 border border-black/20 rounded-md bg-black/10 ";
  const defaultStyle = "p-3 border border-black rounded-md";

  return (
    <>
      <button
        className={disabled ? loadingStyle : defaultStyle}
        disabled={disabled}
        aria-disabled={disabled}
        type={props.type}
      >
        {disabled ? <Spinner /> : props.children}
      </button>
    </>
  );
}

export default Button;
