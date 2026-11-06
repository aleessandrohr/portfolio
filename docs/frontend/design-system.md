# Design system

A identidade visual deve ser **preservada** em qualquer redesign: a marca mantém Inter, JetBrains Mono, azul e neutros. O tema escuro usa uma base grafite e superfícies cinza. O claro combina fundo cinza muito claro, cards brancos, texto grafite e vidro com sombra discreta para separar as camadas.

## Tokens
| Token | Claro | Escuro | Uso |
|---|---|---|---|
| `--brand` | `217 91% 48%` | `217 91% 60%` | azul com luminosidade por tema: links, ações, hover, foco e scrollbar |
| `--background` | `0 0% 97.5%` | `0 0% 7.5%` | fundo da página |
| `--foreground` | `0 0% 12%` | `0 0% 96%` | texto principal |
| `--card` | `0 0% 100%` | `0 0% 11%` | fundo de cards |
| `--muted-foreground` | `0 0% 40%` | `0 0% 68%` | texto secundário |
| `--border` | `0 0% 87%` | `0 0% 20%` | bordas |
| `--ring` | `217 91% 48%` | `217 91% 60%` | anel de foco |
| `--radius` | `1.25rem` (20 px) | igual | superfície de cards (`rounded-lg`) |

A fonte completa dos tokens fica em `src/app/globals.css`, e o mapeamento para Tailwind em `tailwind.config.ts`.

No tema claro, o azul mantém o matiz da marca com menor luminosidade para melhorar a leitura sobre superfícies claras e o contraste dos botões. Os brilhos da foto e a grade decorativa do hero têm opacidade menor; os painéis de Educação e Contato recebem sombra leve. O vidro usa reflexo interno branco e sombra mais suave. Essas diferenças são específicas do tema claro; o acabamento do escuro segue seus valores próprios. O `themeColor` claro acompanha o fundo em `#f9f9f9`.

## Formas e arredondamento

O acabamento usa uma escala por função, centralizada em `globals.css` e mapeada no `tailwind.config.ts`. Os valores abaixo são decisões deste portfólio, inspiradas nas referências; não são medidas prescritas pela Apple ou um padrão universal de mercado.

| Token CSS | Classe Tailwind | Valor | Aplicação |
|---|---|---|---|
| `--radius-xs` | `rounded-xs` | 6 px | detalhes muito pequenos |
| `--radius-sm` | `rounded-sm` | 8 px | badges, itens de menu e imagens internas de cards |
| `--radius-md` | `rounded-md` | 12 px | botões comuns, navegação, menus e tooltips |
| `--radius` | `rounded-lg` | 20 px | cards e moldura da demonstração |
| `--radius-xl` | `rounded-xl` | 28 px | header e painéis maiores |
| `--radius-2xl` | `rounded-2xl` | 32 px | diálogos; `rounded-t-2xl` no drawer |
| Tailwind nativo | `rounded-full` | cápsula/círculo | ações principais, botões de ícone e avatares |

- Preserve a hierarquia: badges compactos, controles arredondados e superfícies com curvas mais amplas.
- Nas superfícies aninhadas, considere o espaço interno: como referência, raio interno = raio externo menos o padding, com mínimo zero. No card de projeto, 20 px externos e 12 px de padding resultam em 8 px para a imagem.
- Bordas estruturais permanecem finas (1 px), usando `border-border` com opacidade. O foco usa 2 px em `ring` e acompanha a forma do controle; não substitua foco por sombra decorativa.
- Use cápsulas nas ações de destaque. Links de navegação e botões comuns mantêm retângulos arredondados para diferenciar funções.
- Componha os componentes do shadcn por `className`. Não altere `components/ui/` para mudar raios.
- Preserve os layouts aprovados. A escala de formas não autoriza adicionar containers, efeitos ou conteúdo.

### Referências e interpretação

Pesquisa consultada em 05/11/2026:

