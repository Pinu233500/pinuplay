export const metadata = {
  title: 'Pinuplay Music Player',
  description: 'Aplikasi pemutar musik online',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
