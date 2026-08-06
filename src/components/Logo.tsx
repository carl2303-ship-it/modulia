import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  size?: "sm" | "md" | "header" | "lg" | "xl" | "hero";
  variant?: "default" | "white";
  linked?: boolean;
  className?: string;
};

const sizes = {
  sm: { width: 200, height: 200, className: "h-[4.375rem] w-auto sm:h-20" },
  md: { width: 275, height: 275, className: "h-[6.25rem] w-auto sm:h-[7.5rem]" },
  header: { width: 225, height: 225, className: "h-20 w-auto sm:h-[6.25rem]" },
  lg: { width: 350, height: 350, className: "h-[7.5rem] w-auto sm:h-[8.75rem]" },
  xl: { width: 450, height: 450, className: "h-40 w-auto sm:h-[11.25rem]" },
  hero: { width: 600, height: 600, className: "h-[12.5rem] w-auto sm:h-[15rem] md:h-[17.5rem]" },
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
