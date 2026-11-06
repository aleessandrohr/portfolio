# Princípios de arquitetura

1. **Uma fonte de dados.** Todo conteúdo vive em `src/constants/`. Configurações de navegação e apresentação ficam em `src/configs/`; integrações de bibliotecas em `src/lib/` e funções puras compartilhadas em `src/utils/`. Home, páginas de case, currículo e terminal leem desse mesmo lugar. Um texto alterado ali aparece em todo o site, e as versões não divergem.
2. **Estático primeiro.** Páginas pré-renderizadas sempre que possível. O site não tem API própria; antes de criar uma, registre um [ADR](../decisions/README.md).
3. **Cliente mínimo.** Use `'use client'` apenas no componente que precisa de interação, não na página inteira.
4. **Degradação elegante.** Funcionalidade opcional (iframe de demonstração, terminal) pode falhar sem quebrar o resto. Sempre exista um caminho sem ela, como os comandos fixos do terminal ou o link "Abrir site".
5. **Poucas dependências.** Antes de adicionar um pacote, verifique se Tailwind, shadcn/ui, `lucide-react` ou a plataforma já resolvem. Cada dependência nova merece um [ADR](../decisions/README.md) se mudar a arquitetura.
6. **Conteúdo honesto.** A arquitetura não deve facilitar inventar dados. Ver [content-guidelines](../standards/content-guidelines.md).
7. **Identidade preservada.** Mudanças visuais usam os tokens existentes. Ver [design-system](../frontend/design-system.md).

## Dados com consumidor real

Os objetos e tipos atuais guardam apenas campos usados pela interface, metadados ou regras de domínio em execução. Uma página planejada não justifica manter cases, diagramas, seleções de currículo ou variantes sem uso. Acrescente os campos quando implementar o consumidor, sem duplicar textos ou URLs já disponíveis em outra constante.
