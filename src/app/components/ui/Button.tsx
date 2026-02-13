import React from "react";
import { cn } from "./cn";

type ButtonVariant = "primary" | "outline" | "nav" | "muted" | "icon" | "iconControl" | "cardLink";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "btn-primary-pill",
  outline: "btn-outline-pill",
  nav: "nav-link",
  muted: "muted-link",
  icon: "icon-link",
  iconControl: "icon-control-btn",
  cardLink: "card-link",
};

export const buttonClass = (variant: ButtonVariant, className?: string) =>
  cn(VARIANT_CLASSES[variant], className);

type LinkButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant: ButtonVariant;
};

export const LinkButton = ({ variant, className, ...props }: LinkButtonProps) => (
  <a {...props} className={buttonClass(variant, className)} />
);

type ActionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: ButtonVariant;
};

export const ActionButton = ({ variant, className, ...props }: ActionButtonProps) => (
  <button {...props} className={buttonClass(variant, className)} />
);
