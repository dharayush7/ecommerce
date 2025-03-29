import "./loader.css";
import { useState, useEffect } from "react";

const PerfumeLoader = ({ isLoading }: { isLoading: boolean }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      setIsExiting(true);
      const timer = setTimeout(() => setShouldRender(false), 800);
      return () => clearTimeout(timer);
    } else {
      setShouldRender(true);
      setIsExiting(false);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isExiting ? "opacity-0 exit-transition" : ""
      }`}
    >
      <div className="relative flex flex-col items-center gap-6">
        <div className="animate-float h-32 w-32 [animation-duration:3s]">
          <svg viewBox="0 0 100 150" className="h-full w-full preserve-3d">
            {/* Keep existing SVG paths unchanged */}
            <path
              d="M 20 10 L 20 130 Q 20 140 30 140 L 70 140 Q 80 140 80 130 L 80 10 Q 80 0 70 0 L 30 0 Q 20 0 20 10"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="1.5"
              className="animate-pulse-opacity"
            />
            <path
              d="M 35 15 L 55 15 Q 60 15 60 20 L 60 120 Q 60 125 55 125 L 45 125 Q 40 125 40 120 L 40 20 Q 40 15 45 15 Z"
              fill="rgba(255,255,255,0.1)"
              className="animate-shimmer [animation-delay:1s]"
            />
            <path
              d="M 25 100 C 30 85 45 80 50 100 S 70 85 75 100 L 75 120 L 25 120 Z"
              fill="url(#liquidGradient)"
              className="animate-modern-wave"
            />
            <rect
              x="40"
              y="0"
              width="20"
              height="12"
              rx="2"
              fill="url(#capGradient)"
              className="animate-cap-glow"
            />
            {[...Array(5)].map((_, i) => (
              <circle
                key={i}
                cx={45 + Math.random() * 10}
                cy={90 - i * 15}
                r="1.2"
                fill="#e5e7eb"
                className="animate-bubble-rise"
                style={{
                  animationDelay: `${i * 0.3}s`,
                  opacity: 0.7 - i * 0.1,
                }}
              />
            ))}
            <defs>{/* Keep existing gradients unchanged */}</defs>
          </svg>
        </div>

        <span
          className={` font-sans text-sm text-gray-300 tracking-widest animate-gradient-text ${
            isExiting ? " exit-transition" : ""
          }`}
        >
          CRAFTING YOUR SIGNATURE BLEND...
        </span>
      </div>
    </div>
  );
};

export default PerfumeLoader;
