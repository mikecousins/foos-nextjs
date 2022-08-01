import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Header from '../components/Header';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className="flex flex-col">
      <Header />
      <div className="container mx-auto mt-12">
        <Component {...pageProps} />
      </div>
      </div>
    </SessionProvider>
  );
}

export default MyApp;
