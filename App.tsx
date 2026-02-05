import React, { useState, useRef, useEffect } from 'react';
import FloatingHearts from './components/FloatingHearts';
import AskPanel from './components/AskPanel';
import Celebration from './components/Celebration';
import StoryPanel from './components/StoryPanel';
import { AUDIO_URL } from './constants';

type ViewState = 'story' | 'ask' | 'yes' | 'maybe';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('story');
  const [audioUrl, setAudioUrl] = useState<string>(AUDIO_URL);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // paly audio on mountm 
    const playAudio = async () => {
      if (audioRef.current && audioUrl) {
        try {
          audioRef.current.volume = 0.5;
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (err) {
          console.log("Autoplay prevented, waiting for interaction");
          setIsPlaying(false);
        }
      }
    };

    playAudio();


    const handleInteraction = () => {
      if (audioRef.current && audioRef.current.paused && audioUrl) {
         audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(e => console.log("Play failed even after interaction", e));
      }
    };

    window.addEventListener('click', handleInteraction, { once: true });
    return () => window.removeEventListener('click', handleInteraction);
  }, [audioUrl]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen bg-valentine-cream relative overflow-hidden">
      {/* Background decoration */}
      <FloatingHearts />
      
      {/* Gradient Overlay for softness */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-pink-100/50 pointer-events-none z-0"></div>

      {/* Main Content */}
      <main className="relative z-10">
        {viewState === 'story' && (
          <StoryPanel 
            onComplete={() => setViewState('ask')} 
            onUpdateAudio={setAudioUrl}
            currentAudioUrl={audioUrl}
          />
        )}

        {viewState === 'ask' && (
          <AskPanel 
            onAccept={() => setViewState('yes')} 
            onMaybe={() => setViewState('maybe')}
            onBack={() => setViewState('story')}
          />
        )}
        
        {(viewState === 'yes' || viewState === 'maybe') && (
          <Celebration 
            type={viewState === 'yes' ? 'yes' : 'maybe'} 
            audioUrl={audioUrl}
            onBack={() => setViewState('ask')}
            onAccept={() => setViewState('yes')}
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            isMuted={isMuted}
            toggleMute={toggleMute}
          />
        )}
      </main>
      
      {/* Global Audio Player */}
      <audio 
        ref={audioRef} 
        src={audioUrl} 
        loop 
      />

      {/* Footer Credit */}

    </div>
  );
};

export default App;