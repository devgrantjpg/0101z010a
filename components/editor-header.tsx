import { Button } from "@/components/ui/button"
import { Code2, Save, Settings } from "lucide-react"

export default function EditorHeader() {
  return (
    <header className="border-b px-4 py-3 flex items-center justify-between bg-background">
      <div className="flex items-center gap-2">
        <Code2 className="h-5 w-5 text-primary" />
        <h1 className="text-lg font-semibold">Ocean Editor</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Save className="h-4 w-4 mr-1" />
          Save
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
