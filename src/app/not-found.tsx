import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <div className="max-w-md space-y-4 rounded border border-[#D9D4CB] bg-[#EFECE6] p-8">
        <p className="text-xs uppercase tracking-widest text-[#9E5D46]">404 Not Found</p>
        <h2 className="text-xl font-normal text-[#1C1B19]">Page Not Found</h2>
        <p className="text-sm text-[#5C5852]">
          The requested spatial resource or page could not be located.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-block rounded bg-[#1C1B19] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#3D3B37]"
          >
            Return to Atelier
          </Link>
        </div>
      </div>
    </div>
  );
}
