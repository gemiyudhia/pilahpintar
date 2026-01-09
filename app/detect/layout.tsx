import { ReactNode } from "react";

interface DetectLayoutProps {
  children: ReactNode;
}

export default function DetectLayout({ children }: DetectLayoutProps) {
  return <div className="bg-gray-50">{children}</div>;
}
