import { useEffect, useLayoutEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import { ScrollTrigger } from '../lib/gsap';

export function ScrollToTop() {
  const location = useLocation();
  const lenis = useLenis();

  const resetScroll = useCallback(() => {
    // 1. Interrompe qualquer tween ou inércia de scroll ativa no Lenis
    if (lenis) {
      lenis.stop();
    }

    // 2. Zera as coordenadas do scroll nativo da janela e elementos raiz
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.documentElement.scrollLeft = 0;
    document.body.scrollTop = 0;
    document.body.scrollLeft = 0;

    // 3. Sincroniza e reativa o Lenis na posição zero
    if (lenis) {
      lenis.animatedScroll = 0;
      lenis.targetScroll = 0;
      lenis.velocity = 0;
      lenis.start();
      lenis.scrollTo(0, { immediate: true, force: true });
      lenis.resize();
    }

    // 4. Limpa o cache de posições anteriores do GSAP ScrollTrigger
    ScrollTrigger.clearScrollMemory();
    ScrollTrigger.refresh();
  }, [lenis]);

  // Executa síncrono antes da pintura na tela ao mudar de rota ou chave de navegação
  useLayoutEffect(() => {
    resetScroll();
  }, [location.pathname, location.key, resetScroll]);

  // Confirmação no frame seguinte para assegurar consistência pós-montagem do layout
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      resetScroll();
    });
    return () => cancelAnimationFrame(rafId);
  }, [location.pathname, location.key, resetScroll]);

  // Evento customizado para disparos manuais (ex: clique no logo)
  useEffect(() => {
    const handler = () => resetScroll();
    window.addEventListener('app:reset-scroll', handler);
    return () => window.removeEventListener('app:reset-scroll', handler);
  }, [resetScroll]);

  return null;
}
