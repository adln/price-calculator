import '@/styles/globals.css'
import Layout from '@/components/Layout'
import { SpeedInsights } from "@vercel/speed-insights/next"
export default function App({ Component, pageProps }) {
  return <Layout>
    <Component {...pageProps} />
    <SpeedInsights />
    </Layout>
}