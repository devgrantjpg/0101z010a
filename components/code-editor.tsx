"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"
import { Maximize2, Play, Save } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import EditorHeader from "./editor-header"
import EditorPanel from "./editor-panel"

export default function CodeEditor() {
  const [html, setHtml] = useState("<h1>Hello SMVM Code Editor!</h1>\n<p>Start editing in real time. :)</p>")
  const [css, setCss] = useState("h1 {\n  color: #0070f3;\n}\n\np {\n  margin-top: 1rem;\n  color: #333;\n}")
  const [js, setJs] = useState(
    '// JavaScript goes here\nconsole.log("Hello from JavaScript!");\n\n// Example: Change text color after 2 seconds\nsetTimeout(() => {\n  document.querySelector("p").style.color = "#0070f3";\n}, 2000);',
  )
  const [output, setOutput] = useState("")
  const [activeTab, setActiveTab] = useState("html")
  const [isFullscreen, setIsFullscreen] = useState(false)

  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    updateOutput()
  }, [html, css, js])

  const updateOutput = () => {
    const outputContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `
    setOutput(outputContent)
  }

  const handleRun = () => {
    updateOutput()
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className="flex flex-col h-screen">
      <EditorHeader />

      {isMobile ? (
        <div className="flex flex-col flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="border-b px-4">
              <TabsList className="h-12">
                <TabsTrigger value="html">HTML</TabsTrigger>
                <TabsTrigger value="css">CSS</TabsTrigger>
                <TabsTrigger value="js">JS</TabsTrigger>
                <TabsTrigger value="output">Output</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="html" className="flex-1 p-0 m-0 data-[state=active]:flex flex-col">
              <EditorPanel language="html" value={html} onChange={setHtml} className="flex-1" />
            </TabsContent>

            <TabsContent value="css" className="flex-1 p-0 m-0 data-[state=active]:flex flex-col">
              <EditorPanel language="css" value={css} onChange={setCss} className="flex-1" />
            </TabsContent>

            <TabsContent value="js" className="flex-1 p-0 m-0 data-[state=active]:flex flex-col">
              <EditorPanel language="javascript" value={js} onChange={setJs} className="flex-1" />
            </TabsContent>

            <TabsContent value="output" className="flex-1 p-0 m-0 data-[state=active]:flex flex-col">
              <div className="flex-1 bg-white">
                <iframe title="output" sandbox="allow-scripts" srcDoc={output} className="w-full h-full border-0" />
              </div>
            </TabsContent>
          </Tabs>

          <div className="border-t p-2 flex justify-between">
            <Button variant="default" size="sm" onClick={handleRun}>
              <Play className="h-4 w-4 mr-1" /> Run
            </Button>
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
          </div>
        </div>
      ) : (
        <ResizablePanelGroup direction="vertical" className="flex-1">
          <ResizablePanel defaultSize={60} minSize={30}>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={33}>
                <div className="h-full flex flex-col">
                  <div className="border-b border-r px-4 py-2 font-medium bg-muted/50">HTML</div>
                  <EditorPanel language="html" value={html} onChange={setHtml} className="flex-1 border-r" />
                </div>
              </ResizablePanel>

              <ResizablePanel defaultSize={33}>
                <div className="h-full flex flex-col">
                  <div className="border-b border-r px-4 py-2 font-medium bg-muted/50">CSS</div>
                  <EditorPanel language="css" value={css} onChange={setCss} className="flex-1 border-r" />
                </div>
              </ResizablePanel>

              <ResizablePanel defaultSize={34}>
                <div className="h-full flex flex-col">
                  <div className="border-b px-4 py-2 font-medium bg-muted/50">JavaScript</div>
                  <EditorPanel language="javascript" value={js} onChange={setJs} className="flex-1" />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizablePanel defaultSize={40} minSize={20}>
            <div className="h-full flex flex-col">
              <div className="border-t border-b px-4 py-2 flex justify-between items-center bg-muted/50">
                <span className="font-medium">Output</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={handleRun}>
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className={cn("flex-1 bg-white", isFullscreen && "fixed inset-0 z-50")}>
                <iframe title="output" sandbox="allow-scripts" srcDoc={output} className="w-full h-full border-0" />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </div>
  )
}
