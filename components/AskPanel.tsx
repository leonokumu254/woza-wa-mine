import React, { useState, useEffect } from 'react';
import { Heart, ArrowLeft, Frown } from 'lucide-react';
import { IMAGES, TEXTS } from '../constants';

interface AskPanelProps {
  onAccept: () => void;
  onMaybe: () => void;
  onBack: () => void;
}

const AskPanel: React.FC<AskPanelProps> = ({ onAccept, onMaybe, onBack }) => {
  const [noBtnPosition, setNoBtnPosition] = useState<{ top: string; left: string; position: 'static' | 'fixed' }>({
    top: 'auto',
    left: 'auto',
    position: 'static',
  });
  const [hoverCount, setHoverCount] = useState(0);
  const [showMaybe, setShowMaybe] = useState(false);
  const [showDisturbedModal, setShowDisturbedModal] = useState(false);

  // Timer to show "Maybe" button after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMaybe(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Function to move the "No" button to a random position
  const moveNoButton = () => {
    // Reveal maybe button early if they struggle with No
    if (!showMaybe) setShowMaybe(true);

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Button dimensions (approximate)
    const btnWidth = 100;
    const btnHeight = 50;

    // Calculate safe area (keep it away from edges)
    const padding = 20;
    
    // Generate random position
    const randomX = Math.random() * (viewportWidth - btnWidth - padding * 2) + padding;
    const randomY = Math.random() * (viewportHeight - btnHeight - padding * 2) + padding;

    setNoBtnPosition({
      position: 'fixed',
      left: `${randomX}px`,
      top: `${randomY}px`,
    });
    
    setHoverCount(prev => prev + 1);
  };

  const handleNoClick = () => {
    setShowDisturbedModal(true);
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-xl border-2 border-white max-w-lg w-full text-center transition-all hover:shadow-2xl hover:bg-white/70 relative">
        
        {/* Back Button */}
        <div className="absolute top-4 left-4">
           <button 
              onClick={onBack}
              className="flex items-center gap-1 text-gray-400 hover:text-valentine-pink transition-colors font-sans text-sm font-semibold"
           >
              <ArrowLeft size={16} />
              Back
           </button>
        </div>

        {/* Teddy Bear Image */}
        <div className="mb-6 relative inline-block group">
          <img 
            src={IMAGES.TEDDY_BEAR} 
            alt="Cute Teddy Bear" 
            className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full border-4 border-valentine-pink shadow-lg mx-auto transform transition-transform group-hover:scale-105 duration-300"
          />
          <div className="absolute top-0 right-0 animate-bounce delay-700">
             <Heart className="text-valentine-red w-10 h-10 drop-shadow-md" fill="#FF3366" />
          </div>
        </div>

        {/* Main Text */}
        <h1 className="font-cursive text-5xl md:text-6xl text-valentine-red mb-8 leading-tight drop-shadow-sm">
          {TEXTS.ASK_HEADER}
        </h1>

        {/* Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 relative min-h-[120px]">
          
          <div className="flex flex-col md:flex-row gap-6 items-center w-full justify-center">
            <button
              onClick={onAccept}
              className="bg-valentine-red text-white font-sans font-bold text-xl px-10 py-4 rounded-full shadow-lg hover:bg-red-600 hover:scale-110 transition-all duration-300 transform active:scale-95 flex items-center gap-2 z-20"
            >
              {TEXTS.BTN_YES}
            </button>

            <button
              onMouseEnter={moveNoButton}
              onClick={handleNoClick}
              style={{
                position: noBtnPosition.position as any,
                top: noBtnPosition.top,
                left: noBtnPosition.left,
                transition: 'all 0.3s ease-out',
              }}
              className={`bg-white text-gray-500 font-sans font-bold text-xl px-8 py-3 rounded-full shadow-md border-2 border-gray-200 hover:bg-gray-50 z-50 whitespace-nowrap ${
                  noBtnPosition.position === 'fixed' ? 'shadow-2xl' : ''
              }`}
            >
              {hoverCount > 5 ? "Just click Yes! 😠" : TEXTS.BTN_NO}
            </button>
          </div>

          {/* Maybe Button */}
          <div className={`transition-all duration-700 ease-in-out ${showMaybe ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
             <button
                onClick={onMaybe}
                className="text-valentine-pink font-sans font-semibold text-lg hover:text-valentine-red hover:underline hover:scale-110 transition-all duration-300 transform hover:-rotate-2 mt-4"
              >
                {TEXTS.BTN_MAYBE}
              </button>
          </div>
        </div>
        
        {/* Helper text if they struggle */}
        {hoverCount > 2 && !showMaybe && (
          <p className="mt-8 text-sm text-gray-400 font-sans italic animate-pulse">
            (The "No" button is playing hard to get...)
          </p>
        )}
      </div>

      {/* Disturbed Modal */}
      {showDisturbedModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center transform scale-100 animate-in zoom-in-95 duration-200">
            <Frown size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="font-cursive text-4xl text-valentine-dark mb-2">{TEXTS.DISTURBED_HEADER}</h3>
            <p className="font-sans text-gray-600 mb-8">{TEXTS.DISTURBED_MSG}</p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={onAccept}
                className="bg-valentine-red text-white font-bold py-3 px-6 rounded-xl hover:bg-red-600 transition-colors shadow-lg"
              >
                {TEXTS.BTN_OOPS_YES}
              </button>
              <button 
                onClick={onMaybe}
                className="bg-gray-100 text-gray-500 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors"
              >
                {TEXTS.BTN_CONFIRM_MAYBE}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AskPanel;