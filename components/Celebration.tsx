import React, { useEffect, useState } from 'react';
import { Heart, Stars, Music, Pause, Play, Volume2, VolumeX, Flower2, ArrowLeft } from 'lucide-react';
import { IMAGES, TEXTS } from '../constants';

interface CelebrationProps {
  type: 'yes' | 'maybe';
  audioUrl: string;
  onBack: () => void;
  onAccept: () => void;
  isPlaying: boolean;
  togglePlay: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const Celebration: React.FC<CelebrationProps> = ({
  type,
  audioUrl,
  onBack,
  onAccept,
  isPlaying,
  togglePlay,
  isMuted,
  toggleMute
}) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setShowContent(true), 100);
  }, []);

  // Continuous Shower Effect
  const Shower = () => {
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
      const count = type === 'yes' ? 150 : 30; // Increased count
      const newItems = Array.from({ length: count }).map((_, i) => ({
        id: i,
        type: Math.random() > 0.6 ? 'heart' : Math.random() > 0.3 ? 'flower' : 'balloon',
        left: Math.random() * 100, // Random horizontal position
        // Negative delay to start animation mid-air (simulates already raining)
        delay: Math.random() * -20,
        duration: Math.random() * 5 + 5, // 5-10 seconds fall duration
        size: Math.random() * 20 + 20, // 20-40px
        color: ['#FF3366', '#FF8FA3', '#FFB3C1', '#FF69B4', '#FFF', '#FFD700', '#FF5555'][Math.floor(Math.random() * 7)],
      }));
      setItems(newItems);
    }, []);

    return (
      <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden h-screen w-screen">
        {items.map((item) => (
          <div
            key={item.id}
            className="absolute -top-16"
            style={{
              left: `${item.left}%`,
              animation: `fall ${item.duration}s linear infinite`,
              animationDelay: `${item.delay}s`,
            }}
          >
            {item.type === 'heart' && (
              <Heart size={item.size} fill={item.color} className="text-valentine-red opacity-80" strokeWidth={1} stroke={item.color} />
            )}

            {item.type === 'flower' && (
              <Flower2 size={item.size} color={item.color} fill={item.color} fillOpacity={0.4} strokeWidth={1.5} className="opacity-80" />
            )}

            {item.type === 'balloon' && (
              <svg width={item.size} height={item.size * 1.3} viewBox="0 0 24 32" fill="none" className="opacity-80">
                <path d="M12 0C5.37 0 0 5.37 0 12C0 18.63 5.37 24 12 24C18.63 24 24 18.63 24 12C24 5.37 18.63 0 12 0Z" fill={item.color} />
                <path d="M12 24L12 32" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
                {/* Shine on balloon */}
                <path d="M6 6C6 6 8 4 12 4" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </div>
        ))}
      </div>
    );
  };

  const isYes = type === 'yes';

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center p-4 overflow-hidden">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-[70]">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-valentine-pink transition-colors font-sans font-semibold bg-white/40 backdrop-blur-md px-4 py-2 rounded-full shadow-sm hover:bg-white/60"
        >
          <ArrowLeft size={20} />
          Back
        </button>
      </div>

      {/* Confetti Shower */}
      <Shower />

      {/* Content Card */}
      <div
        className={`transition-all duration-1000 ease-out transform ${showContent ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10'
          } bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border-4 ${isYes ? 'border-valentine-pink' : 'border-gray-200'} max-w-2xl w-full relative z-50`}
      >
        <div className="mb-8 relative inline-block">
          {isYes && <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-red-400 rounded-2xl blur opacity-75 animate-pulse"></div>}
          <img
            src={isYes ? IMAGES.PARTNER_PHOTO : IMAGES.TEDDY_BEAR}
            alt="Visual"
            className={`relative rounded-xl shadow-xl w-64 h-64 md:w-80 md:h-80 object-cover mx-auto border-4 border-white transition-transform duration-300 ${isYes ? 'transform hover:rotate-2' : 'grayscale-[20%]'}`}
          />
          {isYes && (
            <div className="absolute -bottom-4 -right-4 bg-white p-2 rounded-full shadow-lg animate-bounce">
              <Heart className="text-valentine-red w-8 h-8" fill="#FF3366" />
            </div>
          )}
        </div>

        <h1 className="font-cursive text-5xl md:text-7xl text-valentine-red mb-4 animate-wiggle">
          {isYes ? TEXTS.SUCCESS_HEADER : TEXTS.MAYBE_HEADER}
        </h1>

        <p className="font-sans text-xl md:text-2xl text-gray-700 font-semibold mb-8">
          {isYes ? TEXTS.SUCCESS_SUBHEADER : TEXTS.MAYBE_SUBHEADER}
        </p>

        {/* Audio Player Controls */}
        <div className="flex flex-col items-center gap-2 mt-6 p-4 bg-pink-50 rounded-xl border border-pink-100">
          <div className="flex items-center gap-4 text-valentine-dark">
            <button
              onClick={togglePlay}
              disabled={!audioUrl}
              className={`p-3 rounded-full shadow-md transition-colors ${!audioUrl ? 'bg-gray-200 text-gray-400' : 'bg-white hover:bg-pink-100'}`}
              title={isPlaying ? "Pause Music" : "Play Music"}
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
            </button>

            <div className="flex flex-col items-start">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-400">Now Playing</span>
              <span className="font-cursive text-xl">
                {audioUrl ? "Our Song" : "No Audio Selected"}
              </span>
            </div>

            <button
              onClick={toggleMute}
              disabled={!audioUrl}
              className={`p-2 transition-colors ${!audioUrl ? 'text-gray-300' : 'text-pink-400 hover:text-pink-600'}`}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
          {!audioUrl && <span className="text-xs text-red-400">No valid song URL provided.</span>}
        </div>

        {/* Action Buttons for Maybe state */}
        {!isYes && (
          <div className="mt-8">
            <button
              onClick={onAccept}
              className="bg-valentine-red text-white font-sans font-bold text-lg px-8 py-3 rounded-full shadow-lg hover:bg-red-600 hover:scale-105 transition-all duration-300 animate-pulse"
            >
              {TEXTS.BTN_REDEEM_YES}
            </button>
          </div>
        )}

        {isYes && (
          <div className="flex justify-center gap-4 text-valentine-pink mt-6">
            <Stars size={32} className="animate-spin-slow" />
            <Music size={32} className="animate-bounce" />
            <Stars size={32} className="animate-spin-slow" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Celebration;