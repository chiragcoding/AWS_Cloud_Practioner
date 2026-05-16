interface TopicSectionProps {
  title: string;
  children: React.ReactNode;
  id?: string;
}

export function TopicSection({ title, children, id }: TopicSectionProps) {
  return (
    <section id={id} className="mb-10 sm:mb-14 scroll-mt-8">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-1.5 h-7 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"></div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
          {title}
        </h2>
      </div>
      <div className="space-y-3 sm:space-y-4 pl-0 sm:pl-1">{children}</div>
    </section>
  );
}

interface InfoCardProps {
  title?: string;
  children: React.ReactNode;
  variant?: "default" | "tip" | "warning" | "important";
}

export function InfoCard({
  title,
  children,
  variant = "default",
}: InfoCardProps) {
  const variantStyles = {
    default: "border-slate-200/80 bg-white shadow-sm shadow-slate-100/50",
    tip: "border-emerald-200/80 bg-gradient-to-br from-emerald-50/80 to-teal-50/40 shadow-sm shadow-emerald-100/30",
    warning: "border-amber-200/80 bg-gradient-to-br from-amber-50/80 to-yellow-50/40 shadow-sm shadow-amber-100/30",
    important: "border-indigo-200/80 bg-gradient-to-br from-indigo-50/80 to-purple-50/40 shadow-sm shadow-indigo-100/30",
  };

  const iconMap = {
    default: "",
    tip: "💡",
    warning: "⚠️",
    important: "🎯",
  };

  const titleColors = {
    default: "text-slate-800",
    tip: "text-emerald-800",
    warning: "text-amber-800",
    important: "text-indigo-800",
  };

  const accentBar = {
    default: "",
    tip: "before:absolute before:left-0 before:top-4 before:bottom-4 before:w-[3px] before:rounded-full before:bg-gradient-to-b before:from-emerald-400 before:to-teal-400",
    warning: "before:absolute before:left-0 before:top-4 before:bottom-4 before:w-[3px] before:rounded-full before:bg-gradient-to-b before:from-amber-400 before:to-yellow-400",
    important: "before:absolute before:left-0 before:top-4 before:bottom-4 before:w-[3px] before:rounded-full before:bg-gradient-to-b before:from-indigo-400 before:to-purple-400",
  };

  return (
    <div
      className={`relative rounded-2xl border p-4 sm:p-5 transition-all duration-200 hover:shadow-md ${variantStyles[variant]} ${accentBar[variant]}`}
    >
      {title && (
        <h3
          className={`font-semibold text-[13px] mb-2 sm:mb-3 flex items-center gap-2 ${titleColors[variant]}`}
        >
          {iconMap[variant] && (
            <span className="text-base">{iconMap[variant]}</span>
          )}
          {title}
        </h3>
      )}
      <div className="text-[12px] sm:text-[13px] text-slate-600 leading-[1.7]">{children}</div>
    </div>
  );
}

interface TableProps {
  headers: string[];
  rows: string[][];
}

export function ComparisonTable({ headers, rows }: TableProps) {
  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0 rounded-none sm:rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-100/50">
      <table className="w-full text-[11px] sm:text-[13px]">
        <thead>
          <tr className="bg-gradient-to-r from-slate-50 to-slate-50/50">
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-3 sm:px-5 py-2.5 sm:py-3.5 text-left font-bold text-slate-600 border-b border-slate-200/80 text-[10px] sm:text-[11px] uppercase tracking-wider whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-slate-100/80 last:border-0 hover:bg-indigo-50/20 transition-colors duration-150"
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-3 sm:px-5 py-2.5 sm:py-3.5 ${
                    j === 0
                      ? "font-medium text-slate-700"
                      : "text-slate-500"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface BulletListProps {
  items: string[];
}

export function BulletList({ items }: BulletListProps) {
  return (
    <ul className="space-y-2 sm:space-y-3 text-[12px] sm:text-[13px] text-slate-600">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 sm:gap-3">
          <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
          </span>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}
