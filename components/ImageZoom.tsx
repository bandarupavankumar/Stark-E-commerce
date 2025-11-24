// components/ImageZoom.tsx
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface ImageZoomProps {
  src: string;
  alt: string;
  zoomLevel?: number;
  className?: string;
}

const ImageZoom = ({ src, alt, zoomLevel = 2, className = '' }: ImageZoomProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setPosition({ x: e.clientX - left - 60, y: e.clientY - top - 60 });
    setBackgroundPosition(`${x}% ${y}%`);
  };

  return (
    <div className={`relative ${className}`}>
      <div
        ref={imageRef}
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={src}
          alt={alt}
          width={500}
          height={500}
          className="w-full h-auto"
        />
        
        {isHovering && (
          <div 
            className="absolute pointer-events-none border-2 border-gray-300 rounded-full bg-white bg-opacity-50"
            style={{
              width: '120px',
              height: '120px',
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: 'translate(-50%, -50%)',
              backgroundImage: `url(${src})`,
              backgroundSize: `${100 * zoomLevel}%`,
              backgroundPosition: backgroundPosition,
              backgroundRepeat: 'no-repeat',
              zIndex: 10,
              display: 'block'
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ImageZoom;