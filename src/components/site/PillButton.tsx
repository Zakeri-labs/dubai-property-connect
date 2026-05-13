import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "gold";
  to?: string;
  href?: string;
  className?: string;
  external?: boolean;
};

export function PillButton({ children, variant = "primary", to, href, className, external }: Props) {
  const styles = cn(
    "group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all",
    variant === "primary" && "bg-foreground text-background hover:bg-primary",
    variant === "secondary" && "border border-border bg-surface text-foreground hover:bg-accent",
    variant === "gold" && "bg-gold text-gold-foreground hover:brightness-105",
    className,
  );
  const inner = (
    <>
      <span>{children}</span>
      <span className="grid h-7 w-7 place-items-center rounded-full bg-background/15 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
        <ArrowUpRight className="h-3.5 w-3.5" />
      </span>
    </>
  );
  if (href) {
    return (
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener" : undefined} className={styles}>
        {inner}
      </a>
    );
  }
  if (to) {
    return (
      <Link to={to} className={styles}>
        {inner}
      </Link>
    );
  }
  return <button className={styles}>{inner}</button>;
}
