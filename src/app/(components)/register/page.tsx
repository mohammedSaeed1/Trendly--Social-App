// import { toast } from '@heroui/react';
// import { cookies } from "next/headers"

import RegisterForm from "./RegisterForm";

export default function Register() {
       
    return (
        <>
            <main className="p-4">
                <h1>Register with Trendly Social app</h1>
                <p>Join our vibrant community and connect with friends, share your moments, and discover new trends. Sign up now to start your social journey with us!</p>
                 <RegisterForm/>
            </main>
        </>
    )
}
