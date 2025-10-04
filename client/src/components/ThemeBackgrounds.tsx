import type { TestTypeId } from "@shared/test-types";

interface ThemeBackgroundProps {
  testType: TestTypeId;
}

export function ThemeBackground({ testType }: ThemeBackgroundProps) {
  switch (testType) {
    case 'darkSide':
      return <DarkSideBackground />;
    case 'cunningSide':
      return <CunningSideBackground />;
    case 'goodSide':
      return <GoodSideBackground />;
    case 'mysteriousSide':
      return <MysteriousSideBackground />;
    case 'zodiac':
      return <ZodiacBackground />;
    case 'bigFive':
    default:
      return <BigFiveBackground />;
  }
}

function DarkSideBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/60 to-black" />
      
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-700/30 rounded-full blur-[150px] animate-pulse" 
           style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-700/25 rounded-full blur-[120px] animate-pulse" 
           style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-900/20 rounded-full blur-[100px] animate-pulse" 
           style={{ animationDuration: '5s', animationDelay: '1.5s' }} />
      
      <div className="absolute inset-0">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-red-600/40 rounded-full"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              filter: 'blur(1.5px)',
              boxShadow: '0 0 20px rgba(220, 38, 38, 0.4)',
            }}
          />
        ))}
      </div>

      <svg className="absolute inset-0 w-full h-full opacity-5">
        <defs>
          <pattern id="hell-flames" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M100,50 Q110,80 100,100 Q90,80 100,50 Z" fill="currentColor" className="text-red-600/60" />
            <path d="M50,120 Q60,150 50,170 Q40,150 50,120 Z" fill="currentColor" className="text-orange-600/60" />
            <path d="M150,100 Q160,130 150,150 Q140,130 150,100 Z" fill="currentColor" className="text-red-700/60" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hell-flames)" />
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
      
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(153, 27, 27, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(194, 65, 12, 0.1) 0%, transparent 50%)',
      }} />
    </div>
  );
}

function CunningSideBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-emerald-950/30 to-black" />
      
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-emerald-600/15 rounded-full blur-[120px] animate-pulse" 
           style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-yellow-600/10 rounded-full blur-[100px] animate-pulse" 
           style={{ animationDuration: '7s', animationDelay: '2s' }} />
      
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="snake-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M20,10 Q30,30 40,10 T60,10 T80,10" stroke="currentColor" strokeWidth="2" fill="none" className="text-emerald-500/40" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#snake-pattern)" />
      </svg>

      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-emerald-500/20 rounded-full"
            style={{
              width: `${Math.random() * 6 + 3}px`,
              height: `${Math.random() * 6 + 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 25 + 20}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function GoodSideBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950/20 to-slate-900" />
      
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-[120px] animate-pulse" 
           style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyan-400/8 rounded-full blur-[100px] animate-pulse" 
           style={{ animationDuration: '9s', animationDelay: '3s' }} />
      
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-300/20 rounded-full"
            style={{
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 30 + 20}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              filter: 'blur(0.5px)',
              boxShadow: '0 0 10px rgba(147, 197, 253, 0.3)',
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
    </div>
  );
}

function MysteriousSideBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/40 to-black" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[150px] animate-pulse" 
           style={{ animationDuration: '10s' }} />
      
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-purple-400/25 rounded-full"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 35 + 25}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 10}s`,
              filter: 'blur(1px)',
              opacity: Math.random() * 0.6 + 0.2,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
}

function ZodiacBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-indigo-950/30 to-black" />
      
      <div className="absolute top-1/4 left-1/2 w-96 h-96 bg-indigo-600/12 rounded-full blur-[120px] animate-pulse" 
           style={{ animationDuration: '12s' }} />
      <div className="absolute bottom-1/4 right-1/2 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px] animate-pulse" 
           style={{ animationDuration: '11s', animationDelay: '4s' }} />
      
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => {
          const size = Math.random() * 3 + 1;
          return (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `twinkle ${Math.random() * 4 + 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.8 + 0.2,
              }}
            />
          );
        })}
      </div>

      <svg className="absolute inset-0 w-full h-full opacity-5">
        <defs>
          <pattern id="constellation" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="2" fill="white" />
            <circle cx="150" cy="100" r="2" fill="white" />
            <circle cx="100" cy="150" r="2" fill="white" />
            <line x1="50" y1="50" x2="150" y2="100" stroke="white" strokeWidth="0.5" />
            <line x1="150" y1="100" x2="100" y2="150" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#constellation)" />
      </svg>
    </div>
  );
}

function BigFiveBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950" />
      
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px] animate-pulse" 
           style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-violet-600/12 rounded-full blur-[100px] animate-pulse" 
           style={{ animationDuration: '9s', animationDelay: '2s' }} />
      
      <div className="absolute inset-0">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-purple-400/20 rounded-full"
            style={{
              width: `${Math.random() * 6 + 3}px`,
              height: `${Math.random() * 6 + 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 30 + 20}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 8}s`,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
