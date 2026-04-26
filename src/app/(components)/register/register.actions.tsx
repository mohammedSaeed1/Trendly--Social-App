"use server"
import { cookies } from "next/headers";
import { RegisterSchemaType } from "./register.types";

 export async function registerForm(values: RegisterSchemaType) {

     
     console.log("Form values:", values);
     const res = await fetch(`https://route-posts.routemisr.com/users/signup`, {
         method: "POST",
         body: JSON.stringify(values),
         headers: {
             "Content-Type": "application/json"
            }
        })
        const data = await res.json();    
        if (res.ok) {
            const cookie = await cookies();
            cookie.set("usertoken",data.token,{
                httpOnly: true,
                sameSite: "lax"
            })
          return true;
        } else {
          return false;
        }   
    }
