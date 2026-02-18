import { ConceptDetail } from "@/data/conceptDetails";
import { X, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface DetailPanelProps {
  concept: ConceptDetail | null;
  onClose: () => void;
}

export default function DetailPanel({ concept, onClose }: DetailPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (concept?.codeExample) {
      navigator.clipboard.writeText(concept.codeExample);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!concept) {
    return (
      <div className="flex flex-col w-96 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 shadow-lg dark:shadow-2xl transition-colors duration-300">
        <div className="flex items-center justify-center h-full text-slate-500 dark:text-slate-400">
          <p className="text-center px-6">
            Selecione um conceito no mapa mental para ver detalhes
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-96 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 shadow-lg dark:shadow-2xl overflow-hidden transition-colors duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white p-4 flex items-center justify-between transition-colors duration-300">
        <div className="flex-1 pr-2">
          <h2 className="text-lg font-bold">{concept.title}</h2>
          <p className="text-sm opacity-90">{concept.description}</p>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 ml-2 hover:bg-white/20 text-white flex-shrink-0"
            >
              <X size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-slate-800 text-slate-200 border-slate-700">
            <p>Fechar Painel</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Explicação */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Explicação
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {concept.explanation}
          </p>
        </div>

        {/* Exemplo de Código */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Exemplo de Código
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyCode}
              className="h-7 px-2 text-xs"
            >
              {copied ? (
                <>
                  <Check size={14} className="mr-1" />
                  Copiado
                </>
              ) : (
                <>
                  <Copy size={14} className="mr-1" />
                  Copiar
                </>
              )}
            </Button>
          </div>
          <pre className="bg-slate-900 dark:bg-slate-950 text-slate-100 dark:text-slate-200 p-3 rounded text-xs overflow-x-auto font-mono leading-relaxed transition-colors duration-300">
            <code>{concept.codeExample}</code>
          </pre>
        </div>

        {/* Pontos-chave */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 transition-colors duration-300">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
            Pontos-chave
          </h3>
          <ul className="space-y-2">
            {concept.keyPoints.map((point, index) => (
              <li
                key={index}
                className="flex gap-2 text-sm text-slate-700 dark:text-slate-300 transition-colors duration-300"
              >
                <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0">
                  •
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
