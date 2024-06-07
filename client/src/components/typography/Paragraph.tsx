interface Props {
  children?: React.ReactNode;
  className?: string;
}

function Paragraph({ children, className }: Props) {
  return <h1 className={` font-sans  ${className}`}>{children}</h1>;
}

export { Paragraph };
