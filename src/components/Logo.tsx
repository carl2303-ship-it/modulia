import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  size?: "sm" | "md" | "header" | "lg" | "xl" | "hero";
  variant?: "default" | "white";
  linked?: boolean;
  className?: string;
};

const sizes = {
  sm: { width: 160, height: 160, className: "h-14 w-auto sm:h-16" },
  md: { width: 220, height: 220, className: "h-20 w-auto sm:h-24" },
  header: { width: 180, height: 180, className: "h-16 w-auto sm:h-20" },
  lg: { width: 280, height: 280, className: "h-24 w-auto sm:h-28" },
  xl: { width: 360, height: 360, className: "h-32 w-auto sm:h-36" },
  hero: { width: 480, height: 480, className: "h-40 w-auto sm:h-48 md:h-56" },
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
