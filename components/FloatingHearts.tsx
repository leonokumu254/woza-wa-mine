import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface HeartStyle {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: string;
  duration: string;
  color: string;
}

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<HeartStyle[]>([]);

  useEffect(() => {

    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 20 + 10,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 5 + 5}s`, 
      color: Math.random() > 0.5 ? '#FF8FA3' : '#FFB3C1',
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute opacity-40 animate-float"
          style={{
            left: heart.left,
            top: heart.top,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
          }}
        >
          <Heart 
            size={heart.size} 
            color={heart.color} 
            fill={heart.color} 
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;