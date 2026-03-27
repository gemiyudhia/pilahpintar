"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, AlertCircle } from "lucide-react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username wajib diisi.",
  }),
  password: z.string().min(1, {
    message: "Password wajib diisi.",
  }),
});

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        setError("Username atau password salah.");
        setIsLoading(false);
      } else {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (error) {
      setError("Terjadi kesalahan pada server.");
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-sm border-2 border-gray-100 shadow-xl rounded-2xl bg-white">
      <CardHeader className="text-center pb-2 pt-10">
        <CardTitle className="text-3xl font-bold text-gray-900 flex flex-col gap-4 justify-center items-center">
          <Image
            src="/favicon.ico"
            alt="logo aplikasi"
            height={80}
            width={80}
          />
          <span className="text-xl">Login Admin</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                <AlertCircle className="h-4 w-4" />
                <p>{error}</p>
              </div>
            )}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukan username admin"
                      className="h-11 rounded-lg focus-visible:ring-green-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••"
                      className="h-11 rounded-lg focus-visible:ring-green-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full h-11 text-base font-bold bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Masuk Dashboard"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
