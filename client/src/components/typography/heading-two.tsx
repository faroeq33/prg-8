interface Props {
  children?: React.ReactNode;
  className?: string;
}
export function H2({ children, className }: Props) {
  return <h2 className={`text-3xl font-serif  ${className}`}>{children}</h2>;
}
