import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react';

import Layout from '@/components/Layout'

export default function App({
      Component, pageProps: { session, ...pageProps }
    }) {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ChakraProvider>
  )
}
