import React from 'react';

/**
 * Progressive Blur em cascata contínua (estilo bencho.dev/finds)
 * Utiliza camadas cumulativas contínuas onde cada camada começa no topo (0%)
 * e decresce monotonicamente em degradê contínuo até desvanecer completamente.
 * 
 * Elimina qualquer efeito de "listras" ou faixas horizontais visíveis,
 * sem gaps/espaçamentos intermediários e 100% transparente.
 */
interface BlurLayer {
  blur: number;
  mask: string;
}

const BLUR_LAYERS: BlurLayer[] = [
  // Camada 1: Desfoque base suave (2px) que abrange toda a altura (0% a 100%)
  {
    blur: 2,
    mask: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
  },
  // Camada 2: Desfoque de 4px de 0% até 75%
  {
    blur: 4,
    mask: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)',
  },
  // Camada 3: Desfoque de 8px de 0% até 55%
  {
    blur: 8,
    mask: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 55%)',
  },
  // Camada 4: Desfoque de 16px de 0% até 38%
  {
    blur: 16,
    mask: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 38%)',
  },
  // Camada 5: Desfoque profundo (28px) concentrado no topo absoluto (0% a 22%)
  {
    blur: 28,
    mask: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 22%)',
  },
];

export const ProgressiveBlur: React.FC = () => {
  return (
    <div className="progressive-blur-container" aria-hidden="true">
      {BLUR_LAYERS.map((layer, index) => (
        <div
          key={index}
          className="progressive-blur-step"
          style={{
            backdropFilter: `blur(${layer.blur}px)`,
            WebkitBackdropFilter: `blur(${layer.blur}px)`,
            maskImage: layer.mask,
            WebkitMaskImage: layer.mask,
          }}
        />
      ))}
    </div>
  );
};


