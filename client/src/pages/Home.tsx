import MindmapNode from "@/components/MindmapNode";
import DetailPanel from "@/components/DetailPanel";

import { mindmapData } from "@/data/mindmapData";
import { ConceptDetail } from "@/data/conceptDetails";
import { Button } from "@/components/ui/button";
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
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent" style={{textAlign: 'center'}}>
                CS50P Mind Map
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
                Explore os conceitos de cada aula interativamente
              </p>
            </div>

            {/* Controles de Zoom e Navegação */}
            <div className="flex flex-row flex-nowrap items-center gap-3">
              {/* Container de Zoom */}
              <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleZoomOut}
                  disabled={scale <= 0.7}
                  className="h-10 w-10 p-0 hover:bg-slate-700"
                >
                  <ZoomOut size={20} />
                </Button>
                <span className="text-sm font-medium w-14 text-center text-slate-200">
                  {Math.round(scale * 100)}%
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleZoomIn}
                  disabled={scale >= 1.5}
                  className="h-10 w-10 p-0 hover:bg-slate-700"
                >
                  <ZoomIn size={20} />
                </Button>
                <div className="w-px h-6 bg-slate-600 mx-2" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="h-10 px-3 text-sm hover:bg-slate-700 text-slate-200"
                >
                  Reset
                </Button>
              </div>
              
              {/* Container de Perfil */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation('/profile')}
                className="h-10 w-10 p-0 bg-slate-800 hover:bg-slate-700 rounded-lg"
                title="Perfil"
              >
                <User size={20} />
              </Button>
              
              {/* Container de Quiz */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation('/quiz')}
                className="h-10 w-10 p-0 bg-slate-800 hover:bg-slate-700 rounded-lg"
                title="Quiz"
              >
                <BarChart3 size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-8 sm:py-12">
            {/* Instruções */}
            <div className="mb-8 p-4 sm:p-6 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-lg transition-colors duration-300">
              <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">
                Como usar este mapa mental:
              </h2>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
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
            <div className="mb-6 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="gap-2"
              >
                <Download size={16} />
                Baixar Mapa
              </Button>
            </div>

            {/* Mindmap Container */}
            <div
              id="mindmap-container"
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg dark:shadow-2xl p-6 sm:p-8 overflow-x-auto transition-colors duration-300"
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

            {/* Footer com informações */}
            <div className="mt-8 p-4 sm:p-6 bg-slate-100 rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-3">
                Sobre este mapa:
              </h3>
              <p className="text-sm text-slate-700 mb-3">
                Este mapa mental interativo organiza todos os conceitos do curso
                CS50P em uma estrutura hierárquica. Cada aula é representada por
                uma cor única, facilitando a visualização das conexões entre
                tópicos. Clique em qualquer conceito para ver exemplos de código
                e explicações detalhadas.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-emerald-500 to-emerald-300" />
                  <span>Aula 0</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-cyan-500 to-cyan-300" />
                  <span>Aula 1</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-purple-500 to-purple-300" />
                  <span>Aula 2</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-orange-500 to-orange-300" />
                  <span>Aula 3</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-pink-500 to-pink-300" />
                  <span>Aula 4</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-red-500 to-red-300" />
                  <span>Aula 5</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-indigo-500 to-indigo-300" />
                  <span>Aula 6</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-teal-500 to-teal-300" />
                  <span>Aula 7</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-amber-500 to-amber-300" />
                  <span>Aula 8</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-lime-500 to-lime-300" />
                  <span>Aula 9</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Detail Panel Sidebar */}
        <DetailPanel
          concept={selectedConcept}
          onClose={() => {
            setSelectedConcept(null);
            setSelectedId("");
          }}
        />
      </div>
    </div>
  );
}
