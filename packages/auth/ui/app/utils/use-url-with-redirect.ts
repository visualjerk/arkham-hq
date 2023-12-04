import { useSearchParams } from 'next/navigation'

export function useUrlWithRedirect(url: string): URL {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo')

  const newUrl = new URL(
    `${window.location.protocol}//${window.location.host}${url}`
  )

  if (redirectTo != null) {
    newUrl.searchParams.append('redirectTo', redirectTo)
  }

  return newUrl
}
