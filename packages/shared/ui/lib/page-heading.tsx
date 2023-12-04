import { HtmlHTMLAttributes, PropsWithChildren } from 'react'
import { classNames } from './utils'

export type HeadingProps = PropsWithChildren<
  HtmlHTMLAttributes<HTMLHeadingElement>
>

export function PageHeading({ children, className, ...props }: HeadingProps) {
  return (
    <h1
      {...props}
      className={classNames(`text-xl text-stone-700 font-semibold`, className)}
    >
      {children}
    </h1>
  )
}
