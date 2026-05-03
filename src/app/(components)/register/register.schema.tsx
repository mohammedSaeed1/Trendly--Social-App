import * as zod from "zod"

export const registerSchema = zod.object({
    name: zod.string().nonempty("Name is required").min(2, "Name must be at least 2 characters").max(20, "Name must be less than 20 characters"),
    username: zod.string().nonempty("Username is required").regex(/^[a-z0-9_]{3,30}$/, "Username must be between 3 and 30 characters and can only contain lowercase letters, numbers, and underscores"),
    email: zod.string().nonempty("Email is required").email("Invalid email address"),
    dateOfBirth: zod.string().nonempty("Date of birth is required"),
    gender: zod.enum(["male","female"], "Gender must be one of male or female"),
    password: zod.string().nonempty("Password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (#?!@$%^&*-)"),
    rePassword: zod.string().nonempty("Confirmation Password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (#?!@$%^&*-).")
}).refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"]
});
