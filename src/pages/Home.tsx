import React, { useRef, useEffect } from 'react';
import { toPng } from "html-to-image";

const Home: React.FC = () => {
  const mindmapRef = useRef<HTMLDivElement>(null);

  // Simulação de um mapa mental para demonstração
  useEffect(() => {
    if (mindmapRef.current) {
      mindmapRef.current.innerHTML = `
        <div id="mindmap-container" style="padding: 20px; background-color: #1a202c; color: #e2e8f0; border-radius: 8px; transform: scale(1); transform-origin: top left;">
          <h1 style="font-size: 2em; margin-bottom: 15px;">Mapa Mental CS50P</h1>
          <ul style="list-style: none; padding-left: 20px;">
            <li style="margin-bottom: 10px;">
              <strong style="color: #63b3ed;">Aula 0: Funções e Variáveis</strong>
              <ul style="list-style: none; padding-left: 20px;">
                <li>Tipos de Dados</li>
                <li>Escopo de Variáveis</li>
              </ul>
            </li>
            <li style="margin-bottom: 10px;">
              <strong style="color: #63b3ed;">Aula 1: Estruturas de Dados</strong>
              <ul style="list-style: none; padding-left: 20px;">
                <li>Listas</li>
                <li>Dicionários</li>
              </ul>
            </li>
            <li style="margin-bottom: 10px;">
              <strong style="color: #63b3ed;">Quiz Dinâmico Integrado!</strong>
            </li>
          </ul>
        </div>
      `;
    }
  }, []);

  const handleDownload = async () => {
    const element = mindmapRef.current?.querySelector("#mindmap-container");
    if (!element) {
      console.error("Element #mindmap-container not found.");
      alert("Falha ao encontrar o elemento do mapa mental para exportar.");
      return;
    }

    try {
      // Salva o estado original do overflow e transform
      const prevOverflow = element.style.overflow;
      const prevTransform = element.style.transform;
      const prevOrigin = element.style.transformOrigin;

      // Ajusta para capturar o conteúdo completo e no scale=1
      element.style.overflow = "visible";
      element.style.transform = "none";
      element.style.transformOrigin = "top left";

      // Aguarda 1 frame para aplicar os estilos antes da captura
      await new Promise(requestAnimationFrame);

      const dataUrl = await toPng(element, {
        backgroundColor: "#ffffff",
        pixelRatio: 2,     // qualidade (2x)
        cacheBust: true,   // evita cache em alguns casos
        width: element.scrollWidth,
        height: element.scrollHeight,
      });

      // Restaura os estilos originais
      element.style.overflow = prevOverflow;
      element.style.transform = prevTransform;
      element.style.transformOrigin = prevOrigin;

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "cs50p-mindmap.png";
      link.click();
    } catch (err) {
      console.error("Erro ao exportar mapa:", err);
      alert("Falha ao exportar a imagem. Veja o console para detalhes.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Página Inicial do Mapa Mental CS50P</h1>
      <div ref={mindmapRef} className="mb-8" style={{ border: '1px dashed #4a5568', padding: '10px' }}>
        {/* O conteúdo do mapa mental será injetado aqui pelo useEffect */}
        <p className="text-gray-400">Carregando mapa mental...</p>
      </div>
      <button
        onClick={handleDownload}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition-colors duration-200"
      >
        Baixar Mapa Mental como PNG
      </button>
    </div>
  );
};

export default Home;
