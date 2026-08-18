import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  heightClassName?: string;
};

export function BrandLogo({ className, heightClassName = "h-11" }: BrandLogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/comfort-logo.svg"
      alt="comfort"
      className={cn("w-auto object-contain object-left", heightClassName, className)}
    />
  );
}
