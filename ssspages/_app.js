import '@/styles/globals.css'
import Layout from '@/components/Layout'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { useEffect } from 'react';
export default function App({ Component, pageProps }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }, []);
  return <Layout>
    <Component {...pageProps} />
    <SpeedInsights />
  </Layout>
}