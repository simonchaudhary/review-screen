import React from "react";
import { Header } from "./Header";
import { Toaster } from "./ui/sonner";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="h-[calc(100vh-56px)]">{children}</main>

      <Toaster />
    </div>
  );
}

export default Layout;
