import { ReactNode } from "react";
type Props = {
  children: ReactNode;
  className?: string;
  To: string;
};

function Button(props: Props) {
  return (
    <>
      <button
        className={`px-4 py-2 text-black rounded underline underline-offset-2 ${props.className}`}
      >
        {props.children}
      </button>
    </>
  );
}

export default Button;
