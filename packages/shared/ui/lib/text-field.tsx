'use client'

import {
  TextField as AriaTextField,
  TextFieldProps as AriaTextFieldProps,
} from 'react-aria-components'
import { classNames } from './utils'

export type TextFieldProps = AriaTextFieldProps & {
  className?: string
}

export function TextField({ className, children, ...props }: TextFieldProps) {
  return (
    <AriaTextField {...props} className={classNames(`grid gap-1`, className)}>
      {children}
    </AriaTextField>
  )
}
