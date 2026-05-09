"use client";

import { Button, Input, Label, Form, toast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { changePasswordSchema} from  "./changePassword.schema";
import { changePasswordSchemaType} from "./changePassword.types";
import { changePassword} from "./changePassword.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChangePasswordForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitted },
  } = useForm<changePasswordSchemaType>({
    defaultValues: {
      password: "",
      newPassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
  });

  async function handleChangePassword(values: changePasswordSchemaType) {
    try {
      setIsLoading(true);
      const isChangedSuccessfully = await changePassword(values);
      if (isChangedSuccessfully) {
        toast.success("Password changed successfully ✅");
        router.push("/login");
      } else {
        toast.danger("Password incorrect ❌");
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
    <Form onSubmit={handleSubmit(handleChangePassword)} className="space-y-4">

      <h2 className="text-white text-2xl font-semibold mb-2">
        Update your Password
      </h2>

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

      {/* NewPassword */}
      <div>
        <Label className="text-slate-300">New Password</Label>
        <Input
          {...register("newPassword")}
          type="password"
          className={inputClass}
          placeholder="Enter your New Password"
        />
        {(touchedFields.newPassword || isSubmitted) && errors.newPassword && (
          <p className="text-red-400 text-sm">{errors.newPassword.message}</p>
        )}
      </div>

      {/* Button */}
      <Button
        type="submit"
        className="w-full mt-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition"
        isDisabled={isLoading}
      >
        {isLoading ? "Updating..." : "Change"}
      </Button>
    </Form>
  );
}