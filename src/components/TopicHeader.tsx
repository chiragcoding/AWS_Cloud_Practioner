interface TopicHeaderProps {
  icon: string;
  title: string;
  subtitle: string;
  sections: { id: string; title: string }[];
}

export function TopicHeader({
  icon,
  title,
  subtitle,
  sections,
}: TopicHeaderProps) {
  return (
    <div className="mb-8 sm:mb-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 sm:mb-6">
        <a href="/" className="hover:text-indigo-500 transition-colors">
          Home
        </a>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-slate-600 font-medium">{title}</span>
      </div>

      {/* Title area */}
      <div className="flex items-start gap-3 sm:gap-5">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-50 flex items-center justify-center shadow-sm border border-indigo-100/50 shrink-0">
          <span className="text-2xl sm:text-3xl">{icon}</span>
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            {title}
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 sm:mt-1.5 leading-relaxed max-w-lg">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="mt-6 sm:mt-8 bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-sm shadow-slate-100">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center">
            <svg
              className="w-3.5 h-3.5 text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          </div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Quick Navigation
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {sections.map((section, i) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl group"
            >
              <span className="w-5 h-5 rounded-md bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0">
                {i + 1}
              </span>
              <span className="truncate">{section.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
