import { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login Admin | PilahPintar",
  description: "Halaman login khusus administrator.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <LoginForm />
    </div>
  );
}
