"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const topics = [
  {
    name: "IAM",
    href: "/topics/iam",
    icon: "🔐",
    description: "Identity & Access Management",
    gradient: "from-violet-500 to-purple-600",
    lightBg: "bg-violet-50",
  },
  {
    name: "EC2",
    href: "/topics/ec2",
    icon: "🖥️",
    description: "Elastic Compute Cloud",
    gradient: "from-blue-500 to-indigo-600",
    lightBg: "bg-blue-50",
  },
  {
    name: "EBS & Storage",
    href: "/topics/ebs",
    icon: "💾",
    description: "Elastic Block Store & Storage",
    gradient: "from-emerald-500 to-teal-600",
    lightBg: "bg-emerald-50",
  },
  {
    name: "ELB & ASG",
    href: "/topics/elb-asg",
    icon: "⚖️",
    description: "Load Balancers & Auto Scaling",
    gradient: "from-orange-500 to-amber-600",
    lightBg: "bg-orange-50",
  },
  {
    name: "S3",
    href: "/topics/s3",
    icon: "🪣",
    description: "Simple Storage Service",
    gradient: "from-rose-500 to-pink-600",
    lightBg: "bg-rose-50",
  },
  {
    name: "Databases",
    href: "/topics/databases",
    icon: "🗄️",
    description: "RDS, Aurora, DynamoDB & More",
    gradient: "from-cyan-500 to-blue-600",
    lightBg: "bg-cyan-50",
  },
  {
    name: "Route 53",
    href: "/topics/route53",
    icon: "🌐",
    description: "DNS & Domain Management",
    gradient: "from-green-500 to-emerald-600",
    lightBg: "bg-green-50",
  },
  {
    name: "CloudWatch",
    href: "/topics/cloudwatch",
    icon: "📊",
    description: "Monitoring & Observability",
    gradient: "from-yellow-500 to-orange-600",
    lightBg: "bg-yellow-50",
  },
  {
    name: "VPC & Networking",
    href: "/topics/vpc",
    icon: "🔒",
    description: "Virtual Private Cloud",
    gradient: "from-slate-500 to-zinc-600",
    lightBg: "bg-slate-50",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-5 left-5 z-50 md:hidden w-10 h-10 rounded-xl glass border border-white/60 shadow-lg flex items-center justify-center"
        aria-label="Toggle menu"
      >
        <svg
          className="w-5 h-5 text-slate-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          )}
        </svg>
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm z-30 md:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[280px] glass-strong border-r border-slate-200/60 z-40 transform transition-all duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 pb-2">
          <Link href="/" className="block group" onClick={() => setIsOpen(false)}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200/50 group-hover:shadow-indigo-300/60 transition-shadow">
                  <span className="text-white text-lg font-bold">☁️</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-[15px] font-bold text-slate-900 tracking-tight">
                  AWS Prep
                </h1>
                <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                  Cloud Practitioner
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Search-like progress bar */}
        <div className="mx-4 mt-4 mb-5 px-4 py-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              Progress
            </span>
            <span className="text-[10px] font-bold text-indigo-600">9 Topics</span>
          </div>
          <div className="w-full h-1.5 bg-slate-200/60 rounded-full overflow-hidden">
            <div className="h-full w-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000"></div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-3 flex-1 overflow-y-auto stagger-children">
          <p className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">
            Study Topics
          </p>
          {topics.map((topic) => {
            const isActive = pathname === topic.href;
            return (
              <Link
                key={topic.href}
                href={topic.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-200 group mb-0.5 ${
                  isActive
                    ? "bg-white shadow-md shadow-slate-200/50 border border-slate-200/60"
                    : "hover:bg-white/60 hover:shadow-sm"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all duration-200 ${
                    isActive
                      ? `bg-gradient-to-br ${topic.gradient} shadow-sm`
                      : `${topic.lightBg} group-hover:scale-105`
                  }`}
                >
                  <span className={isActive ? "grayscale-0 brightness-200" : ""}>
                    {topic.icon}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-semibold text-[13px] transition-colors ${
                      isActive ? "text-slate-900" : "text-slate-600 group-hover:text-slate-800"
                    }`}
                  >
                    {topic.name}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">
                    {topic.description}
                  </p>
                </div>
                {isActive && (
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-sm shadow-indigo-300"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom card - part of flex flow, always visible at bottom */}
        <div className="p-3 shrink-0">
          <div className="relative overflow-hidden rounded-2xl bg-indigo-600 p-4 shadow-lg shadow-indigo-200/40">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            <div className="relative">
              <p className="text-white/90 text-[11px] font-medium leading-relaxed">
                🚀 Use the AI chatbot on each topic page to clear your doubts instantly!
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
