import { Input as AriaInput, InputProps } from 'react-aria-components'

export function Input({ className, ...props }: InputProps) {
  return (
    <AriaInput
      {...props}
      className={`py-2 px-3 rounded-sm border border-slate-500 outline-2 outline-blue-400 outline-offset-2 ${className}`}
    />
  )
}
