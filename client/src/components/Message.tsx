interface Element {
  children?: React.ReactNode | string;
  className?: string;
  loading?: boolean;
}

function WarningMessage(props: Element) {
  if (!props.loading) return null;

  return (
    <p className={` text-orange-400 ${props.className}`}>{props.children}</p>
  );
}

function ErrorMessage({ children, className }: Element) {
  const extClassName = className ? className : "";
  return <p className={`text-red-400 ${extClassName}`}>{children}</p>;
}

export { WarningMessage, ErrorMessage };
