interface Props {
  children?: React.ReactNode;
  className?: string;
}
export function H1({ children, className }: Props) {
  return <h1 className={`text-4xl font-serif  ${className}`}>{children}</h1>;
}
