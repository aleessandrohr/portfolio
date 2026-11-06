# UI e UX

## Público e objetivo
O público principal são recrutadores e líderes técnicos. Eles costumam decidir em menos de um minuto se vale continuar lendo. A página precisa responder rápido: **quem é, o que faz, o que já entregou e como falar com ele**.

| Público | O que procura | O que o site precisa entregar |
|---|---|---|
| Recrutadores | perfil, experiência, contato | resumo claro, currículo enxuto, contato em um clique |
| Líderes técnicos | profundidade técnica, decisões | páginas de case com arquitetura, contribuição e resultados |
| Desenvolvedores | curiosidade, código | modo terminal, GitHub, demonstrações |

Fora do escopo: blog, depoimentos, área logada, formulário de contato com backend e vários idiomas.

## Princípios
1. **Valor antes de detalhe:** o topo mostra nome, título, uma frase de proposta e as ações principais. O detalhe fica nas páginas de case.
2. **Prova em vez de adjetivo:** prefira um fato verificável ("MVP do zero ao ar em 4 dias") a uma qualidade ("apaixonado por tecnologia").
3. **Números só se defensáveis:** nada de "50+ projetos" ou "30+ clientes". Ver [content-guidelines](../standards/content-guidelines.md).
4. **Uma ação principal por bloco:** o botão principal fica preenchido (`Button` padrão) e o secundário em contorno (`variant="outline"`).
5. **Escaneável:** frases curtas, listas no lugar de parágrafos longos e títulos que dizem o conteúdo.
6. **Dois caminhos para os mesmos dados:** o site visual para todos e o terminal para quem é dev. Os dois mostram o mesmo conteúdo (Fase 5).

## Microcopy
- **Português, tom direto e amigável, em primeira pessoa** ("Construí", "Implementei").
- **Botões dizem a ação:** "Ver projetos", "Enviar e-mail", "Abrir site". Evite "Clique aqui".
- **Estados vazios e de erro explicam o que fazer,** por exemplo: "Comando não encontrado. Digite `help` para ver os comandos."
- **Datas:** `MM/AAAA` nos cards; "Jul 2024–Jun 2026" no currículo, igual ao PDF.

## Layout
- **Largura do conteúdo:** `max-w-5xl`, centralizado, com padding lateral de 20 px (32 px a partir de `sm`).
- **Navegação:** fixa no topo, com drawer no celular.
- **Seções:** títulos claros, divisórias discretas e espaçamento vertical consistente. O header mantém os itens em uma linha no desktop, com margens externas.

## Apresentação e revelação na rolagem

- A primeira tela contém o header e o hero. O hero usa a utilidade Tailwind de `min-height: calc(100svh - altura do header - margem superior)`. Em telas baixas ou com texto ampliado, a seção cresce para não cortar conteúdo.
- O hero segue diretamente para Sobre, sem faixa de números. Os fatos aparecem com contexto em experiências e projetos, sem uma lista duplicada de destaques no perfil.
- O hero tem uma entrada coordenada pelo Motion ao abrir ou atualizar a página: saudação primeiro, nome e foto após 160 ms, cargo e frase após 320 ms, botões e redes após 480 ms. Saudação, nome e cargo têm entrada letra por letra (800 ms por letra, intervalo de 28 ms e deslocamento de 0.3em), mantendo acentos compostos e palavras inteiras na quebra de linha. Frase, foto e ações entram como blocos (20 px por 1100 ms). As entradas se sobrepõem; leitores de tela recebem o texto completo. O conteúdo é renderizado no servidor; sem JavaScript, fica estático e visível. Movimento reduzido desativa as animações. As colunas Sobre e Habilidades entram como blocos completos; Experiência, Educação e Contato também. Em Projetos, o título e cada card têm entrada própria. No celular (abaixo de `md`), uma foto pequena (80 px) aparece acima do "Olá"; a foto grande lateral só existe a partir de `md`.
- `data-reveal` marca os blocos. `HomeMotion` usa `inView` do Motion (baseado em IntersectionObserver), que inicia a entrada quando o bloco cruza a região a 8% da borda inferior da viewport. O callback é executado uma vez por bloco.
- O efeito combina opacidade com deslocamento vertical de 20 px durante 1100 ms, usando a curva definida em `globals.css`. Cada bloco anima uma vez e permanece visível ao voltar para cima. Em telas a partir de 768 px, o card da direita entra com 160 ms de diferença em relação ao da esquerda; no celular, cada card segue apenas sua entrada na viewport.
- A rolagem permanece nativa: sem scroll snap, interceptação de roda ou travamento por seção.
- A ocultação só é ativada no cliente para blocos ainda abaixo da tela. O estado `data-motion-state="pending"` não tem transição de saída. A entrada é executada por `useAnimate` (`motion/react-mini`), sem keyframes CSS concorrentes. Sem JavaScript ou IntersectionObserver, o conteúdo fica visível. Conteúdo já alcançado por restauração de rolagem também permanece visível.
- Movimento reduzido desativa a revelação e as transições. Se a preferência mudar durante a visita, os blocos pendentes são revelados. Na impressão, todos os blocos aparecem.
- Foco por teclado e destinos de hash revelam imediatamente o bloco correspondente, incluindo links diretos de projeto/demo.

