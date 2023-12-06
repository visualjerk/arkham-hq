'use client'
import { classNames } from '@arkham-hq/shared-ui'
import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { useFormStatus } from 'react-dom'

type ToggleButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    checked: boolean
  }
>

export function ToggleButton({
  children,
  className,
  checked,
  ...props
}: ToggleButtonProps) {
  const { pending } = useFormStatus()
  return (
    <button
      {...props}
      className={classNames(
        `py-1 px-4 inline-block text-center border shadow-sm rounded-md font-bold tracking-wider`,
        checked
          ? '!bg-indigo-600 text-indigo-50 hover:!bg-indigo-700 border-indigo-900 shadow-indigo-900'
          : '!bg-stone-100 text-stone-700 hover:!bg-stone-200 border-stone-300 shadow-stone-400',
        pending && 'opacity-50',
        className
      )}
      disabled={pending}
    >
      {children}
    </button>
  )
}
