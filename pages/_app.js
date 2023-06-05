import { useEffect, useState } from 'react'
import Layout from '../layout'
import Cookies from 'js-cookie'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  const isAuthorized = Cookies.get('tknMembership')
  const [isMobile, setIsMobile] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    setIsMobile(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      ),
    )
  }, [])

  if (!hasMounted) {
    return null
  }

  if (!isAuthorized) {
    return <Component {...pageProps} isMobile={isMobile} />
  }

  return (
    <Layout isMobile={isMobile}>
      <Component {...pageProps} isMobile={isMobile} />
    </Layout>
  )
}
