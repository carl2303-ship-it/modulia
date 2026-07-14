"use client";

import Image from "next/image";
import { useState } from "react";

type ModelThumbnailProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
};

export function ModelThumbnail({ src, alt, className = "object-cover", sizes }: ModelThumbnailProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-luxury-stone to-luxury-papyrus">
        <p className="font-ui text-[10px] uppercase tracking-wider text-luxury-muted">Modulia</p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      onError={() => setFailed(true)}
    />
  );
}
