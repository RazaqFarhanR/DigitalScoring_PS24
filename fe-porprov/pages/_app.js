import '../styles/globals.css'
import Context from '../context/context'
import { SocketProvider } from '../context/socketContext'
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>KAYPANG SILAT SPORT</title>
        <link rel="shortcut icon" type="image/png" href="/images/logo_new.png" />
      </Head>
      <SocketProvider>
        <Context>
          <Component {...pageProps} />
        </Context>
      </SocketProvider>
    </>
  )
}

export default MyApp
