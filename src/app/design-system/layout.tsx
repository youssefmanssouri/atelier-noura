import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design System Validation | Atelier Noura',
  description: 'Internal development preview of the Atelier Noura design system and UI primitives.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
