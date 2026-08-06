import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  size?: "sm" | "md" | "header" | "lg" | "xl" | "hero";
  variant?: "default" | "white";
  linked?: boolean;
  className?: string;
};

const sizes = {
  sm: { width: 320, height: 128, className: "h-28 w-auto sm:h-32" },
  md: { width: 440, height: 176, className: "h-40 w-auto sm:h-48" },
  header: { width: 308, height: 124, className: "h-28 w-auto sm:h-[8.4rem]" },
  lg: { width: 600, height: 240, className: "h-56 w-auto sm:h-64" },
  xl: { width: 800, height: 320, className: "h-72 w-auto sm:h-[22rem]" },
  hero: { width: 1040, height: 416, className: "h-96 w-auto sm:h-[28rem] md:h-[32rem] lg:h-[36rem]" },
};

export function Logo({
  size = "md",
  variant = "default",
  linked = true,
  className = "",
}: LogoProps) {
  const { width, height, className: sizeClass } = sizes[size];
  const src =
    variant === "white" ? "/logo-modulia-blanc.png" : "/logo-modulia.png";

  const image = (
    <Image
      src={src}
      alt="Modulia — Maisons modulaires"
      width={width}
      height={height}
      className={`${sizeClass} ${className}`}
      priority
    />
  );

  if (!linked) return image;

  return (
    <Link href="/" className="inline-flex shrink-0 items-center">
      {image}
    </Link>
  );
}
