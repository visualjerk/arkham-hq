'use client'

import {
  Input as AriaInput,
  InputProps as AriaInputProps,
} from 'react-aria-components'
import { classNames } from './utils'

export type InputProps = AriaInputProps & {
  className?: string
}

export function Input({ className, ...props }: InputProps) {
  return (
    <AriaInput
      {...props}
      className={classNames(
        `py-2 px-3 rounded-sm border border-slate-500 outline-2 outline-blue-400 outline-offset-2`,
        className
      )}
    />
  )
}
