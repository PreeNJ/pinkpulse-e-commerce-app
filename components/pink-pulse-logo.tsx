'use client';

import React from 'react';
const logoImage = '/products/pink_pulse_logo_1787509704779.jpg';

interface PinkPulseLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showTagline?: boolean;
  className?: string;
  variant?: 'circle' | 'horizontal' | 'emblem-only';
}

const sizeMap = {
  sm: { icon: 'w-9 h-9', title: 'text-sm', sub: 'text-[7.5px]', circle: 'w-14 h-14' },
  md: { icon: 'w-10 h-10 sm:w-11 sm:h-11', title: 'text-lg', sub: 'text-[8.5px]', circle: 'w-20 h-20' },
  lg: { icon: 'w-16 h-16', title: 'text-2xl', sub: 'text-[10px]', circle: 'w-28 h-28' },
  xl: { icon: 'w-24 h-24', title: 'text-3xl', sub: 'text-xs', circle: 'w-36 h-36' },
  '2xl': { icon: 'w-36 h-36', title: 'text-4xl', sub: 'text-sm', circle: 'w-52 h-52' },
};

const LogoEmblem: React.FC<{ customClass?: string }> = ({ customClass }) => (
  <div
    className={`relative rounded-full p-0.5 shadow-lg shadow-rose-950/30 ring-1 ring-[#e589a1]/60 flex items-center justify-center shrink-0 overflow-hidden bg-[#fce7ec] ${
      customClass || 'w-10 h-10'
    }`}
  >
    <img
      src={logoImage}
      alt="Pink Pulse Official Emblem"
      className="w-full h-full object-cover rounded-full select-none"
      loading="eager"
    />
  </div>
);

export const PinkPulseLogo: React.FC<PinkPulseLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
  variant = 'horizontal',
}) => {
  const dim = sizeMap[size];

  if (variant === 'emblem-only') {
    return <LogoEmblem customClass={className || dim.circle} />;
  }

  if (variant === 'circle') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <LogoEmblem customClass={dim.circle} />
        <div className="mt-2.5 space-y-0.5">
          <div className="font-serif font-bold text-white tracking-tight flex items-baseline justify-center gap-1">
            <span className={`${dim.title} text-white`}>Pink</span>
            <span className={`${dim.title} italic font-normal text-[#f47293]`}>Pulse</span>
          </div>
          {showTagline && (
            <p className={`uppercase tracking-[0.2em] text-[#e89cae] font-medium ${dim.sub}`}>
              PLEASURE • CONFIDENCE • YOU
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <LogoEmblem customClass={dim.icon} />
      <div className="flex flex-col justify-center text-left leading-tight">
        <div className="flex items-baseline gap-1">
          <span className={`font-serif font-bold tracking-tight text-white ${dim.title}`}>
            Pink
          </span>
          <span className={`font-serif italic font-normal text-[#f47293] ${dim.title}`}>
            Pulse
          </span>
        </div>
        {showTagline && (
          <span className={`uppercase tracking-[0.16em] text-[#e89cae] font-medium ${dim.sub} whitespace-nowrap mt-0.5`}>
            PLEASURE • CONFIDENCE • YOU
          </span>
        )}
      </div>
    </div>
  );
};
