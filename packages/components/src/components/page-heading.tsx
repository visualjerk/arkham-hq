import { HtmlHTMLAttributes, PropsWithChildren } from 'react'

export type HeadingProps = PropsWithChildren<
  HtmlHTMLAttributes<HTMLHeadingElement>
>

export default function PageHeading({
  children,
  className,
  ...props
}: HeadingProps) {
  return (
    <h1
      {...props}
      className={`text-xl text-slate-900 font-semibold ${className}`}
    >
      {children}
    </h1>
  )
}
