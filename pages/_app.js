import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page)
  return  (
      <SessionProvider session={pageProps.session}>
          {getLayout(<Component {...pageProps} />)}
      </SessionProvider>

  )
}

export default MyApp
