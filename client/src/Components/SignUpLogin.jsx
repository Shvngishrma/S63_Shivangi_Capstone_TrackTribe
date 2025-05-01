import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

const SignUpLogin = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen overflow-hidden bg-gradient-to-r from-black via-red-950 to-black text-white">
      <div className="relative w-full max-w-md bg-gray-900 rounded-xl p-8 shadow-xl border border-red-900">
        {/* Title */}
        <div className="text-center text-3xl font-bold mb-6 text-red-600 tracking-wide">
          {isSignUp ? 'Create an Account' : 'Welcome Back'}
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-5 gap-4">
          <button
            onClick={() => setIsSignUp(false)}
            className={`px-5 py-2.5 rounded-full text-base font-medium transition-all duration-300 ${
              !isSignUp
                ? 'bg-red-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-red-700'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`px-5 py-2.5 rounded-full text-base font-medium transition-all duration-300 ${
              isSignUp
                ? 'bg-red-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-red-700'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Conditional Forms */}
        {isSignUp ? (
          <form className="flex flex-col space-y-4">
            <input type="text" placeholder="Full Name" className="form-input" />
            <input type="text" placeholder="Username" className="form-input" />
            <input type="email" placeholder="Email" className="form-input" />
            <input type="tel" placeholder="Phone Number" className="form-input" />
            <input type="password" placeholder="Password" className="form-input" />
            <input type="password" placeholder="Confirm Password" className="form-input" />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-semibold transition-all duration-300"
            >
              Sign Up
            </button>
            <div className="text-center text-gray-400 text-sm">or</div>
            <button
              type="button"
              className="flex items-center justify-center gap-2 border border-gray-700 bg-white text-black py-2.5 rounded-lg hover:shadow-md transition-all duration-300"
            >
              <FcGoogle size={20} />
              <span className="font-medium">Sign Up with Google</span>
            </button>
          </form>
        ) : (
          <form className="flex flex-col space-y-4">
            <input type="email" placeholder="Email" className="form-input" />
            <input type="password" placeholder="Password" className="form-input" />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-semibold transition-all duration-300"
            >
              Sign In
            </button>
            <div className="text-center text-gray-400 text-sm">or</div>
            <button
              type="button"
              className="flex items-center justify-center gap-2 border border-gray-700 bg-white text-black py-2.5 rounded-lg hover:shadow-md transition-all duration-300"
            >
              <FcGoogle size={20} />
              <span className="font-medium">Sign In with Google</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUpLogin;
