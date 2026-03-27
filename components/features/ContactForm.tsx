"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Send, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Nama harus memiliki minimal 2 karakter.",
  }),
  email: z.string().email({
    message: "Format email tidak valid.",
  }),
  message: z.string().min(10, {
    message: "Pesan terlalu pendek. Minimal 10 karakter.",
  }),
});

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    console.log(values);

    setTimeout(() => {
      setIsLoading(false);
      alert("Pesan Terkirim! Cek console untuk lihat datanya.");
      form.reset();
    }, 2000);
  }

  return (
    <section className="py-20 bg-gray-50" id="contact">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Hubungi <span className="text-green-600">Kami</span>
          </h2>
          <p className="text-gray-500">
            Jika ada keluhan atau saran silahkan hubungi kami.
          </p>
        </div>
        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">
                      Nama Lengkap
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nama Lengkap"
                        className="bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="nama@email.com"
                        className="bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">
                      Pesan Anda
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tuliskan keluhan atau saran..."
                        className="bg-white min-h-30 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 font-bold h-11 cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Mengirim...
                  </>
                ) : (
                  <>
                    Kirim Pesan <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
