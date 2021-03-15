import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
  <Head>
   <meta name="viewport" content="width=device-width, maximum-scale=1.5" />
  </Head>
    
  <Component {...pageProps} />
  </>);
}

export default MyApp
