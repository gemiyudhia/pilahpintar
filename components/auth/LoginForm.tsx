"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

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

// 1. Definisikan Schema Validasi dengan Zod
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

  // 2. Inisialisasi Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 3. Handler Submit
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    console.log(values); // Cek data di console

    // Simulasi Login
    setTimeout(() => {
      setIsLoading(false);
      router.push("/admin/dashboard");
    }, 2000);
  }

  return (
    <Card className="w-full max-w-sm border-2 border-gray-100 shadow-xl rounded-2xl bg-white">
      <CardHeader className="text-center pb-2 pt-10">
        <CardTitle className="text-3xl font-bold text-gray-900 flex justify-center items-center">
          <Image
            src="/favicon.ico"
            alt="logo aplikasi"
            height={80}
            width={80}
          />
        </CardTitle>
      </CardHeader>

      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Field Username */}
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
                      placeholder="Masukkan username"
                      className="h-11 rounded-lg focus-visible:ring-green-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Field Password */}
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
                      placeholder="Masukkan password"
                      className="h-11 rounded-lg focus-visible:ring-green-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tombol Submit */}
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
                  "Masuk"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
