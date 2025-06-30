import '../../styles/globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next';
import React from 'react';

export const metadata = {
  title: "Calculateur de cout de produit - GH Soft Algérie ",
  description: "Votre plateforme E-Commerce 100% Algérienne",
  manifest: '/manifest.json'
};

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
