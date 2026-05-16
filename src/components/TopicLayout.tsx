"use client";

import { Chatbot } from "./Chatbot";

interface TopicLayoutProps {
  topic: string;
  children: React.ReactNode;
}

export function TopicLayout({ topic, children }: TopicLayoutProps) {
  return (
    <>
      {children}
      <Chatbot topic={topic} />
    </>
  );
}
