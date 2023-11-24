'use client'
import {
  TextField as AriaTextField,
  TextFieldProps,
} from 'react-aria-components'

export function TextField({ className, children, ...props }: TextFieldProps) {
  return (
    <AriaTextField {...props} className={`grid gap-1 ${className}`}>
      {children}
    </AriaTextField>
  )
}
