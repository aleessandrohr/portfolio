# Abstrações e composição

As regras práticas para escrever componentes estão em [component-guidelines](../frontend/component-guidelines.md). Este documento explica **como as peças se encaixam** e quando criar uma abstração nova.

## Níveis de abstração
```
Primitivas (components/ui)      Card, Dialog, Drawer, Tooltip, Button  ← shadcn, sem domínio
        │ compostas por
Componentes de domínio          Project, Experience, ModeToggle         ← sabem o formato do dado
        │ compostos por
Seções e páginas (app/)         home, case, currículo, terminal         ← decidem o que mostrar e em que ordem
```
- **Primitivas:** não conhecem o conteúdo.
- **Componentes de domínio:** não sabem em que página estão.
- **Páginas:** não sabem como um card é desenhado.

## Composição em uso
- **Slots do Radix e do shadcn:** `DialogTrigger asChild`, `TooltipTrigger asChild` e `Button asChild` passam o comportamento para o filho, como um `<Link>` ou um `<Button>`, sem criar wrappers. Prefira `asChild` a aninhar elementos interativos.
- **Subcomponente privado:** `project/components/iframe.tsx` isola o estado de carregamento. O `Project` não precisa saber como o iframe carrega.
- **Partes opcionais por presença de dado:** `Project` só monta o dialog se houver `iframeUrl`, e `Experience` só mostra o rodapé se houver `skills`.

## Composição planejada
### Um terminal, dois contêineres (Fase 5)
```
commands.ts  (puro)
     │
terminal.tsx (interface: entrada, saída, histórico, interpretação de CommandResult)
     │
     ├── terminal-dialog.tsx  → aberto sobre qualquer página (botão >_, Ctrl+`)
     └── app/terminal/page.tsx → tela cheia, link direto
```
- O `terminal.tsx` não sabe se está num dialog ou numa página.
- O contêiner passa só o que difere, como `onClose`.

### Uma fonte de dados, várias visões (Fases 1 a 5)
As visões consomem os mesmos dados de `constants/`, sem um agregador intermediário:
- **home e cases:** usam os objetos tipados;
- **currículo:** usa os mesmos objetos, em ordem de currículo;
- **terminal:** usa objetos e texto curto para `cat`, `ls` e `skills`.

Nenhuma visão reescreve o conteúdo; cada uma só formata.

### Variante em vez de cópia (Fase 2)
Crie uma variante apenas quando houver dois usos reais. A experiência atual possui somente a apresentação da linha do tempo; a variante antiga de card e seus badges foram removidos por não terem consumidor.

## Quando criar uma abstração
Crie quando **todas** as condições valerem:
1. Há pelo menos dois usos reais, não hipotéticos.
2. Os usos mudam pelos mesmos motivos.
3. O nome da abstração descreve o domínio, como `CaseSection`, e não a forma, como `Box2`.

Não crie:
- **Hooks genéricos** (`useFetch`, `useToggle`) para um único uso;
- **Componentes "faz-tudo"** com dezenas de props booleanas;
- **Wrappers** que só repassam props para uma primitiva.
