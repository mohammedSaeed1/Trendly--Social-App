"use client";

import { Button, Input, Label, ListBox, ComboBox, Form, toast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "./register.schema";
import { RegisterSchemaType } from "./register.types";
import { registerForm } from "./register.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitted },
  } = useForm<RegisterSchemaType>({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  async function handleRegister(values: RegisterSchemaType) {
    try {
      setIsLoading(true);

      const ok = await registerForm(values);

      if (ok) {
        toast.success("Account created successfully ✅");
        router.push("/");
      } else {
        toast.danger("This email already exists ❌");
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
    <Form onSubmit={handleSubmit(handleRegister)} className="space-y-4">

      <h2 className="text-white text-2xl font-semibold mb-2">
        Create Account
      </h2>

      {/* Name */}
      <div>
        <Label className="text-slate-300">Name</Label>
        <Input {...register("name")} className={inputClass} placeholder="Enter your name" />
        {(touchedFields.name || isSubmitted) && errors.name && (
          <p className="text-red-400 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Username */}
      <div>
        <Label className="text-slate-300">Username</Label>
        <Input {...register("username")} className={inputClass} placeholder="Enter your username" />
        {(touchedFields.username || isSubmitted) && errors.username && (
          <p className="text-red-400 text-sm">{errors.username.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <Label className="text-slate-300">Email</Label>
        <Input {...register("email")} className={inputClass} placeholder="Enter your email" />
         {(touchedFields.email || isSubmitted) && errors.email && (
          <p className="text-red-400 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Date */}
      <div>
        <Label className="text-slate-300">Date of Birth</Label>
        <Input {...register("dateOfBirth")} type="date" className={inputClass} />
         {(touchedFields.dateOfBirth || isSubmitted) && errors.dateOfBirth && (
          <p className="text-red-400 text-sm">{errors.dateOfBirth.message}</p>
        )}
      </div>

      {/* Gender */}
      <ComboBox className="w-full">
        <Label className="text-slate-300">Gender</Label>
        <ComboBox.InputGroup>
          <Input {...register("gender")} className={inputClass} placeholder="Select gender" />
          <ComboBox.Trigger />
        </ComboBox.InputGroup>
        <ComboBox.Popover>
          <ListBox>
            <ListBox.Item id="male" textValue="male">Male</ListBox.Item>
            <ListBox.Item id="female" textValue="female">Female</ListBox.Item>
          </ListBox>
        </ComboBox.Popover>
      </ComboBox>
         {(touchedFields.gender || isSubmitted) && errors.gender && (
          <p className="text-red-400 text-sm">{errors.gender.message}</p>
        )}

      {/* Password */}
      <div>
        <Label className="text-slate-300">Password</Label>
        <Input {...register("password")} type="password" className={inputClass} placeholder="Create your password" />
        {(touchedFields.password || isSubmitted) && errors.password && (
          <p className="text-red-400 text-sm">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm */}
      <div>
        <Label className="text-slate-300">Confirm Password</Label>
        <Input {...register("rePassword")} type="password" className={inputClass} placeholder="Re-type your password" />
       {(touchedFields.rePassword || isSubmitted) && errors.rePassword && (
          <p className="text-red-400 text-sm">{errors.rePassword.message}</p>
        )}
      </div>

      {/* Button */}
      <Button
        type="submit"
        className="w-full mt-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition"
        isDisabled={isLoading}
      >
        {isLoading ? "Creating..." : "Create Account"}
      </Button>
    </Form>
  );
}