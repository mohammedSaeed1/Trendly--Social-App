import ChangePasswordForm from "./ChangePasswordForm";

export default function ChangePassword() {
  return (
    <section className="min-h-screen lg:ml-67.5 flex items-center justify-center px-4 bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900">
      
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
        <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 sm:p-6">
          <ChangePasswordForm />
        </div>

      </div>
    </section>
  );
}