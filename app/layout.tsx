import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ENC Christmas Bible Jeopardy',
  description: 'Host-controlled Bible + Christmas Jeopardy for ENC NYC',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
