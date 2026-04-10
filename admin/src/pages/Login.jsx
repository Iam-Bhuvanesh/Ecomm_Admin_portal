import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, AlertCircle, Loader2, ShoppingBag } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, userInfo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);
    if (!result.success) {
      setError(result.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-md space-y-10 rounded-3xl bg-white p-10 shadow-2xl ring-1 ring-slate-100 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full -ml-16 -mb-16 blur-2xl"></div>

        <div>
          <div className="flex justify-center">
            <div className="rounded-2xl bg-orange-500 p-4 shadow-xl shadow-orange-500/20 ring-2 ring-orange-500/10 active:scale-95 transition-transform">
              <ShoppingBag className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2 className="mt-8 text-center text-4xl font-black tracking-tight text-slate-900">
            Welcome Back
          </h2>
          <p className="mt-3 text-center text-sm font-bold text-slate-400 uppercase tracking-widest leading-loose">
            Admin Access Only
          </p>
        </div>
        
        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="flex items-center gap-3 rounded-2xl bg-orange-50 p-4 text-sm font-bold text-orange-600 ring-1 ring-inset ring-orange-200 animate-in slide-in-from-top-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          <div className="space-y-4 rounded-md">
            <div className="relative group">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 transition-colors group-focus-within:text-orange-500">
                <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-orange-500" />
              </div>
              <input
                type="email"
                required
                className="block w-full rounded-2xl border-0 bg-slate-50 py-4 pl-12 text-slate-900 font-bold placeholder-slate-400 ring-1 ring-inset ring-slate-200 transition-all focus:bg-white focus:ring-2 focus:ring-inset focus:ring-orange-500 placeholder:font-medium sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative group">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 transition-colors group-focus-within:text-orange-500">
                <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-orange-500" />
              </div>
              <input
                type="password"
                required
                className="block w-full rounded-2xl border-0 bg-slate-50 py-4 pl-12 text-slate-900 font-bold placeholder-slate-400 ring-1 ring-inset ring-slate-200 transition-all focus:bg-white focus:ring-2 focus:ring-inset focus:ring-orange-500 placeholder:font-medium sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center items-center gap-3 rounded-2xl bg-slate-950 px-4 py-4 text-sm font-black text-white shadow-xl hover:bg-black transition-all hover:translate-y-[-2px] active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950 disabled:opacity-50 disabled:translate-y-0"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <span>SIGN IN</span>
                  <LogIn className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                Secure 256-bit AES Encryption
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
