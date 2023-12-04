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
        `py-2 px-4 inline-block text-center bg-teal-600 text-teal-50 hover:bg-teal-700 border border-teal-900 shadow-sm shadow-teal-900 rounded-md font-bold tracking-wider`,
        className
      )}
    >
      {children}
    </button>
  )
}
