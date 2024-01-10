import { GeistSans } from 'geist/font/sans'
import './globals.css'
import AuthButton from '@/components/AuthButton'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body className="bg-background text-foreground">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
				<div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
					<AuthButton />
          <p>{new Date().getDate().toString().padStart(2, "0")}.{(new Date().getMonth() + 1).toString().padStart(2, "0")}.{new Date().getFullYear().toString()}</p>
				</div>
			</nav>
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>

        <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
          <p>
            Powered by{" "}
            <a
              href="https://www.optimerch.de/"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Optimerch GmbH
            </a>
          </p>
        </footer>
      </body>
    </html>
  )
}
