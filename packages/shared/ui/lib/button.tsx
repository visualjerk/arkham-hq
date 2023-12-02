import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { classNames } from './utils'

export type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
>

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={classNames(
        `py-3 px-4 text-center bg-indigo-700 text-indigo-100 hover:bg-indigo-800 rounded-sm font-bold tracking-wider`,
        className
      )}
    >
      {children}
    </button>
  )
}
