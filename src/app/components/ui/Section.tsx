import React from "react";
import { cn } from "./cn";

type SectionProps = {
  id?: string;
  soft?: boolean;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
};

export const Section = ({ id, soft = false, className, innerClassName, children }: SectionProps) => (
  <section id={id} className={cn("section-shell", soft ? "section-shell-soft" : "bg-white", className)}>
    <div className={cn("container-shell", innerClassName)}>{children}</div>
  </section>
);
