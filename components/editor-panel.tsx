"use client"

import { cn } from "@/lib/utils"

interface EditorPanelProps {
  language: string
  value: string
  onChange: (value: string) => void
  className?: string
}

export default function EditorPanel({ language, value, onChange, className }: EditorPanelProps) {
  return (
    <div className={cn("relative", className)}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full p-4 font-mono text-sm resize-none focus:outline-none bg-background"
        spellCheck="false"
        data-language={language}
      />
    </div>
  )
}
