import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import "@rainbow-me/rainbowkit/styles.css"
import Web3Providers from "@/components/web3Providers"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MLEE DAO - Decentralized Governance Token on BNB Chain",
  description:
    "MLEE DAO (MDAO) is a decentralized governance token on BNB Chain focused on long-term ecosystem development and transparent community ownership.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* X conversion tracking base code */}
   <script
  dangerouslySetInnerHTML={{
    __html: `
!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
twq('config','rc1l8');
    `,
  }}
/>
        {/* End X conversion tracking base code */}
      </head>
      <body className={`font-sans antialiased`}>
        <Web3Providers>{children}</Web3Providers>
      </body>
    </html>
  )
}
