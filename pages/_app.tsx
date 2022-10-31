import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localUser = localStorage.getItem('logged-user')
    }
  })
  return <Component {...pageProps} />
}
