import type { FC, ReactElement } from "react";
import Header from "./Header";

type LayoutProps = {
  children: ReactElement;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="flex min-h-screen items-start justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] pt-24">
        <div className="container flex flex-col items-center justify-center gap-12 px-4">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
