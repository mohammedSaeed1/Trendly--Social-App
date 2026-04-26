"use client";

import { Button, Input, Label, ListBox ,ComboBox , Form, toast } from "@heroui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { registerSchema } from "./register.schema";
import {RegisterSchemaType} from "./register.types"
import { registerForm } from "./register.actions";
import { useRouter } from "next/navigation";



 export default function RegisterForm() {

     const router = useRouter();

   const { register, handleSubmit , formState: { errors , touchedFields, isSubmitted}} = useForm({
            defaultValues: {
                name: "",
                username: "",
                email: "",
                dateOfBirth: "",
                password:"",
                rePassword:""
        },
        resolver: zodResolver(registerSchema),
         mode: "onChange"
}
    );

    async function handleRegister(values:RegisterSchemaType){
          const isRegisterSuccessfully = await registerForm(values);
          if(isRegisterSuccessfully){
          toast.success("Email created successfully");
          setTimeout(() => {
              router.push('/');
          }, 3000);
          }
          else{
          toast.danger("Email or password is incorrect!!");
          }
    }  

  return (
      <Form onSubmit={handleSubmit(handleRegister)} className="m-auto md:w-1/2 shadow-lg p-4 rounded-lg border border-separator">
                    {/* Name */}
                    <div className="flex flex-col w-full gap-1 mt-1">
                        <Label htmlFor="name">Name</Label>
                        <Input {...register("name")} id="name" placeholder="Enter your name" type="text" />
                    </div>
                    {(touchedFields.name || isSubmitted) && errors.name && <p className = "text-red-600 ">{errors.name.message}</p>}
                        {/* UserName */}
                    <div className="flex flex-col w-full gap-1 mt-1">
                        <Label htmlFor="username">User name</Label>
                        <Input {...register("username")} id="username" placeholder="Enter your user name" type="text" />
                    </div>
                    {(touchedFields.username || isSubmitted) && errors.username && <p className = "text-red-600">{errors.username.message}</p>}

                    {/* Email */}
                    <div className="flex flex-col w-full gap-1 mt-1">
                        <Label htmlFor="email">Email</Label>
                        <Input {...register("email")} id="email" placeholder="jane@example.com" type="email" />
                    </div>
                    {(touchedFields.email || isSubmitted) && errors.email && <p className = "text-red-600">{errors.email.message}</p>}
                    {/* Date of birth */}
                    <div className="flex flex-col w-full gap-1 mt-1">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input {...register("dateOfBirth")} id="dateOfBirth" placeholder="Choose your date of birth" type="date" />
                    </div>
                    {(touchedFields.dateOfBirth || isSubmitted) && errors.dateOfBirth && <p className = "text-red-600">{errors.dateOfBirth.message}</p>}
                    {/* Gender */}
                    <ComboBox className="w-full">
                        <Label>Gender</Label>
                        <ComboBox.InputGroup>
                            <Input {...register("gender")} placeholder="Select your gender..." />
                            <ComboBox.Trigger />
                        </ComboBox.InputGroup>
                        <ComboBox.Popover>
                            <ListBox>
                                <ListBox.Item id="male" textValue="male">
                                    male
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="female" textValue="female">
                                    female
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            </ListBox>
                        </ComboBox.Popover>
                    </ComboBox>
                    {(touchedFields.gender || isSubmitted) && errors.gender && <p className = "text-red-600">{errors.gender.message}</p>}
                    {/* Password   */}
                    <div className="flex flex-col w-full gap-1 mt-1">
                        <Label htmlFor="password">Password</Label>
                        <Input {...register("password")} id="password" placeholder="Enter your password" type="password" />
                    </div>
                    {(touchedFields.password || isSubmitted) && errors.password && <p className = "text-red-600">{errors.password.message}</p>}
                    {/* Confirm Password   */}
                    <div className="flex flex-col w-full gap-1 mt-1">
                        <Label htmlFor="rePassword">Confirm Password</Label>
                        <Input {...register("rePassword")} id="rePassword" placeholder="Confirm your password" type="password" />
                    </div>
                    {(touchedFields.rePassword || isSubmitted) && errors.rePassword && <p className = "text-red-600">{errors.rePassword.message}</p>}
                    <Button type="submit" className='w-full mt-2' variant="outline">Register</Button>
                </Form>
  )
}
