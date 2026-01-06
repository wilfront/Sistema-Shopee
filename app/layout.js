import './globals.css'

export const metadata = {
  title: '⚡ Shopee Xpress - Controle de Bipagem',
  description: 'Sistema de Controle de Bipagem para Shopee Xpress',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  )
}
