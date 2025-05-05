import { ReactNode } from "react";
import Spinner from "../loaders/spinner";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  loadingElement?: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

function LoadingButton(props: Props) {
  const disabled = props.disabled;
  const loadingStyle = "p-3 border border-black/20 rounded-md bg-black/10 ";
  const defaultStyle =
    " p-3 border border-black rounded-md transition ease-in-out duration-300 hover:bg-green-600 hover:border-transparent shadow-inner shadow-md";

  return (
    <>
      <button
        className={disabled ? loadingStyle : defaultStyle}
        disabled={disabled}
        aria-disabled={disabled}
        onClick={props.onClick}
        type={props.type}
      >
        {disabled ? <Spinner /> : props.children}
      </button>
    </>
  );
}

export default LoadingButton;
