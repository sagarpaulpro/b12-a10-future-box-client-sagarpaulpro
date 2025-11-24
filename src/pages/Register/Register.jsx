import React, { useState } from 'react';
import { Mail, Lock, User, Image, LogIn, ChevronRight } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc'; // For Google icon

// --- 💡 পাসওয়ার্ড ভ্যালিডেশনের জন্য রেগুলার এক্সপ্রেশন ---
// ১. কমপক্ষে ৬ ক্যারেক্টার দৈর্ঘ্য (.{6,})
// ২. কমপক্ষে একটি বড় হাতের অক্ষর (?=.*[A-Z])
// ৩. কমপক্ষে একটি ছোট হাতের অক্ষর (?=.*[a-z])
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(null); // 'success' or 'error'
  
  // নতুন: পাসওয়ার্ডের ভ্যালিডেশন স্ট্যাটাস চেক
  const isPasswordValid = PASSWORD_REGEX.test(password) || password === '';
  
  // পাসওয়ার্ড এরর মেসেজ
  const passwordErrorText = "Password must be at least 6 characters, including uppercase and lowercase letters.";

  // Placeholder for navigation
  const navigateToHome = () => {
    console.log("SUCCESS: Navigating to Home Page...");
    // In a real app, use navigate('/')
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setShowToast(null);

    // ১. ক্লায়েন্ট-সাইড পাসওয়ার্ড ভ্যালিডেশন
    if (!PASSWORD_REGEX.test(password)) {
      setErrorMessage(passwordErrorText);
      setLoading(false);
      return;
    }

    // --- 💡 Placeholder for Firebase/API Registration Logic ---
    console.log('Attempting Registration with:', { name, email, photoURL, password });
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      // --- Simulate Success/Failure ---
      const registrationSuccessful = Math.random() > 0.3; 

      if (registrationSuccessful) {
        setShowToast('success');
        
        setTimeout(() => {
          setShowToast(null);
          navigateToHome(); 
        }, 1500); 

      } else {
        setErrorMessage("Registration failed: Email already in use or server error.");
        setShowToast('error');
      }
    }, 2000); 
  };
  
  const handleGoogleLogin = () => {
    console.log("Logging in with Google...");
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-lg shadow-2xl bg-base-100 p-6 sm:p-10">
        
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">
          Join Our Donation Family
        </h1>
        
        <form onSubmit={handleRegister} className="space-y-4">
          
          {/* Name Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-1">
                <User className="w-4 h-4" /> Name
              </span>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                placeholder="Full Name"
                className="grow"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>

          {/* Email Input */}
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
          
          {/* Photo URL Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-1">
                <Image className="w-4 h-4" /> Profile Photo URL (Optional)
              </span>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="url"
                placeholder="https://i.ibb.co/photo.jpg"
                className="grow"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
            </label>
          </div>

          {/* Password Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-1">
                <Lock className="w-4 h-4" /> Password
              </span>
            </label>
            {/* passwordInput ক্লাস যুক্ত করা হয়েছে যদি ভ্যালিডেশন ফেল হয় */}
            <label className={`input input-bordered flex items-center gap-2 ${!isPasswordValid ? 'input-error' : ''}`}>
              <input
                type="password"
                placeholder="••••••••"
                className="grow"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            
            {/* পাসওয়ার্ড এরর মেসেজ - সিঙ্গেল লাইনে শো করবে */}
            {!isPasswordValid && password.length > 0 && (
              <p className="text-error text-xs mt-2">{passwordErrorText}</p>
            )}
          </div>
          
          {/* গ্লোবাল এরর মেসেজ (রেজিস্ট্রেশন ফেল হলে) */}
          {errorMessage && showToast === 'error' && (
            <div role="alert" className="alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Register Button */}
          <div className="form-control mt-6">
            <button 
              type="submit" 
              className={`btn btn-primary btn-block ${loading ? 'btn-disabled' : ''}`}
              disabled={loading || !isPasswordValid || password.length === 0} // পাসওয়ার্ড ভ্যালিড না হলে বা খালি থাকলে বাটন Disable থাকবে
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Registering...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" /> Register
                </>
              )}
            </button>
          </div>
          
        </form>
        
        {/* Divider */}
        <div className="divider">OR</div>

        {/* Social Login */}
        <div className="form-control">
          <button 
            type="button" 
            onClick={handleGoogleLogin}
            className="btn btn-outline btn-block"
          >
            <FcGoogle className="w-6 h-6" /> Login with Google
          </button>
        </div>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-base-content/70">
            Already have an account? 
            <a href="/login" className="link link-primary ml-1 font-semibold items-center justify-center mt-1">
              Go to Login
            </a>
          </p>
        </div>
      </div>
      
      {/* --- Toast Container for Success/Error --- */}
      {showToast && (
        <div className="toast toast-end toast-bottom">
          <div 
            role="alert" 
            className={`alert ${showToast === 'success' ? 'alert-success' : 'alert-error'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              {showToast === 'success' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              )}
            </svg>
            <span>
              {showToast === 'success' 
                ? 'Registration Successful! Redirecting...' 
                : errorMessage || 'Registration failed. Please try again.'
              }
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;