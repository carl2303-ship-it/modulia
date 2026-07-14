import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  linked?: boolean;
  className?: string;
};

const sizes = {
  sm: { width: 160, height: 64, className: "h-14 w-auto sm:h-16" },
  md: { width: 220, height: 88, className: "h-20 w-auto sm:h-24" },
  lg: { width: 300, height: 120, className: "h-28 w-auto sm:h-32" },
  xl: { width: 400, height: 160, className: "h-36 w-auto sm:h-44" },
  hero: { width: 520, height: 208, className: "h-48 w-auto sm:h-56 md:h-64 lg:h-72" },
};

export function Logo({ size = "md", linked = true, className = "" }: LogoProps) {
  const { width, height, className: sizeClass } = sizes[size];

  const image = (
    <Image
      src="/logo-modulia.png"
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
