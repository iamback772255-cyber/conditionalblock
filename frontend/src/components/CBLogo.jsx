import React from 'react';

/**
 * CB Logo component - renders the ConditionalBlock "CB" monogram logo as an inline SVG.
 * Supports custom size and className props.
 */
export default function CBLogo({ size = 40, className = '', style = {} }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={style}
    >
      <defs>
        <linearGradient id="cbGradMain" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="45%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="cbGradShine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#c4b5fd" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.8" />
        </linearGradient>
        <filter id="cbGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Background shape for better contrast */}
      <circle cx="50" cy="50" r="48" fill="rgba(6, 182, 212, 0.05)" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="2" />

      {/* CB Text Logo */}
      <text
        x="50"
        y="68"
        fontFamily="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
        fontSize="48"
        fontWeight="800"
        textAnchor="middle"
        letterSpacing="-3"
        fill="url(#cbGradMain)"
        filter="url(#cbGlow)"
      >
        CB
      </text>
      
      {/* Subtle shine overlay */}
      <text
        x="50"
        y="68"
        fontFamily="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
        fontSize="48"
        fontWeight="800"
        textAnchor="middle"
        letterSpacing="-3"
        fill="url(#cbGradShine)"
        opacity="0.4"
      >
        CB
      </text>
    </svg>
  );
}

// Optimized for performance and readability
