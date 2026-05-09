import { cookies } from "next/headers";

 export async function getToken(){
  const cookie = await cookies();
  const token = cookie.get("usertoken")?.value;
    return token;
}