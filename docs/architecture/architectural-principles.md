# Princípios de arquitetura

1. **Uma fonte de dados.** Todo conteúdo vive em `src/constants/`. Home, páginas de case, currículo, terminal e LLM leem desse mesmo lugar. Um texto alterado ali aparece em todo o site, e as versões não divergem.
2. **Estático primeiro.** Páginas pré-renderizadas sempre que possível. O servidor entra só quando não há alternativa, como a chamada à LLM.
3. **Cliente mínimo.** Use `'use client'` apenas no componente que precisa de interação, não na página inteira.
4. **Degradação elegante.** Funcionalidade opcional (LLM, iframe de demonstração) pode falhar sem quebrar o resto. Sempre exista um caminho sem ela, como os comandos fixos do terminal ou o link "Abrir site".
5. **Poucas dependências.** Antes de adicionar um pacote, verifique se Tailwind, shadcn/ui, `lucide-react` ou a plataforma já resolvem. Cada dependência nova merece um [ADR](../decisions/README.md) se mudar a arquitetura.
6. **Conteúdo honesto.** A arquitetura não deve facilitar inventar dados. A LLM responde só com o que está nos constants. Ver [content-guidelines](../standards/content-guidelines.md).
7. **Identidade preservada.** Mudanças visuais usam os tokens existentes. Ver [design-system](../frontend/design-system.md).
