import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonVariant = "primary" | "secondary" | "text";

type SharedButtonProps = Readonly<{
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
}>;

type ButtonElementProps = SharedButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonLinkProps = SharedButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonElementProps | ButtonLinkProps;

function isButtonLink(props: ButtonProps): props is ButtonLinkProps {
  return "href" in props && typeof props.href === "string";
}

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const classes = ["button", `button--${variant}`, props.className]
    .filter(Boolean)
    .join(" ");

  if (isButtonLink(props)) {
    const { children, className: _className, href, variant: _variant, ...linkProps } = props;

    return (
      <Link className={classes} href={href} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { children, className: _className, variant: _variant, ...buttonProps } = props;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
