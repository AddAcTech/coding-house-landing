import "./globals.css";

export const metadata = {
  title: "Evento Hackathon - Contador y Actividad",
  description:
    "Seguimiento de tiempo restante y actividad de commits para el evento hackathon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-mono">{children}</body>
    </html>
  );
}
