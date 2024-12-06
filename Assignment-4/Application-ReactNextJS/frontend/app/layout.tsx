import React from 'react';
import '../public/styles/home.css';  // Import your global CSS

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Smart Talent Hire</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}  {/* The content of your page will be injected here */}
      </body>
    </html>
  );
}