A ativação do hero usa uma preparação de visibilidade em CSS, apenas quando JavaScript está habilitado e movimento é permitido. O Motion assume no layout effect; isso evita o flash entre HTML e hidratação. Se o JavaScript falhar ou demorar, a preparação expira em 2500 ms e o texto fica visível. Se esse prazo já expirou, o hero permanece estático, evitando esconder novamente conteúdo já mostrado. Navegadores sem suporte ao media feature `scripting` também mantêm o hero estático.

## Sobre e habilidades

Sobre e Habilidades ficam lado a lado a partir de 768 px, em 50% e 50% (`md:grid-cols-2`), e empilhados no celular. As habilidades usam uma única coluna, com o rótulo à esquerda e os badges à direita. O texto do Sobre usa 15 px, justificado e com hifenização (`hyphens-auto`). Uma versão com Sobre e Habilidades empilhados e outra com cartão de dados rápidos foram testadas e descartadas por não melhorarem a leitura.

A interface atual renderiza somente os grupos técnicos de `constants/skills.ts`. A coleção de habilidades interpessoais e sua prop foram removidas na limpeza de dados sem consumidor; não há um bloco oculto reservado ao currículo.

## Projetos
Os projetos ficam em um carrossel (`Carousel` do shadcn, com Embla e o plugin de autoplay), em laço, com os destaques primeiro. Cabem três cards por vez a partir de 1024 px, dois a partir de 640 px e, no celular, um card com o próximo aparecendo ao lado (85% da largura).

**Card compacto** (referência: card de portfólio com capa, título, stack em uma linha e rodapé):
- **Capa:** o print do projeto (`h-36`, `object-cover`). Sem print, um fundo neutro com gradiente do azul da marca e um ícone do tipo de projeto (`profissional`, `hackathon` ou `pessoal`).
- **Texto:** categoria, título e a descrição limitada a quatro linhas. As tecnologias não aparecem no card (o campo `stack` continua em `constants/projects.ts`).
- **Rodapé:** só aparece nos cards com links, com um filete superior e altura mínima de 48 px: "Demo" abre a demonstração e "Site" abre o projeto. Projetos sem links (hoje Workspace e Digitaliza Aí) ficam sem rodapé, e por isso a base dos cards não é igual. Foi uma escolha do autor; uma tentativa de mostrar o cargo no rodapé desses cards foi descartada. Contribuição e resultados não aparecem no card, porque repetiam a descrição e a seção Experiência; esse detalhe fica para as páginas de case (`/projetos/[slug]`), que usam o campo `case` de `constants/projects.ts`.
- **Altura:** todos os cards têm a mesma altura (cerca de 400 px a 1280 px de largura); o texto longo é cortado com reticências.

**Rotação e foco:**
- **Rotação:** passa um card a cada 2 s, sempre ligada e sem botões de controle. Ela só pausa enquanto o mouse está sobre o carrossel ou há foco por teclado dentro dele. Com "reduzir movimento" no sistema, não há rotação e aparecem setas de anterior e próximo ao lado do título, para que o conteúdo continue acessível com o mouse. O arraste e as setas do teclado funcionam sempre.
- **Foco com o mouse:** o card sob o cursor aumenta (escala 1,03) e os outros escurecem (opacidade 60%). Em telas de toque esse efeito não existe, para o hover não ficar preso depois de um toque.
- **Folga lateral:** o carrossel usa margem negativa (`-mx-3`) e cada slide tem `px-3`, para o card aumentado não ser cortado pela área de recorte.
- **Sem JavaScript:** só os primeiros projetos ficam visíveis, porque o recorte esconde o resto. O HTML continua contendo todos.
- **Custo:** cerca de 9 kB a mais de JavaScript na home.

## Planejado ([plano](../plans/redesign-portfolio.md), Fase 2)
Ordem da home:
1. Hero
2. Sobre, com Habilidades como subseção
3. Projetos em destaque
4. Experiência
5. Educação
6. Contato (sem telefone)

Depoimentos e blog ficam de fora até existir conteúdo real.
