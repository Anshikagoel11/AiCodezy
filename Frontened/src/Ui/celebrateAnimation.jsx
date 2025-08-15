// CelebrationAnimation.js
import React, { useState, useEffect, useRef } from 'react';

const CelebrationAnimation = () => {
  const [blasts, setBlasts] = useState([]);
  const animationRef = useRef();
  const blastCount = useRef(0);
  const maxBlasts = 5;
  const colors = ['#FF5252', '#FFD740', '#64FFDA', '#448AFF', '#B388FF', '#FF80AB'];

  const createBlast = (x, y) => {
    const particles = [];
    const particleCount = 60 + Math.floor(Math.random() * 40);

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 4;
      const size = 3 + Math.random() * 5;
      
      particles.push({
        id: `${x}-${y}-${i}-${Date.now()}`,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        size,
        life: 1,
        decay: 0.008 + Math.random() * 0.01
      });
    }
    
    return particles;
  };

  const startCelebration = () => {
    blastCount.current = 0;
    triggerNextBlast();
  };

  const triggerNextBlast = () => {
    if (blastCount.current >= maxBlasts) return;

    const x = window.innerWidth * (0.2 + Math.random() * 0.6);
    const y = window.innerHeight * (0.2 + Math.random() * 0.6);
    
    setBlasts(prev => [...prev, ...createBlast(x, y)]);
    blastCount.current += 1;

    if (blastCount.current < maxBlasts) {
      setTimeout(triggerNextBlast, 300 + Math.random() * 400);
    }
  };

  useEffect(() => {
    startCelebration();

    const animate = () => {
      setBlasts(prevBlasts => 
        prevBlasts.map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.08,
          life: p.life - p.decay
        })).filter(p => p.life > 0)
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {blasts.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.life,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            transition: 'transform 0.1s ease-out'
          }}
        />
      ))}
    </div>
  );
};

export default CelebrationAnimation;