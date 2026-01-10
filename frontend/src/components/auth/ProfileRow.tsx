export function ProfileRow({
  label,
  value,
  badge,
  badgeColor = 'bg-green-100 text-green-700',
}: {
  label: string;
  value?: string;
  badge?: string;
  badgeColor?: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-base font-medium text-slate-900 mt-0.5">
          {value || '—'}
        </p>
      </div>

      {badge && (
        <span
          className={`inline-flex items-center rounded-full px-3 py-1
                      text-xs font-semibold ${badgeColor}`}
        >
          {badge}
        </span>
      )}
    </div>
  );
}