import ChangePasswordForm from "./ChangePasswordForm";

export default function ChangePassword() {
  return (
    <section className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-8 pb-24 lg:ml-67.5">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Left Side - Text */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              Change Your <span className="text-indigo-400">Password</span>
            </h1>

            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              Update your password to keep your account secure and protected.
            </p>

            <div className="mt-4 hidden text-sm text-slate-400 lg:block">
              🔐 Strong Password • Secure Account • Instant Update
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl sm:p-6 md:p-8">
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </section>
  );
}