'use client';

export default function Loader() {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center
                    bg-linear-to-br from-slate-100 to-slate-200">

      <div className="flex flex-col items-center gap-6">

        {/* Spinner */}
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-slate-300" />
          <div
            className="absolute inset-0 h-16 w-16 rounded-full
                       border-4 border-indigo-600 border-t-transparent
                       animate-spin"
          />
        </div>

        {/* Text */}
        <p className="text-sm font-medium text-slate-600 tracking-wide">
          Loading, please wait...
        </p>

      </div>
    </div>
  );
}
