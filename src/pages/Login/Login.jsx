import React, { useState, useContext } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginUser, loginWithGoogle } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    loginUser(email, password)
      .then((result) => {
        console.log("Login Success:", result.user);
      })
      .catch((error) => {
        console.log("Login Error:", error);
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleLogin = () => {
    setLoading(true);

    loginWithGoogle()
      .then((result) => {
        console.log("Google Login Success:", result.user);
      })
      .catch((error) => {
        console.log("Google Login Error:", error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-4xl shadow-2xl bg-base-100 flex flex-col md:flex-row">

        <div className="hidden md:flex md:w-1/2 bg-cover w-full rounded-l-2xl items-center justify-center">
          <img
            className='bg-cover ml-0 rounded-l-xl relative right-6'
            src="https://www.summahealth.org/-/media/project/summahealth/website/page-content/flourish/2_18a_fl_fastfood_400x400.webp?la=en&h=400&w=400&hash=145DC0CF6234A159261389F18A36742A"
            alt='food'
          />
        </div>

        <div className="w-full md:w-1/2 p-6 sm:p-10">
          <h1 className="text-3xl font-bold text-center mb-6 text-primary">Sign In</h1>

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete='off'>
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-1">
                  <Mail className="w-4 h-4" /> Email
                </span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="email"
                  placeholder="donor@example.com"
                  className="grow"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-1">
                  <Lock className="w-4 h-4" /> Password
                </span>
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="grow"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-primary btn-block ${loading ? 'btn-disabled' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Logging In
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" /> Login
                  </>
                )}
              </button>
            </div>

            <div className="form-control">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="btn btn-outline btn-block"
              >
                <FcGoogle className="w-6 h-6" /> Login with Google
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-base-content/70">
                Don't have an account?
                <a href="/register" className="link link-primary ml-1 font-semibold">
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
