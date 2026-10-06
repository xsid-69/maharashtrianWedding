"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type GracefulImageProps = Omit<ImageProps, "src"> & {
  src: string;
  fallback: string;
};

export function GracefulImage({ src, fallback, alt, onError, quality = 85, ...props }: GracefulImageProps) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const useFallback = failedSource === src;

  return (
    <Image
      {...props}
      src={useFallback ? fallback : src}
      alt={alt}
      quality={quality}
      onError={(event) => {
        if (!useFallback) setFailedSource(src);
        onError?.(event);
      }}
    />
  );
}
