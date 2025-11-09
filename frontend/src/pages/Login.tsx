import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import bgImg from '../assets/bg.jpg'
import loginImg from '../assets/side.jpg';

const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-8 relative"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      {/* Login Box */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
        {/* Left Side - Image */}
        <div 
          className="w-full md:w-1/2 min-h-[300px] md:min-h-[500px] bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${loginImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/70 to-transparent"></div>
        </div>

        {/* Right Side - Sign In Form */}
        <div 
        className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center items-center"
        style={{ backgroundColor: '#140D19' }}
        >
        {/* Header Section */}
        <div className="mb-12 text-center max-w-sm w-full">
            <div className="flex items-center justify-center mb-8">
            <div>
                <h1 className="text-4xl font-bold tracking-tight text-white">
                Sky<span style={{ color: '#f69b27' }}>Watch</span>
                </h1>
                <p className="text-xs text-gray-400 mt-1">Weather Intelligence Platform</p>
            </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3 leading-tight">Welcome Back</h2>
            <p className="text-gray-400 leading-relaxed">Sign in to access your personalized weather dashboard and forecasts</p>
        </div>

        {/* Sign In Button */}
        <div className="w-full max-w-sm">
            <button
            onClick={() => loginWithRedirect()}
            className="w-full font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.01] mb-8 relative overflow-hidden group"
            style={{
                background: 'linear-gradient(135deg, #f69b27 0%, #f7AB49 100%)',
                color: 'white',
                border: 'none'
            }}
            >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="flex items-center justify-center space-x-3 relative z-10">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span className="text-base tracking-wide">Sign In with Auth0</span>
            </div>
            </button>

            {/* Divider */}
            <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
                <span 
                className="px-6 text-xs font-semibold tracking-wider text-gray-500"
                style={{ backgroundColor: '#140D19' }}
                >
                TRUSTED & SECURE
                </span>
            </div>
            </div>

            <div className="text-center">
            <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
                <p>Protected by industry-leading security standards</p>
            </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;