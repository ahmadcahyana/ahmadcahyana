
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cahyana Portfolio',
  description: 'Portfolio of Ahmad Cahyana, Backend and Fullstack Engineer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet"></link>
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
