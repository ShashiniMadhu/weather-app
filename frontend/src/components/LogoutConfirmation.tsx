import React from 'react';

interface LogoutConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName?: string;
}

const LogoutConfirmation: React.FC<LogoutConfirmationProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  userName 
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden transform transition-all"
          style={{ backgroundColor: '#ffffff' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
            {/* Title */}
            <h3 className="text-2xl font-bold text-white text-center mb-3">
              Logout Confirmation
            </h3>

            {/* Message */}
            <p className="text-gray-800 text-center mb-8 leading-relaxed">
              {userName ? (
                <>
                  <span className="text-[#140D19] font-semibold">{userName}</span>, are you sure you want to logout from your account?
                </>
              ) : (
                'Are you sure you want to logout from your account?'
              )}
            </p>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 py-3.5 px-6 rounded-xl font-semibold transition-all duration-300 border-2 text-[#140D19] hover:scale-[1.02] hover:bg-white/5"
                style={{ borderColor: '#374151' }}
              >
                Cancel
              </button>

              <button
                onClick={onConfirm}
                className="flex-1 py-3.5 px-6 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #140D19 0%, #140D19 100%)' }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutConfirmation;