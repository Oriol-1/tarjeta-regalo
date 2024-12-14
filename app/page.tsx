/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { userValidationSchema } from "@/lib/validators";
import { useStore } from "@/lib/store";
import { MOCK_USERS } from "@/lib/constants";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);

  const form = useForm<z.infer<typeof userValidationSchema>>({
    resolver: zodResolver(userValidationSchema),
    defaultValues: {
      name: "Juan Pérez",
      nif: "12345678A",
      email: "juan.perez@example.com",
    },
  });

  async function onSubmit(values: z.infer<typeof userValidationSchema>) {
    setIsLoading(true);
    try {
      // Simulate API call with mock data
      const user = MOCK_USERS.find(
        (u) => u.nif === values.nif && u.email === values.email
      );
      
      if (user) {
        setUser(user);
        router.push('/dashboard');
      } else {
        form.setError('root', {
          type: 'manual',
          message: 'Invalid credentials. Please try again.'
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 parallax">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <img src="https://www.affinitysoluciones.com/wp-content/uploads/2024/12/logo_sabadell.png" alt="Logo Sabadell" className="h-12 w-13" />
          </div>
          <CardTitle className="text-2xl text-center">Solicita tu tarjeta regalo</CardTitle>
          <CardDescription className="text-center">
          Cumplimenta los siguientes datos para pedir tu tarjeta regalo. En los próximos 15 días recibirás un e-mail con la tarjeta regalo solicitada. Ten en cuenta que según el importe asignado, puedes recibir más de una tarjeta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nif"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIF</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your NIF" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.formState.errors.root && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.root.message}
                </p>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Validating..." : "Tus tarjetas regalo"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}