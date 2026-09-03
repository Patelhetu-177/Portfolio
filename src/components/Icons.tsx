import React from "react";

export function Github({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function Linkedin({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function AwsIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.5 10.5c-.8 0-1.4.3-1.8.8l-.2-.6H3.3v7.1h1.4v-4.1c.3.5.9.8 1.8.8 1.5 0 2.6-1.2 2.6-2.9 0-1.7-1.1-3-2.6-3zm-.3 4.8c-.8 0-1.4-.6-1.4-1.8 0-1.1.6-1.8 1.4-1.8.8 0 1.4.6 1.4 1.8 0 1.1-.6 1.8-1.4 1.8zm6.5-4.8c-1.5 0-2.4.9-2.6 2.1h1.3c.2-.6.7-.9 1.3-.9.7 0 1.2.4 1.2 1v.3l-1.7.1c-1.5.1-2.3.7-2.3 1.8 0 1.1.8 1.7 1.9 1.7.9 0 1.6-.4 1.9-1.1h.1l.1.9h1.3v-4.4c0-1.5-1.1-2.5-2.6-2.5zm.7 4.1c-.2.5-.7.9-1.4.9-.6 0-1-.3-1-.9 0-.6.4-.9 1.1-1l1.3-.1v1zm7.4-4.1h-1.5l-1.3 4.7-1.4-4.7h-1.4l2.1 6.1h1.4l2.1-6.1zm-15 8.9c3.9 2.5 8.8 3.5 13.5 1.5.4-.2.9.2.6.6-4.5 3.3-10.7 2.6-14.8-.9-.4-.3-.1-.9.4-.7l.3-.5zm13.9.7c.3-.4 1-.2 1 .3 0 .4-.5.9-1 .9-.3 0-.4-.2-.3-.5l.3-.7z" />
    </svg>
  );
}

export function N8nIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 14.5a3.5 3.5 0 1 1 3.5-3.5v1.2H10V9.8a3.5 3.5 0 1 1 2 0v2.4h2.5V9.8a3.5 3.5 0 1 1 2 0v2.4H19v-1.2a3.5 3.5 0 1 1 3.5 3.5 3.5 3.5 0 0 1-3.5-3.5V9.8h-2.5v2.4a3.5 3.5 0 1 1-2 0v-2.4H12v2.4a3.5 3.5 0 1 1-2 0V9.8H7.5v2.4A3.5 3.5 0 0 1 4 14.5z" />
    </svg>
  );
}

export function GeminiIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z" />
    </svg>
  );
}

export function PineconeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.4l5.8 3.6L12 11.6 6.2 8 12 4.4zM5.5 9.2l5.5 3.4v6.8L5.5 16V9.2zm13 6.8l-5.5 3.4v-6.8l5.5-3.4v6.8z" />
    </svg>
  );
}
