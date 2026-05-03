import RegisterForm from "./RegisterForm";

export default function Register() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900">
      
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10 items-center">

        {/* Left Side - Text */}
        <div className="text-white space-y-4">
          <h1 className="text-4xl font-bold leading-tight">
            Join <span className="text-indigo-400">Trendly</span>
          </h1>

          <p className="text-slate-300 text-lg leading-relaxed">
            Connect with friends, share moments, and explore trends in a modern social experience built for creators.
          </p>

          <div className="hidden md:block text-slate-400 text-sm">
            ✨ Fast • Secure • Modern UI experience
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6">
          <RegisterForm />
        </div>

      </div>
    </section>
  );
}