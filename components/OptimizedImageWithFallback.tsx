'use client'

import Image from "next/image";
import fallback from "../public/asset-not-found.png";
import { useState } from "react";

function OptimizedImageWithFallback({ src, alt, fallBackSrc = fallback.src }: { src: string; alt: string; fallBackSrc?: string }) {
  const [imageError, setImageError] = useState(false);
  return (    
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] "
        src={imageError ? fallBackSrc : src }
        alt={alt}
        width={800}
        height={200}
        objectFit='cover'
        priority
        onError={() => setImageError(true)}
      />
    
  );
}

export default OptimizedImageWithFallback;