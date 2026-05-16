"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect, useMemo } from "react";

interface ChatbotProps {
  topic: string;
}

export function Chatbot({ topic }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        prepareSendMessagesRequest: ({ messages }) => {
          return {
            body: {
              messages,
              topic,
            },
          };
        },
      }),
    [topic]
  );

  const { messages, sendMessage, status, error } = useChat({
    transport,
  });

  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const text = input;
    setInput("");
    await sendMessage({ text });
  };

  const handleSuggestionClick = async (question: string) => {
    if (isLoading) return;
    await sendMessage({ text: question });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl text-white shadow-xl transition-all duration-300 flex items-center justify-center ${
          isOpen
            ? "bg-slate-800 hover:bg-slate-700 shadow-slate-300/40"
            : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-300/40 hover:scale-105"
        }`}
        aria-label="Open chatbot"
      >
        {isOpen ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-8rem)] bg-white border border-slate-200/80 rounded-3xl shadow-2xl shadow-slate-300/30 flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-indigo-50/80 via-purple-50/50 to-pink-50/30">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-200/50">
                  <span className="text-white text-sm font-bold">AI</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white"></div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm text-slate-800">
                  Study Buddy
                </h3>
                <p className="text-[11px] text-slate-500">
                  Studying: <span className="font-medium text-indigo-600">{topic}</span>
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-medium text-emerald-700">Live</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-slate-50/50 to-white">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-50 flex items-center justify-center mx-auto mb-5 shadow-sm border border-indigo-100/50">
                  <span className="text-3xl">💬</span>
                </div>
                <p className="text-sm font-semibold text-slate-700 mb-1">
                  Hey! Ready to help 👋
                </p>
                <p className="text-xs text-slate-400 mb-6 max-w-[240px] mx-auto">
                  Ask me anything about <strong className="text-slate-600">{topic}</strong>. I&apos;ll give you exam-focused answers.
                </p>
                <div className="space-y-2.5">
                  {getSuggestedQuestions(topic).map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestionClick(q)}
                      className="block w-full text-left text-[12px] px-4 py-3 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-100/30 transition-all duration-200 text-slate-600 group"
                    >
                      <span className="inline-flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-indigo-50 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
                          <svg className="w-3 h-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                        {q}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-3 text-[13px] ${
                    message.role === "user"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200/40 rounded-br-md"
                      : "bg-white border border-slate-200/80 text-slate-700 shadow-sm rounded-bl-md"
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-[1.7]">
                    {message.parts
                      .filter((part) => part.type === "text")
                      .map((part, i) => (
                        <span key={i}>
                          {"text" in part ? part.text : ""}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200/80 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl px-5 py-4 text-xs">
                <p className="font-bold text-rose-700 mb-1.5 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  API Key Required
                </p>
                <p className="text-rose-600 leading-relaxed">
                  Add your free Gemini API key to <code className="bg-rose-100 px-1.5 py-0.5 rounded-md font-mono text-[10px]">.env.local</code>
                </p>
                <a
                  href="https://aistudio.google.com/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-rose-500 hover:text-rose-700 font-medium underline underline-offset-2"
                >
                  Get free key →
                </a>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-slate-100 bg-white"
          >
            <div className="flex gap-2.5">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask about ${topic}...`}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all placeholder:text-slate-400"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-11 h-11 bg-indigo-600 text-white rounded-xl flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-indigo-200/50 transition-all duration-200 shrink-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

function getSuggestedQuestions(topic: string): string[] {
  const questions: Record<string, string[]> = {
    IAM: [
      "What's the difference between IAM Users and Roles?",
      "When should I use a resource-based policy?",
      "Explain the policy evaluation logic simply",
    ],
    EC2: [
      "Which purchasing option is cheapest for batch jobs?",
      "What's the difference between Spot and Reserved?",
      "When would I use a Cluster placement group?",
    ],
    "EBS & Storage": [
      "What's the difference between EBS and EFS?",
      "When should I use Instance Store vs EBS?",
      "How do I move an EBS volume to another region?",
    ],
    "ELB & ASG": [
      "What's the difference between ALB and NLB?",
      "How does Target Tracking scaling work?",
      "When would I use a Gateway Load Balancer?",
    ],
    S3: [
      "What are the different S3 storage classes?",
      "How does S3 versioning protect my data?",
      "What's the difference between SSE-S3 and SSE-KMS?",
    ],
  };

  return questions[topic] || [
    "What are the key concepts I should know?",
    "What exam tips should I remember?",
    "Can you explain this topic simply?",
  ];
}
