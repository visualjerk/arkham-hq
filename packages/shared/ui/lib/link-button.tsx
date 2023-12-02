import { AnchorHTMLAttributes, PropsWithChildren } from 'react'
import { classNames } from './utils'

export type LinkButtonProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement>
>

export function LinkButton({ children, className, ...props }: LinkButtonProps) {
  return (
    <a
      {...props}
      className={classNames(
        `py-3 px-4 text-center bg-indigo-700 text-indigo-100 hover:bg-indigo-800 rounded-sm font-bold tracking-wider`,
        className
      )}
    >
      {children}
    </a>
  )
}
