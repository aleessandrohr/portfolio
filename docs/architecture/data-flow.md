# Fluxo de dados

## Hoje
```
constants/profile.ts ─────┬─► app/layout.tsx (metadados + JSON-LD) e app/opengraph-image.tsx
constants/experiences.ts ─┼─► app/(home)/page.tsx ─► Object.values() ─► <Experience/> <Project/>
constants/projects.ts ────┤
constants/educations.ts ──┤
constants/skills.ts ──────┴─► app/(home)/page.tsx ─► app/(home)/_components/about.tsx
constants/social-media.ts ──► app/(home)/page.tsx ─► app/(home)/_components/hero/index.tsx (redes)
configs/menu-items.ts ────► components/header.tsx (navegação global)
```

- **Build:** os dados são lidos e as páginas são pré-renderizadas.
- **Cliente:** guarda só estado de interface: tema, dialog aberto e carregamento do iframe. Ver [state-management](../frontend/state-management.md).
- **Ordem na tela:** grupos de habilidades e redes seguem a ordem das chaves. Projetos destacados vêm primeiro; experiências seguem `displayOrder` (padrão `0`) e, em caso de empate, as datas. Tutor (`1`) e subsíndico (`2`) ficam por último, nessa ordem. Todas as experiências ficam na coleção `experiences`, diferenciadas por categoria.

## Para alterar conteúdo
| Quero mudar | Arquivo |
|---|---|
| Perfil, resumo, título e metadados | `src/constants/profile.ts` |
| Habilidades técnicas | `src/constants/skills.ts` |
| Experiência profissional | `src/constants/experiences.ts` |
| Projeto (card, site e demo) | `src/constants/projects.ts` e imagem em `public/static/assets/` |
| Educação | `src/constants/educations.ts` |
| Redes sociais | `src/constants/social-media.ts` |
| Itens do menu | `src/configs/menu-items.ts` |

`src/app/layout.tsx`, `src/app/opengraph-image.tsx`, `src/app/(home)/page.tsx`, `src/app/(home)/_components/*` consomem diretamente `src/constants/profile.ts` e `src/constants/educations.ts`, sem duplicar textos.

## Planejado ([plano](../plans/redesign-portfolio.md))
```
constants/* ─┬─► home (atual)
             ├─► /projetos/[slug] e /curriculo (planejados)
             └─► modo terminal na home (atual, destinos dos mesmos links)
```
A Fase 1 elimina as duplicações listadas acima: título, resumo e curso passam a ter uma única origem.

## Terminal integrado

A página combina `configs/terminal.ts` com os links de `profile` e `projects`, passando os comandos ao provider. Menu, botões e prompt usam os mesmos destinos públicos. `utils/terminal-commands.ts` apenas resolve entrada e sugestões, sem importar dados de conteúdo.

## Contato

O canal de contato atual é o e-mail de `profile.email`. O botão do hero, a seção Contato e o link do rodapé usam `mailto:`; `social-media.ts` deriva o ícone/link de e-mail do mesmo campo, sem repetir o endereço. LinkedIn e GitHub continuam como redes profissionais; os links em `social-media.ts` são derivados de `profile.links`, sem repetir URLs.

## Sobre e habilidades

`app/(home)/page.tsx` passa `profile.summary` e os grupos de `skills` para `app/(home)/_components/about.tsx`. Sobre e Habilidades ocupam 50% cada no desktop; no celular, ficam empilhados. A lista atual mostra os grupos técnicos com badges neutros. Os dados interpessoais e os destaques agregados foram removidos porque não tinham consumidor na interface. Os fatos profissionais continuam contextualizados em experiências e projetos.

## Datas e configurações

`configs/` guarda navegação e estilos compartilhados; esses arquivos não fazem parte do conteúdo profissional. `utils/experience-timeline.ts` recebe experiências por parâmetro e usa `lib/dayjs.ts` para ler datas `MM/YYYY`, tipadas por `MonthYear`. `end: null` representa um vínculo em andamento; `formatPeriod` apresenta esse valor como “Atual”. A duração inclui os meses inicial e final; o período acadêmico segue os semestres jan–jun e jul–dez. O parâmetro `now` permite verificar essas regras com uma data de referência fixa. As páginas continuam pré-renderizadas: a adoção do Day.js não atualiza datas no navegador nem altera a política de revalidação.

## Estrutura dos objetos

As coleções continuam sendo objetos por chave, validados por `as const satisfies Record<string, Tipo>`. As chaves permitem acesso direto quando necessário, como `educations.ufma`; a página usa `Object.values` para as listas. Não há um agregador ou camada de normalização intermediária.

| Constante | Contrato e responsabilidade |
|---|---|
| `profile` | `Profile`: `displayName` para apresentação e `fullName` para identidade completa; contato e URLs profissionais têm uma origem única |
| `experiences` | `Experience`: `title`, `category`, `organization`, detalhes opcionais, datas e lista de `activities`; reúne tecnologia, docência e gestão |
| `educations` | `Education`: `course`, `institution`, datas e `description` em texto; não reutiliza o contrato de experiência |
| `projects` | `Project`: dados do card, `websiteUrl` opcional e `demoUrl` opcional; não depende da posição de URLs em um array |
| `skills` | `SkillGroup`: categoria e coleção somente de leitura de tecnologias |
| `socialMedia` | `SocialMedia`: apresentação dos links derivados do perfil, sem repetir as URLs |

`Period` compartilha apenas `start` e `end` entre os domínios. `MonthYear` restringe o mês a `01`–`12`; o parsing do Day.js continua estrito. A educação atual exige um término previsto, enquanto experiências podem ter `end: null`. Listas de atividades, detalhes e habilidades são `ReadonlyArray`.

Organização e detalhes da experiência ficam separados nos dados. O componente os apresenta com ` | `, preservando a aparência. Educação tem uma descrição única; atividades de experiência são uma lista. Assim, o tipo representa o significado do conteúdo, sem um campo genérico `subtitle` compartilhado entre domínios diferentes.
