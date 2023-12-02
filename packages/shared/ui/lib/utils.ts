export function classNames(...classes: (false | string | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
