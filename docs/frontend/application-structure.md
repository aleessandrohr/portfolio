# Estrutura da aplicação (frontend)

```text
src/
├── app/
│   ├── layout.tsx
│   ├── globals.css           # tokens, estilos globais e preparação das animações
│   ├── opengraph-image.tsx
│   ├── sitemap.ts
│   ├── curriculo/            # currículo imprimível (page.tsx e _components/)
│   └── (home)/               # grupo organizacional; mantém a URL /
│       ├── page.tsx          # compõe as seções e fornece os dados
│       └── _components/
│           ├── terminal-return.tsx # retorno flutuante ao input do hero
│           ├── about.tsx
│           ├── contact.tsx
│           ├── education.tsx
│           ├── home-motion.tsx
│           ├── pixel-grid.tsx  # compartilhado apenas por hero e contato
│           ├── hero/
│           │   ├── index.tsx
│           │   ├── letter-reveal.tsx
│           │   ├── command-line.tsx  # estado e interação do prompt
│           │   └── command-input.tsx # formulário acessível
│           ├── experiences/
│           │   ├── index.tsx   # seção de experiências
│           │   └── experience.tsx
│           └── projects/
│               ├── index.tsx   # seção de projetos
│               ├── carousel.tsx
│               └── project-card/
│                   ├── index.tsx
│                   ├── cover.tsx
│                   ├── demo-dialog.tsx
│                   ├── iframe.tsx
│                   └── styles.ts
├── components/               # interface global e primitivas compartilhadas
│   ├── ui/
│   ├── header.tsx
│   ├── footer.tsx
│   ├── mode-toggle.tsx
│   └── icon.tsx
├── constants/                # conteúdo profissional compartilhado
├── types/                    # contratos de domínio
├── configs/                  # menu do header e comandos de navegação
├── lib/                      # Day.js e integração cn() do shadcn
├── utils/                    # datas e resolução de comandos
└── providers/                # tema e modo de apresentação da home
```

## Onde colocar código novo

| Tipo | Lugar |
|---|---|
| Página ou rota | `src/app/<rota>/page.tsx` |
| Seção exclusiva de uma página | `_components/` da rota |
| Componentes usados apenas por uma seção | pasta da seção, junto de `index.tsx` |
| Elemento usado por duas seções da home | `app/(home)/_components/`, como `pixel-grid.tsx` |
| Interface global ou componente compartilhado entre páginas | `src/components/` |
| Primitiva genérica do shadcn | `src/components/ui/` |
| Conteúdo profissional | `src/constants/`, mesmo quando hoje só aparece na home |
| Configuração da interface global | `src/configs/`, como o menu do header |
| Integração de biblioteca | `src/lib/` |
| Função pura compartilhada de domínio | `src/utils/` |

O header importa o menu global de `configs/menu-items.ts`. A página fornece o primeiro nome ao header e o perfil ao footer. Projeto e experiência pertencem à home; páginas futuras terão sua própria apresentação, usando os mesmos dados e tipos.

Educação e Experiências são seções independentes; não há um wrapper `Trajectory`. `home-motion.tsx` reúne o wrapper cliente e seus helpers privados, sem uma pasta para separar leitura de tokens e controlador. Os componentes da home continuam sendo Server Components, com exceção do movimento, carrossel, dialog, iframe e prompt do hero.

Os estilos de apresentação usam Tailwind. As regras de inicialização e acessibilidade das animações ficam em `globals.css`; não há arquivo `home.css`. Veja [styling-guidelines](styling-guidelines.md).

`(home)` não cria `/home`, e `_components` não gera rotas. Esses nomes seguem as [convenções do App Router](https://nextjs.org/docs/14/app/building-your-application/routing/colocation). Pastas adicionais só surgem quando existe código real para agrupá-las; não crie diretórios vazios para necessidades futuras.

## Terminal integrado

`components/terminal-{toggle,text,link}.tsx` atendem várias seções. O modo fica em `providers/portfolio-mode.tsx` e a sessão em `providers/terminal-session.tsx`, montados na home; configuração em `configs/terminal.ts`, contrato em `types/terminal.ts` e resolver puro em `utils/terminal-commands.ts`.

## Próximas páginas

`app/curriculo/` já é irmã de `(home)`, e `app/projetos/[slug]/` será. O terminal está integrado à home, sem rota própria. Cada rota terá seus próprios componentes privados. Uma página não importa detalhes privados de outra; dados e funções compartilhados continuam nas pastas globais. Veja o [plano](../plans/redesign-portfolio.md).
