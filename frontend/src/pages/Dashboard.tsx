import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { weatherAPI, WeatherData, setAuthToken } from '../services/api';
import WeatherCard from '../components/WeatherCard';
import LogoutConfirmation from '../components/LogoutConfirmation'
import BG from '../assets/bg.jpg'

const Dashboard: React.FC = () => {
  const { user, logout, getAccessTokenSilently } = useAuth0();
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Add state for modal

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://weather-api.fidenz.com",
          }
        });
        
        setAuthToken(token);
        const response = await weatherAPI.getAllWeather();
        setWeatherData(response.data.data);
      } catch (err: any) {
        console.error('Error:', err);
        setError(err.response?.data?.message || 'Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [getAccessTokenSilently]);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/50"></div>
      
      {/* Content Container */}
      <div className="relative z-10 min-h-screen">
        <nav className="backdrop-blur-sm bg-black/20 border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">

              <div className="flex items-center space-x-3">
                <div>
                  <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                    Sky<span style={{ color: '#f69b27' }}>Watch</span>
                  </h1>
                  <p className="text-white/70 text-xs font-medium">Weather Intelligence</p>
                </div>
              </div>
              <div className="hidden md:flex items-center flex-1 max-w-md mx-8"/>
                
              {/* User Section */}
              <div className="flex items-center space-x-4">
                {user && (
                  <>
                    <div className="hidden lg:block text-right">
                      <p className="font-semibold text-white drop-shadow-lg">{user.name}</p>
                      <p className="text-xs text-white/60">{user.email}</p>
                    </div>
                    {user.picture && (
                      <img 
                        src={user.picture} 
                        alt={user.name} 
                        className="w-11 h-11 rounded-full border-2 border-orange-400/50 shadow-xl"
                      />
                    )}
                    <button
                      onClick={handleLogoutClick} 
                      className="flex items-center space-x-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-4 py-2.5 rounded-xl transition-all border border-white/20 font-medium shadow-lg"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="hidden sm:inline">Logout</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-4 py-2">
            <div className="mb-10 text-center">
                <h2 className="text-5xl md:text-5xl font-bold text-white drop-shadow-2xl mb-4 tracking-tight">
                Weather <span className="bg-gradient-to-r from-white/90 via-white to-white/90 bg-clip-text text-transparent">
                    Dashboard
                </span>
                </h2>
                
                <div className="flex items-center justify-center gap-2 mt-6">
                <div className="h-1 w-12 rounded-full bg-white/60"></div>
                <div className="h-1 w-1 rounded-full bg-white/70"></div>
                <div className="h-1 w-1 rounded-full bg-white/70"></div>
                <div className="h-1 w-1 rounded-full bg-white/70"></div>
                <div className="h-1 w-12 rounded-full bg-white/60"></div>
                </div>
            </div>
            </div>

          {loading && (
            <div className="flex flex-col justify-center items-center min-h-[500px]">
              <div className="relative">
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-orange-400 mb-6"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/20 to-orange-500/20 blur-xl"></div>
              </div>
              <p className="text-white text-xl drop-shadow-lg font-medium">Loading weather data...</p>
            </div>
          )}

          {error && (
            <div 
              className="backdrop-blur-xl border rounded-2xl p-8 mb-8 shadow-2xl"
              style={{ backgroundColor: '#140D19', borderColor: '#f69b27' }}
            >
              <div className="flex items-start space-x-4">
                <div 
                  className="rounded-xl p-3 shadow-lg"
                  style={{ backgroundColor: '#f69b27' }}
                >
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl mb-2">Error Loading Data</h3>
                  <p className="text-white/80 text-lg">{error}</p>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {weatherData.map((weather) => (
                <WeatherCard key={weather.id} weather={weather} />
              ))}
            </div>
          )}

          {!loading && !error && weatherData.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24">
              <div 
                className="backdrop-blur-xl rounded-3xl p-16 border text-center max-w-lg shadow-2xl"
                style={{ backgroundColor: '#140D19', borderColor: 'rgba(246, 155, 39, 0.3)' }}
              >
                <div className="inline-block bg-gradient-to-br from-orange-400 to-orange-500 p-5 rounded-2xl shadow-xl mb-8">
                  <span className="text-7xl">☁️</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
                  No Weather Data Available
                </h3>
                <p className="text-white/70 text-lg mb-8 leading-relaxed">
                  Start tracking weather by adding your favorite locations
                </p>
                <button 
                  className="text-white font-semibold px-10 py-4 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #f69b27 0%, #f7AB49 100%)' }}
                >
                  Add Location
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmation
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        userName={user?.name}
      />
    </div>
  );
};

export default Dashboard;