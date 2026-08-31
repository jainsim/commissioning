/*
  Drawn as inline SVG rather than loaded as an image.

  Two reasons. It ships inside the JS bundle, so there is no extra request and
  nothing to cache separately. And it inherits currentColor, so it repaints
  with the brand palette instead of being a flat PNG that has to be re-exported
  every time the accent colour changes.
*/

export function CapturePhotoArt() {
  return (
    <svg viewBox="0 0 220 150" width="100%" height="100%" role="img" aria-label="Hold the phone sideways to photograph the station">
      <rect x="128" y="10" width="72" height="130" rx="11" fill="#F4F6F9" stroke="#D8DEE5" strokeWidth="2.5" />
      <rect x="152" y="20" width="24" height="4" rx="2" fill="#D8DEE5" />
      <rect x="12" y="52" width="132" height="80" rx="11" fill="#0B0F14" />
      <rect x="22" y="60" width="112" height="64" rx="5" fill="#EDF1F6" />
      <circle cx="139" cy="92" r="4.5" fill="#5A6672" />
      <rect x="17" y="84" width="4" height="16" rx="2" fill="#5A6672" />
      {/* the station inside the viewfinder */}
      <rect x="66" y="70" width="20" height="46" rx="4" fill="#2B5BFF" />
      <rect x="70" y="76" width="12" height="12" rx="2" fill="#fff" />
      <path d="M75.5 92l-3 7h4l-2.5 7 6-9h-4l2-5z" fill="#fff" />
      <rect x="36" y="98" width="18" height="18" rx="2" fill="#C6CFDA" />
      <rect x="98" y="92" width="24" height="24" rx="2" fill="#C6CFDA" />
      {/* rotate arrow */}
      <path d="M104 32c-14 0-24 10-26 22" stroke="#0B0F14" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M71 46l7 10 9-8z" fill="#0B0F14" />
    </svg>
  )
}

export function SiteMapArt() {
  return (
    <svg viewBox="0 0 320 150" width="100%" height="100%" role="img" aria-label="Site map showing the station location">
      <rect width="320" height="150" fill="#E8EDF2" />
      <rect x="0" y="0" width="320" height="34" fill="#DBE3EB" />
      <rect x="0" y="104" width="320" height="46" fill="#DBE3EB" />
      <path d="M0 60h320M0 92h320" stroke="#CBD5DF" strokeWidth="14" />
      <path d="M0 76h320" stroke="#fff" strokeWidth="2" strokeDasharray="16 12" />
      {[18, 62, 106, 214, 258].map((x) => (
        <rect key={x} x={x} y={8} width={34} height={20} rx="3" fill="#C3CDD8" />
      ))}
      {[24, 68, 200, 244, 288].map((x) => (
        <rect key={x} x={x} y={114} width={28} height={26} rx="3" fill="#C3CDD8" />
      ))}
      <circle cx="160" cy="76" r="21" fill="#2B5BFF" opacity=".18" />
      <path d="M160 60a11 11 0 00-11 11c0 8 11 20 11 20s11-12 11-20a11 11 0 00-11-11z" fill="#2B5BFF" />
      <circle cx="160" cy="71" r="4.2" fill="#fff" />
    </svg>
  )
}
