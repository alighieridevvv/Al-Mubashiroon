interface BearerLogoProps {
  className?: string;
  size?: number;
}

export default function BearerLogo({ className = '', size = 50 }: BearerLogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 400 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
    >
      {/* 1. Outer Dark Brown & Black Double-Border Rim */}
      <circle cx="200" cy="200" r="195" fill="#0A0403" />
      <circle cx="200" cy="200" r="188" fill="#1B0E0C" stroke="#D39858" strokeWidth="2.5" />
      <circle cx="200" cy="200" r="182" fill="#2D1714" stroke="#D39858" strokeWidth="0.8" strokeOpacity="0.6" />

      {/* 2. Concentric Calibrator / Instrument Rings and Ticks */}
      <circle cx="200" cy="200" r="165" stroke="#85431E" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="200" cy="200" r="150" stroke="#D39858" strokeWidth="0.5" strokeOpacity="0.4" />
      
      {/* 4 Cardinal Axis Ticks */}
      <line x1="200" y1="5" x2="200" y2="25" stroke="#D39858" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="200" y1="375" x2="200" y2="395" stroke="#D39858" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="5" y1="200" x2="25" y2="200" stroke="#D39858" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="375" y1="200" x2="395" y2="200" stroke="#D39858" strokeWidth="1" strokeOpacity="0.5" />

      {/* 3. The 12 Sunburst Points (Golden triangular rays pointing outwards) */}
      <g id="sunburst-rays">
        {/* Ray 1 (0 deg - North) */}
        <polygon points="200,60 188,110 212,110" fill="#D39858" />
        <polygon points="200,60 200,110 212,110" fill="#85431E" opacity="0.75" />
        {/* Ray 2 (30 deg) */}
        <g transform="rotate(30, 200, 200)">
          <polygon points="200,60 188,110 212,110" fill="#D39858" />
          <polygon points="200,60 200,110 212,110" fill="#85431E" opacity="0.75" />
        </g>
        {/* Ray 3 (60 deg) */}
        <g transform="rotate(60, 200, 200)">
          <polygon points="200,60 188,110 212,110" fill="#D39858" />
          <polygon points="200,60 200,110 212,110" fill="#85431E" opacity="0.75" />
        </g>
        {/* Ray 4 (90 deg - East) */}
        <g transform="rotate(90, 200, 200)">
          <polygon points="200,60 188,110 212,110" fill="#D39858" />
          <polygon points="200,60 200,110 212,110" fill="#85431E" opacity="0.75" />
        </g>
        {/* Ray 5 (120 deg) */}
        <g transform="rotate(120, 200, 200)">
          <polygon points="200,60 188,110 212,110" fill="#D39858" />
          <polygon points="200,60 200,110 212,110" fill="#85431E" opacity="0.75" />
        </g>
        {/* Ray 6 (150 deg) */}
        <g transform="rotate(150, 200, 200)">
          <polygon points="200,60 188,110 212,110" fill="#D39858" />
          <polygon points="200,60 200,110 212,110" fill="#85431E" opacity="0.75" />
        </g>
        {/* Ray 7 (180 deg - South) */}
        <g transform="rotate(180, 200, 200)">
          <polygon points="200,60 188,110 212,110" fill="#D39858" />
          <polygon points="200,60 200,110 212,110" fill="#85431E" opacity="0.75" />
        </g>
        {/* Ray 8 (210 deg) */}
        <g transform="rotate(210, 200, 200)">
          <polygon points="200,60 188,110 212,110" fill="#D39858" />
          <polygon points="200,60 200,110 212,110" fill="#85431E" opacity="0.75" />
        </g>
        {/* Ray 9 (240 deg) */}
        <g transform="rotate(240, 200, 200)">
          <polygon points="200,60 188,110 212,110" fill="#D39858" />
          <polygon points="200,60 200,110 212,110" fill="#85431E" opacity="0.75" />
        </g>
        {/* Ray 10 (270 deg - West) */}
        <g transform="rotate(270, 200, 200)">
          <polygon points="200,60 188,110 212,110" fill="#D39858" />
          <polygon points="200,60 200,110 212,110" fill="#85431E" opacity="0.75" />
        </g>
        {/* Ray 11 (300 deg) */}
        <g transform="rotate(300, 200, 200)">
          <polygon points="200,60 188,110 212,110" fill="#D39858" />
          <polygon points="200,60 200,110 212,110" fill="#85431E" opacity="0.75" />
        </g>
        {/* Ray 12 (330 deg) */}
        <g transform="rotate(330, 200, 200)">
          <polygon points="200,60 188,110 212,110" fill="#D39858" />
          <polygon points="200,60 200,110 212,110" fill="#85431E" opacity="0.75" />
        </g>
      </g>

      {/* 4. Medallion Central Circle & Its Concentric Rings */}
      <circle cx="200" cy="200" r="114" fill="#0E0504" stroke="#D39858" strokeWidth="4" />
      <circle cx="200" cy="200" r="108" stroke="#85431E" strokeWidth="1.5" />
      <circle cx="200" cy="200" r="92" stroke="#D39858" strokeWidth="0.8" strokeOpacity="0.4" />

      {/* 5. Crescent Moon Emblem Top-Center */}
      <path 
        d="M200,165 C205,165 208,168 208,172 C208,176 198,179 192,172 C192,168 196,165 200,165 Z" 
        fill="#EACEAA" 
        opacity="0.85" 
      />

      {/* 6. High-Contrast Rendered Arabic script: "المبشرين" */}
      <text 
        x="200" 
        y="212" 
        fill="#F4E0C4" 
        fontSize="54" 
        fontWeight="bold" 
        fontFamily="'Amiri', 'Scheherazade New', 'Traditional Arabic', 'Meiryo', serif" 
        textAnchor="middle"
        letterSpacing="0"
      >
        المبشرين
      </text>

      {/* 7. Three Central Dots Underneath */}
      <circle cx="182" cy="232" r="5" fill="#D39858" />
      <circle cx="200" cy="232" r="5" fill="#D39858" />
      <circle cx="218" cy="232" r="5" fill="#D39858" />

    </svg>
  );
}
