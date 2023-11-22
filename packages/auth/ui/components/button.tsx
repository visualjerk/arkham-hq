import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

export type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
>

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`p-2 bg-indigo-700 text-indigo-100 hover:bg-indigo-800 rounded-sm font-bold tracking-wider ${className}`}
    >
      {children}
    </button>
  )
}
