import MindmapNode from "@/components/MindmapNode";
import DetailPanel from "@/components/DetailPanel";

import { mindmapData } from "@/data/mindmapData";
import { ConceptDetail } from "@/data/conceptDetails";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Download, ZoomIn, ZoomOut, BarChart3, User } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const [scale, setScale] = useState(1);
  const [selectedConcept, setSelectedConcept] = useState<ConceptDetail | null>(
    null
  );
  const [selectedId, setSelectedId] = useState<string>("");
  const [, setLocation] = useLocation();

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.7));
  const handleReset = () => setScale(1);

  const handleSelectConcept = (concept: ConceptDetail) => {
    setSelectedConcept(concept);
    setSelectedId(concept.id);
  };

  const handleDownload = () => {
    const element = document.getElementById("mindmap-container");
    if (element) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = element.offsetWidth;
        canvas.height = element.offsetHeight;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "cs50p-mindmap.png";
        link.click();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm shadow-sm dark:shadow-lg transition-colors duration-300">
        <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4 lg:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                CS50P Mind Map
              </h1>
              <p className="text-xs sm:text-sm lg:text-base text-slate-600 dark:text-slate-400 mt-1">
                Explore os conceitos de cada aula interativamente
              </p>
            </div>

            {/* Controles de Zoom e Navegação */}
            <div className="flex flex-row flex-wrap sm:flex-nowrap items-center justify-center sm:justify-end gap-2 sm:gap-3">
              {/* Container de Zoom */}
              <div className="flex items-center gap-1 sm:gap-2 bg-slate-800 rounded-lg p-1.5 sm:p-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleZoomOut}
                      disabled={scale <= 0.7}
                      className="h-8 w-8 sm:h-10 sm:w-10 p-0 hover:bg-slate-700"
                    >
                      <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-slate-800 text-slate-200 border-slate-700">
                    <p>Diminuir Zoom</p>
                  </TooltipContent>
                </Tooltip>
                <span className="text-xs sm:text-sm font-medium w-10 sm:w-14 text-center text-slate-200">
                  {Math.round(scale * 100)}%
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleZoomIn}
                      disabled={scale >= 1.5}
                      className="h-8 w-8 sm:h-10 sm:w-10 p-0 hover:bg-slate-700"
                    >
                      <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-slate-800 text-slate-200 border-slate-700">
                    <p>Aumentar Zoom</p>
                  </TooltipContent>
                </Tooltip>
                <div className="w-px h-4 sm:h-6 bg-slate-600 mx-1 sm:mx-2" />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleReset}
                      className="h-8 sm:h-10 px-2 sm:px-3 text-xs sm:text-sm hover:bg-slate-700 text-slate-200"
                    >
                      <span className="hidden xs:inline">Reset</span>
                      <span className="inline xs:hidden">↻</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-slate-800 text-slate-200 border-slate-700">
                    <p>Resetar Zoom (100%)</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              
              {/* Container de Perfil */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLocation('/profile')}
                    className="h-8 w-8 sm:h-11 sm:w-11 p-0 bg-slate-800 hover:bg-slate-700 rounded-lg"
                  >
                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-slate-800 text-slate-200 border-slate-700">
                  <p>Perfil do Usuário</p>
                </TooltipContent>
              </Tooltip>
              
              {/* Container de Quiz */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLocation('/quiz')}
                    className="h-8 w-8 sm:h-11 sm:w-11 p-0 bg-slate-800 hover:bg-slate-700 rounded-lg"
                  >
                    <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-slate-800 text-slate-200 border-slate-700">
                  <p>Testar Conhecimentos</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 lg:py-12">
            {/* Instruções */}
            <div className="mb-6 sm:mb-8 p-3 sm:p-4 lg:p-6 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-lg transition-colors duration-300">
              <h2 className="text-base sm:text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">
                Como usar este mapa mental:
              </h2>
              <ul className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>✨ Clique nas caixas para expandir/recolher os conceitos</li>
                <li>
                  📖 Clique em um conceito para ver exemplos de código no painel
                  lateral
                </li>
                <li>🔍 Use os controles de zoom para ajustar a visualização</li>
                <li>📊 Explore a hierarquia de tópicos de cada aula</li>
                <li>🎯 Acesse o Quiz para testar seus conhecimentos</li>
                <li>👤 Veja seu progresso na seção Perfil</li>
              </ul>
            </div>

            {/* Botão para baixar */}
            <div className="mb-4 sm:mb-6 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="gap-2 text-xs sm:text-sm dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 dark:text-slate-200"
              >
                <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Baixar Mapa</span>
                <span className="inline sm:hidden">Baixar</span>
              </Button>
            </div>

            {/* Mind Map */}
            <div
              id="mindmap-container"
              className="bg-white dark:bg-slate-900/50 rounded-lg shadow-xl dark:shadow-2xl p-4 sm:p-6 lg:p-8 overflow-x-auto transition-colors duration-300"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top center",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <div className="inline-block min-w-full">
                <MindmapNode
                  node={mindmapData}
                  level={0}
                  isRoot={true}
                  onSelectConcept={handleSelectConcept}
                  selectedId={selectedId}
                />
              </div>
            </div>
          </div>
        </main>

        {/* Detail Panel */}
        {selectedConcept && (
          <DetailPanel
            concept={selectedConcept}
            onClose={() => {
              setSelectedConcept(null);
              setSelectedId("");
            }}
          />
        )}
      </div>
    </div>
  );
}
