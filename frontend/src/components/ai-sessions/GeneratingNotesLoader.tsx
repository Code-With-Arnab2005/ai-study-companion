'use client';

export default function GeneratingNotesLoader() {
  return (
    <div className="flex items-center justify-center">
      <p className="text-lg font-medium text-gray-700 flex items-center">
        generating notes
        <span className="ml-1 inline-flex w-6 justify-start">
          <span className="animate-pulse">.</span>
          <span className="animate-pulse delay-150">.</span>
          <span className="animate-pulse delay-300">.</span>
        </span>
      </p>
    </div>
  );
}
