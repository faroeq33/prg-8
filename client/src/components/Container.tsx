import { ReactNode } from "react";

interface ContainerProps {
  children?: ReactNode;
  className?: string;
}

function Container({ children }: ContainerProps) {
  /*
Use this component as a starting point for building out a layout.
If you wish to cusomize className,
I would recommend making your own component rather than directly editing this
*/
  return (
    <div className="container content-center justify-center mx-auto">
      {children}
    </div>
  );
}

function ContainerNarrow({ children }: ContainerProps) {
  return (
    <div
      className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">{children}</div>
    </div>
  );
}

export { Container, ContainerNarrow };
