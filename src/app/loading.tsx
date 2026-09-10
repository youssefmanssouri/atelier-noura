export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="text-center space-y-2">
        <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-[#D9D4CB] border-t-[#1C1B19]" />
        <p className="text-xs tracking-widest text-[#5C5852] uppercase">Loading</p>
      </div>
    </div>
  );
}
