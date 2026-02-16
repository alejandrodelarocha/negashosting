import './globals.css'

export const metadata = {
  title: 'Alejandro de la Rocha - Full Stack Engineer',
  description: 'Professional portfolio of Alejandro, a full-stack engineer with 16+ years of experience in React, Node.js, AI integration, and web development.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
