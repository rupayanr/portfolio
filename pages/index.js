import Head from 'next/head'
import Script from 'next/script'
import Image from 'next/image'
import Hero from '../comps/Hero'


export default function Home() {
  return (
    <>
      <Head>
        <title>Rupayan Roy</title>
      </Head>
      <Hero />
    </>
  )
}
