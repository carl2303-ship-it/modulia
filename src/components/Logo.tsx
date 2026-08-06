import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  size?: "sm" | "md" | "header" | "footer" | "lg" | "xl" | "hero";
  variant?: "default" | "white";
  linked?: boolean;
  className?: string;
};

/** Logo wide ~2.4:1 após trim — alturas em rem, largura auto */
const sizes = {
  sm: { width: 240, height: 100, className: "h-14 w-auto sm:h-16" },
  md: { width: 330, height: 138, className: "h-20 w-auto sm:h-24" },
  header: { width: 243, height: 102, className: "h-[4.455rem] w-auto sm:h-[5.468rem]" },
  footer: { width: 420, height: 175, className: "h-[9.375rem] w-auto sm:h-[10.9375rem]" },
  lg: { width: 420, height: 175, className: "h-[9.375rem] w-auto sm:h-[10.9375rem]" },
  xl: { width: 540, height: 225, className: "h-40 w-auto sm:h-[11.25rem]" },
  hero: { width: 720, height: 300, className: "h-[12.5rem] w-auto sm:h-[15rem] md:h-[17.5rem]" },
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
      className={`block shrink-0 ${sizeClass} ${className}`}
      priority
      unoptimized
    />
  );

  if (!linked) return image;

  return (
    <Link href="/" className="inline-flex shrink-0 items-center" aria-label="Modulia">
      {image}
    </Link>
  );
}
