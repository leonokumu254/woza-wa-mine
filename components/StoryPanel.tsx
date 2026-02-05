import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Music } from 'lucide-react';
import { STORY_SEGMENTS } from '../constants';

interface StoryPanelProps {
  onComplete: () => void;
  onUpdateAudio: (url: string) => void;
  currentAudioUrl: string;
}

const StoryPanel: React.FC<StoryPanelProps> = ({ onComplete, onUpdateAudio, currentAudioUrl }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showMusicInput, setShowMusicInput] = useState(false);
  const [musicUrl, setMusicUrl] = useState(currentAudioUrl);

  const handleNext = () => {
    if (currentStep < STORY_SEGMENTS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleAudioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAudio(musicUrl);
    setShowMusicInput(false);
  };

  const currentSegment = STORY_SEGMENTS[currentStep];

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white/70 backdrop-blur-md p-6 md:p-10 rounded-3xl shadow-xl border-2 border-white max-w-lg w-full text-center relative overflow-hidden transition-all duration-500">
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gray-100 flex">
          {STORY_SEGMENTS.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-full flex-1 transition-all duration-500 ${idx <= currentStep ? 'bg-valentine-pink' : 'bg-transparent'}`}
            />
          ))}
        </div>

        {/* Music Config Toggle (Only on first slide) */}
        {currentStep === 0 && (
          <div className="absolute top-4 right-4 z-20">
            <button 
              onClick={() => setShowMusicInput(!showMusicInput)}
              className="text-gray-400 hover:text-valentine-pink transition-colors p-2"
              title="Change Music"
            >
              <Music size={20} />
            </button>
          </div>
        )}

        {/* Music Input Form */}
        {showMusicInput && (
          <div className="absolute top-14 right-4 z-30 bg-white p-3 rounded-xl shadow-lg border border-gray-100 w-64 text-left animate-in fade-in slide-in-from-top-2">
            <form onSubmit={handleAudioSubmit}>
              <label className="block text-xs font-bold text-gray-500 mb-1">Song URL (MP3):</label>
              <input 
                type="text" 
                value={musicUrl}
                onChange={(e) => setMusicUrl(e.target.value)}
                className="w-full text-xs p-2 border rounded mb-2 bg-gray-50"
                placeholder="https://..."
              />
              <button type="submit" className="w-full bg-valentine-pink text-white text-xs py-1 rounded hover:bg-red-400">
                Save Music
              </button>
            </form>
          </div>
        )}

        {/* Content Animation Container */}
        <div key={currentStep} className="animate-in fade-in slide-in-from-right-8 duration-700 fill-mode-forwards">
          {/* Image */}
          <div className="mb-6 relative inline-block">
            <img 
              src={currentSegment.image} 
              alt={currentSegment.title} 
              className="w-full h-64 object-cover rounded-2xl shadow-md transform rotate-1 border-4 border-white"
            />
          </div>

          {/* Text */}
          <h2 className="font-cursive text-4xl text-valentine-red mb-4">
            {currentSegment.title}
          </h2>
          <p className="font-sans text-lg text-gray-700 leading-relaxed mb-8">
            {currentSegment.text}
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-center gap-4 mt-2">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="group bg-white text-valentine-pink border-2 border-valentine-pink font-sans font-bold text-lg px-6 py-3 rounded-full shadow-md hover:bg-pink-50 transition-all duration-300 flex items-center gap-2"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Back
            </button>
          )}

          <button
            onClick={handleNext}
            className="group bg-valentine-pink text-white font-sans font-bold text-lg px-8 py-3 rounded-full shadow-lg hover:bg-valentine-red transition-all duration-300 flex items-center gap-2"
          >
            {currentStep === STORY_SEGMENTS.length - 1 ? "I have a question..." : "Next"}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="mt-6 flex justify-center gap-2">
          {STORY_SEGMENTS.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${idx === currentStep ? 'bg-valentine-red' : 'bg-gray-300'}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryPanel;