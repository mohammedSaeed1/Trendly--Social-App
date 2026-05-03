// Login.tsx
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900">
      
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10 items-center">

        {/* Left Side - Text */}
        <div className="text-white space-y-4">
          <h1 className="text-4xl font-bold leading-tight">
            Welcome Back to <span className="text-indigo-400">Trendly</span>
          </h1>

          <p className="text-slate-300 text-lg leading-relaxed">
            Log in to reconnect with friends, share updates, and explore what trending in your social world.
          </p>

          <div className="hidden md:block text-slate-400 text-sm">
            🔐 Secure Login • Fast Access • Modern Experience
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6">
          <LoginForm />
        </div>

      </div>
    </section>
  );
}