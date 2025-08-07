import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const colors = ["#3b82f6", "#ec4899", "#10b981", "#f59e0b", "#8b5cf6"];

export default function ParticleBurst() {
  const [particles, setParticles] = useState([]);

  const burst = (e) => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: Date.now() + i,
      x: e.clientX,
      y: e.clientY,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 5,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 5 + 2,
    }));
    setParticles(prev => [...prev, ...newParticles]);
  };

  useEffect(() => {
    window.addEventListener("click", burst);
    window.addEventListener("touchstart", burst);
    return () => {
      window.removeEventListener("click", burst);
      window.removeEventListener("touchstart", burst);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
          initial={{ opacity: 1, scale: 0 }}
          animate={{
            x: Math.cos(particle.angle) * particle.speed * 50,
            y: Math.sin(particle.angle) * particle.speed * 50,
            opacity: 0,
            scale: 1,
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
          onAnimationComplete={() => {
            setParticles(prev => prev.filter(p => p.id !== particle.id));
          }}
        />
      ))}
    </div>
  );
}