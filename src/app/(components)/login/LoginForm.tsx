"use client";

import { Button, Input, Label, Form, toast } from "@heroui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { loginSchema } from "./login.schema";
import { LoginSchemaType } from "./login.types"
import { loginForm } from "./login.actions";
import { useRouter } from "next/navigation";



export default function LoginForm() {

    const router = useRouter();

    const { register, handleSubmit, formState: { errors, touchedFields, isSubmitted } } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(loginSchema),
        mode: "onChange"
    }
    );

    async function handleLogin(values: LoginSchemaType) {
        
        const isLoginSuccessfully = await loginForm(values);
        if (isLoginSuccessfully) {
           toast.success("Welcome Back !");
          setTimeout(() => {
              router.push('/');
          }, 3000);
        }
        else {
            toast.danger("Email or password is incorrect!!");
        }
    }

    return (
        <Form onSubmit={handleSubmit(handleLogin)} className="m-auto md:w-1/2 shadow-lg p-4 rounded-lg border border-separator">

            {/* Email */}
            <div className="flex flex-col w-full gap-1 mt-1">
                <Label htmlFor="email">Email</Label>
                <Input {...register("email")} id="email" placeholder="jane@example.com" type="email" />
            </div>
            {(touchedFields.email || isSubmitted) && errors.email && <p className="text-red-600">{errors.email.message}</p>}

            {/* Password   */}
            <div className="flex flex-col w-full gap-1 mt-1">
                <Label htmlFor="password">Password</Label>
                <Input {...register("password")} id="password" placeholder="Enter your password" type="password" />
            </div>
            {(touchedFields.password || isSubmitted) && errors.password && <p className="text-red-600">{errors.password.message}</p>}

            <Button type="submit" className='w-full mt-2' variant="outline">Login</Button>
        </Form>
    )
}
