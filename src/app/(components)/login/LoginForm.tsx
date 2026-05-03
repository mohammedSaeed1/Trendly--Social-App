"use client";

import { Button, Input, Label, Form, toast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "./login.schema";
import { LoginSchemaType } from "./login.types";
import { loginForm } from "./login.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitted },
  } = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  async function handleLogin(values: LoginSchemaType) {
    try {
      setIsLoading(true);
      const isLoginSuccessfully = await loginForm(values);
      if (isLoginSuccessfully) {
        toast.success("Welcome Back! ✅");
        router.push("/");
      } else {
        toast.danger("Email or password is incorrect ❌");
      }
    } catch {
      toast.danger("Network error");
    } finally {
      setIsLoading(false);
    }
  }

  const inputClass =
    "bg-white/5 w-full border border-white/10 text-white placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition";

  return (
    <Form onSubmit={handleSubmit(handleLogin)} className="space-y-4">

      <h2 className="text-white text-2xl font-semibold mb-2">
        Login to Your Account
      </h2>

      {/* Email */}
      <div>
        <Label className="text-slate-300">Email</Label>
        <Input
          {...register("email")}
          type="email"
          className={inputClass}
          placeholder="Enter your email"
        />
        {(touchedFields.email || isSubmitted) && errors.email && (
          <p className="text-red-400 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <Label className="text-slate-300">Password</Label>
        <Input
          {...register("password")}
          type="password"
          className={inputClass}
          placeholder="Enter your password"
        />
        {(touchedFields.password || isSubmitted) && errors.password && (
          <p className="text-red-400 text-sm">{errors.password.message}</p>
        )}
      </div>

      {/* Button */}
      <Button
        type="submit"
        className="w-full mt-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition"
        isDisabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </Form>
  );
}