'use client'

import { Label as AriaLabel, LabelProps } from 'react-aria-components'
import { classNames } from './utils'

export function Label({ className, children, ...props }: LabelProps) {
  return (
    <AriaLabel
      {...props}
      className={classNames(`text-stone-800 text-sm`, className)}
    >
      {children}
    </AriaLabel>
  )
}
