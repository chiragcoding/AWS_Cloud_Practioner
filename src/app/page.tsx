import Link from "next/link";

const topics = [
  {
    name: "IAM",
    href: "/topics/iam",
    icon: "🔐",
    description: "Identity & Access Management",
    details: "Users, Groups, Roles, Policies, MFA, Best Practices",
    gradient: "from-violet-500 to-purple-600",
    lightGradient: "from-violet-50 to-purple-50",
    borderHover: "hover:border-violet-200",
    iconBg: "bg-violet-100",
  },
  {
    name: "EC2",
    href: "/topics/ec2",
    icon: "🖥️",
    description: "Elastic Compute Cloud",
    details: "Instance Types, Security Groups, Purchasing Options, AMIs",
    gradient: "from-blue-500 to-indigo-600",
    lightGradient: "from-blue-50 to-indigo-50",
    borderHover: "hover:border-blue-200",
    iconBg: "bg-blue-100",
  },
  {
    name: "EBS & Storage",
    href: "/topics/ebs",
    icon: "💾",
    description: "Elastic Block Store & Storage",
    details: "EBS Volumes, Snapshots, EFS, Instance Store, FSx",
    gradient: "from-emerald-500 to-teal-600",
    lightGradient: "from-emerald-50 to-teal-50",
    borderHover: "hover:border-emerald-200",
    iconBg: "bg-emerald-100",
  },
  {
    name: "ELB & ASG",
    href: "/topics/elb-asg",
    icon: "⚖️",
    description: "Load Balancers & Auto Scaling",
    details: "ALB, NLB, GWLB, Scaling Policies, Health Checks",
    gradient: "from-orange-500 to-amber-600",
    lightGradient: "from-orange-50 to-amber-50",
    borderHover: "hover:border-orange-200",
    iconBg: "bg-orange-100",
  },
  {
    name: "S3",
    href: "/topics/s3",
    icon: "🪣",
    description: "Simple Storage Service",
    details: "Buckets, Objects, Storage Classes, Versioning, Security",
    gradient: "from-rose-500 to-pink-600",
    lightGradient: "from-rose-50 to-pink-50",
    borderHover: "hover:border-rose-200",
    iconBg: "bg-rose-100",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-slate-200/60">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/40 via-white to-white"></div>
        <div className="relative max-w-6xl mx-auto px-6 md:px-10 pt-20 pb-16">
          {/* Floating badge */}
          <div className="flex justify-center mb-8 animate-slide-up">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass border border-white/60 shadow-lg shadow-indigo-100/30">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
              </span>
              <span className="text-xs font-semibold text-slate-700">
                Updated for CLF-C02 · 2025
              </span>
            </div>
          </div>

          {/* Main heading */}
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-center text-slate-900 tracking-tight leading-[1.1]">
              Master AWS
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Cloud Practitioner
              </span>
            </h1>
          </div>

          <p
            className="mt-6 text-center text-slate-500 max-w-xl mx-auto text-lg leading-relaxed animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            The only study guide you need. Interactive notes, exam scenarios,
            comparison tables, and an AI tutor — all in one place.
          </p>

          {/* Stats row */}
          <div
            className="mt-12 flex flex-wrap justify-center gap-3 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            {[
              { label: "Topics", value: "5", icon: "📚" },
              { label: "Exam Tips", value: "50+", icon: "💡" },
              { label: "Comparison Tables", value: "10+", icon: "📊" },
              { label: "Practice Scenarios", value: "20+", icon: "🎯" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-white/70 border border-slate-200/60 shadow-sm"
              >
                <span className="text-base">{stat.icon}</span>
                <div>
                  <span className="text-sm font-bold text-slate-900">
                    {stat.value}
                  </span>
                  <span className="text-xs text-slate-400 ml-1.5">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Topic Cards Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm shadow-indigo-200">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Study Topics</h2>
            <p className="text-xs text-slate-400">
              Click any topic to start learning
            </p>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {topics.map((topic) => (
            <Link
              key={topic.href}
              href={topic.href}
              className={`group relative block rounded-3xl bg-white border border-slate-200/80 p-6 ${topic.borderHover} hover:shadow-2xl hover:shadow-slate-200/40 transition-all duration-500 hover:-translate-y-1 card-shine`}
            >
              {/* Gradient accent line */}
              <div
                className={`absolute top-0 left-6 right-6 h-[3px] rounded-b-full bg-gradient-to-r ${topic.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl ${topic.iconBg} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
              >
                {topic.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200">
                {topic.name}
              </h3>
              <p className="text-[13px] text-slate-500 mt-1.5 leading-relaxed">
                {topic.description}
              </p>
              <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
                {topic.details}
              </p>

              {/* Arrow button */}
              <div className="absolute bottom-6 right-6 w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-all duration-200">
                <svg
                  className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </Link>
          ))}

          {/* AI Chatbot card */}
          <div className="relative block rounded-3xl bg-indigo-600 p-6 text-white overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl mb-5 backdrop-blur-sm">
                🤖
              </div>
              <h3 className="text-lg font-bold">AI Study Buddy</h3>
              <p className="text-[13px] text-white/80 mt-1.5 leading-relaxed">
                Ask doubts on any topic page. Get instant, exam-focused answers.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                Powered by Gemini AI
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-12">
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
          <span>Built for</span>
          <span className="font-semibold text-slate-600">AWS CLF-C02</span>
          <span>·</span>
          <span>Study smarter, not harder</span>
        </div>
      </div>
    </div>
  );
}
