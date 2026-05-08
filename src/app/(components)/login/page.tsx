import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <section className="min-h-screen lg:ml-67.5 flex items-center justify-center px-4 bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900">
      
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">

        {/* Left Side - Text */}
        <div className="text-white space-y-4 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            Welcome Back to <span className="text-indigo-400">Trendly</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Log in to reconnect with friends, share updates, and explore what’s trending in your social world.
          </p>

          <div className="hidden md:block text-slate-400 text-sm">
            🔐 Secure Login • Fast Access • Modern Experience
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 sm:p-6">
          <LoginForm />
        </div>

      </div>
    </section>
  );
}