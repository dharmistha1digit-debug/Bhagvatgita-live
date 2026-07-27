// Server Component — no 'use client' here
// This pattern fixes the Turbopack ChunkLoadError:
// The page itself stays a server component; only the child is a client component.
import SplashScreen from './_components/SplashScreen';

export default function RootPage() {
  return <SplashScreen />;
}