- [Apple: Get to know the new design system (WWDC25)](https://developer.apple.com/videos/play/wwdc2025/356/): geometria concêntrica, relação entre raio e padding, cápsulas para ações de destaque e retângulos arredondados em controles compactos. A implementação web usa `border-radius`; não reproduz integralmente as curvas e o material nativos da Apple.
- [Apple HIG: Materials](https://developer.apple.com/design/human-interface-guidelines/materials): Liquid Glass como camada de navegação e controles, com uso seletivo e preservação da legibilidade. Cards de conteúdo continuam sólidos.
- [Atlassian: Radius](https://atlassian.design/foundations/radius): tokens por função e coerência entre a forma do componente e seu foco.
- [Google: Material Design 3](https://developer.android.com/develop/ui/compose/designsystems/material3): formas como parte do tema, com aplicação sistemática nos componentes.

A direção visual do portfólio combina grafite, azul da marca, tipografia clara, curvas proporcionais e efeitos contidos. A intenção é comunicar cuidado e precisão; a demonstração de capacidade técnica depende do conteúdo real dos projetos, contribuições e decisões.

## Tipografia
- **Fonte principal:** Inter, via `next/font/google` em `layout.tsx`, para nome e cargo do hero, títulos, navegação, botões, categorias e textos de leitura.
- **Fonte técnica:** JetBrains Mono, também via `next/font/google`, disponibilizada por `--font-mono` e aplicada com `font-mono`. Usada no controle de terminal do header, badges de habilidades, datas e duração das experiências, período da formação e endereço do GitHub na seção Contato.
- **Detalhes em mono:** badges usam 12 px com altura de linha de 20 px; períodos e endereço do GitHub usam 13 px com altura de linha de 20 px. O controle de terminal mantém 14 px e peso médio. Períodos também usam `tabular-nums`.
- **Quebras:** badges mantêm cada nome inteiro (`whitespace-nowrap`) e a lista distribui os itens com `flex-wrap`. O endereço do GitHub pode quebrar dentro do texto em telas estreitas, preservando foto e ícone.
- **Títulos de seção:** `font-semibold text-2xl tracking-tight` na home.
- **Título de card de projeto:** `text-xl`, que fica azul no hover.
- **Corpo:** Inter, cores semânticas e altura de linha confortável. Parágrafos não alternam fonte nas tecnologias citadas. As classes `custom_title` e `custom_description` continuam disponíveis como utilidades legadas, mas não definem a tipografia atual da home.

## Componentes base
- **Primitivas do shadcn/ui** em `src/components/ui/`, estilo `default` e cor base `neutral`:
  - `Button`, `Card`, `Carousel`, `Dialog`, `Drawer`, `DropdownMenu`, `Separator`, `Skeleton`, `Tooltip`, `Loading`.
- **Para adicionar uma primitiva**, use a CLI do shadcn (`bunx shadcn@latest add <nome>`). Não copie código à mão.

## Padrões visuais recorrentes

O fundo usa uma variação tonal neutra e suave. Cards usam superfícies cinza sólidas; o vidro fica reservado aos containers em que ajuda a separar camadas. A aplicação nas demais seções será decidida durante a revisão guiada.

- **Card interativo:** `border-border/80`, no hover `-translate-y-1`, `border-brand/50` e `shadow-xl shadow-brand/5`.
- **Pílula de destaque:** `rounded-full border border-brand/25 bg-brand/5 text-brand text-xs`, usada no período das experiências.
- **Link de ação:** `border border-brand/40 bg-brand/5 text-brand`, que no hover vai para `bg-brand/10`.
- **Liquid glass:** a classe compartilhada `glass-surface`, em `globals.css`, aplica superfície translúcida, blur de 24 px, reflexo diagonal, borda e sombra discretos. Usa `card`, `border`, `--glass-highlight` e `--glass-shadow`, sem novas cores de destaque. Sem suporte a backdrop-filter, o fundo fica mais opaco para preservar a leitura. Aplicação atual: header, drawer mobile e menu de tema. A adoção nas demais superfícies será feita por seção, durante a revisão guiada do design.
- **Orçamento de desempenho:** só o header usa `backdrop-filter`. Cartões (projetos, educação, contato) ficam sólidos, porque o vidro pesa na rolagem e quase não aparece sobre fundo liso. Brilhos de fundo usam `radial-gradient`, nunca `blur-*`. Se um cartão novo precisar de vidro, que seja pequeno, fixo e sobre algo que o justifique, e meça a rolagem antes.
- **Header:** `components/header.tsx` recebe o primeiro nome (derivado de `profile.displayName`) e usa o menu de `configs/menu-items.ts`. Painel de vidro centralizado em `max-w-5xl`, com margem superior de 12 px, margens laterais mínimas de 16 px (24 px a partir de `sm`), borda discreta e cantos arredondados. O conteúdo usa padding interno de 16 px (32 px a partir de `sm`), reservando espaço para os controles no celular. No desktop, botão de terminal, links e tema ficam em uma única linha. O controle preserva `>_ Alessandro`, com o primeiro nome vindo dos dados. No modo visual, borda azul, fundo levemente tingido e um brilho que percorre o botão a cada 5 s convidam à exploração. O brilho fica recortado dentro da cápsula, para no modo terminal e não roda com movimento reduzido. O tooltip mostra “Explore o portfólio por comandos” no hover ou foco; após ativar, orienta o retorno ao modo visual. Usa semântica de switch e alterna o modo terminal integrado ao hero. O layout, a foto e os cards são preservados; ações e títulos de seção passam a usar comandos em JetBrains Mono. O prompt usa uma borda discreta com tokens existentes. No modo terminal, a navegação fica no drawer até 1024 px, para acomodar os comandos sem transbordar. O texto completo do controle permanece visível no celular. Cargo e foto ficam na apresentação do hero. No celular, os links abrem em drawer. Sem ícones de redes ou agendamento no header; mantém posição sticky no topo.
- **Badges de tecnologia:** as habilidades usam badges neutros com `muted`, borda discreta e texto em `muted-foreground`. O conteúdo fica em `constants/skills.ts`; não há mapa de cores por tecnologia.

## Sobre

A partir de 768 px, Sobre e Habilidades dividem o espaço em 50% e 50% (`md:grid-cols-2`), que já desconta o gap antes de dividir. No celular, ficam empilhados. As habilidades usam uma única coluna de linhas com divisórias leves (`divide-y`), com o rótulo à esquerda (8,5 rem) e os badges à direita.

Habilidades reúne os grupos técnicos na mesma lista de definições. Todos usam badges discretos em `muted`, com os mesmos raios e divisórias. A coleção interpessoal não tinha consumidor e foi removida. Não há painel de exploração, abas, linha do tempo adicional nem faixa de números. Cada coluna segue a revelação progressiva da home.

## Movimento

Os tokens `--reveal-duration` (1100 ms), `--reveal-distance` (20 px), `--reveal-easing` (`cubic-bezier(0.25, 0.1, 0.25, 1)`), `--hero-stagger` (160 ms) e `--reveal-stagger` (160 ms) ficam em `globals.css`. O hero usa a utilidade Tailwind `min-h-[calc(...)]` para reservar a primeira tela para a apresentação, descontando `--site-header-height` (82 px) e `--site-header-offset` (12 px). Se a altura do header mudar, revise esse cálculo.

`HomeMotion` usa Motion for React (`useAnimate` de `motion/react-mini`) para coordenar a apresentação inicial. Os marcadores `hero-intro` identificam os blocos e `hero-text`/`hero-letter` os textos principais, em uma sequência de quatro grupos que se repete ao abrir ou atualizar a página: saudação (0 ms), nome e foto (160 ms), cargo e frase (320 ms), botões e redes (480 ms). Os grupos se sobrepõem. Frase, foto e ações usam 1100 ms; saudação, nome e cargo revelam cada letra por 800 ms, com intervalo de 28 ms (`--hero-letter-duration`, `--hero-letter-stagger`) e deslocamento de `0.3em` (`--hero-letter-distance`). O índice continua na segunda linha do nome. O mesmo controlador usa `inView` para as seções e lê os tempos/curva dos tokens CSS; não há keyframes CSS duplicando essas animações.

`LetterReveal` recebe texto por props, segmenta grafemas com `Intl.Segmenter`, mantém palavras inteiras na quebra de linha e fornece uma cópia completa para leitores de tela, ocultando os spans visuais da árvore de acessibilidade. As letras já ocupam seu espaço desde o primeiro render. Movimento reduzido e impressão mostram o texto completo sem animação. A foto acompanha o nome no desktop; continua oculta no celular. Foco dentro de um grupo conclui sua entrada imediatamente. Os estilos inline temporários de opacidade/transform são removidos ao terminar, para não interferir nos hovers.

As demais seções usam `data-reveal`, apenas opacidade e translação, uma vez por bloco durante a rolagem. `--motion-startup-timeout` (2500 ms) limita a preparação de visibilidade do hero durante a hidratação; sem JavaScript o texto é visível. A decisão e os custos estão no [ADR-0006](../decisions/ADR-0006-motion.md). Respeite movimento reduzido e mantenha conteúdo visível sem JavaScript e na impressão. O comportamento está detalhado em [UI e UX](ui-ux-guidelines.md#apresentação-e-revelação-na-rolagem).

## O que não fazer
- **Introduzir uma segunda cor de destaque.**
- **Barras de porcentagem para skills.**
- **Gradientes fortes e cores saturadas fora do azul da marca.** Um brilho radial azul discreto no hero está previsto no plano.

## Retorno ao início e ao terminal

O footer mantém o link padrão para `#home`: “Voltar ao topo” no modo visual e `cd ~` no terminal. O modo terminal também tem um botão flutuante com o ícone `>_`, que volta ao hero e coloca o foco no input. O botão fica dentro de uma faixa centralizada `max-w-5xl`, com os mesmos paddings laterais do conteúdo, e respeita a área segura inferior do celular. A faixa não intercepta cliques fora do botão. Usa superfície sólida `card`, borda neutra e foco da marca, abaixo de menus e dialogs. O botão só aparece entre as seções: fica oculto enquanto qualquer parte do hero ou do footer estiver visível na área útil abaixo do header sticky, pois essas áreas já oferecem o input ou o retorno ao início.
