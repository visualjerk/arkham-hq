import { Label as AriaLabel, LabelProps } from 'react-aria-components'

export function Label({ className, children, ...props }: LabelProps) {
  return (
    <AriaLabel {...props} className={`text-slate-800 text-sm ${className}`}>
      {children}
    </AriaLabel>
  )
}
