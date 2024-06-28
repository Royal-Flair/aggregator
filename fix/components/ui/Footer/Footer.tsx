import Link from 'next/link';

import Logo from '@/components/icons/Logo';
import GitHub from '@/components/icons/GitHub';

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1920px] px-6 bg-zinc-900">
      <div className="flex flex-col items-center justify-between py-12 space-y-4 md:flex-row bg-zinc-900 text-white">
        <div>
          <span>
            &copy; {new Date().getFullYear()} Nordkurve 12 e.V.
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-white">Crafted by Signal Kinetics PTY LTD</span>
          <a href="https://vercel.com" aria-label="Vercel.com Link">
            {/* <img
              src="/vercel.svg"
              alt="Vercel.com Logo"
              className="inline-block h-6 ml-4 text-white"
            /> */}
          </a>
        </div>
      </div>
    </footer>
  );
}
