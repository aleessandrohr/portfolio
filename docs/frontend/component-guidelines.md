# Componentes

Regras práticas para escrever componentes. A lógica por trás delas (níveis de abstração, quando criar uma abstração) está em [abstractions-and-composition](../design/abstractions-and-composition.md).

## Regras
- **Exportação nomeada em arrow function:** `export const Project = (...) => ...`. Só as páginas e layouts do Next usam `export default`.
- **Props tipadas pelo dado:** use `type Props = ProjectType` quando o componente renderiza um item de `constants/`. Isso mantém o componente e o dado sincronizados.
- **Sem conteúdo fixo:** textos de conteúdo vêm por props. Rótulos de interface ("Demonstração", "Habilidades") podem ficar no componente.
- **Composição sobre edição:** monte com as primitivas de `components/ui/` (`Card`, `Dialog`, `Drawer`, `Tooltip`, `Button`) e ajuste por `className`. Não edite os arquivos do shadcn.
- **Seletor de tema no header sticky:** use `DropdownMenu` com `modal={false}`. O bloqueio de rolagem do modo modal desloca o header quando a página já está rolada, levando o menu para fora da tela. O seletor deve continuar ancorado ao botão durante a rolagem e fechar com Escape ou clique externo. Ao fechar com Escape, o foco volta ao botão.
- **`'use client'` no menor componente possível.** Se só um botão precisa de estado, extraia o botão. Ver [state-management](state-management.md).
- **Ícones:** use `lucide-react` direto quando o ícone for fixo, como `<Play />`. Use `<Icon name="..." />` (`components/icon.tsx`) quando o nome vier de dados, como em `social-media.ts`.
- **Imagens:** use `next/image` com `alt` descritivo e `sizes` coerente com o layout.
- **Links externos:** use `next/link` com `target="_blank"`. Ver [security-guidelines](../standards/security-guidelines.md).
- **Opcionais renderizam condicionalmente:** campo ausente não deixa seção vazia, como em `{skills && (...)}` e `{iframeUrl && (...)}`.

## Padrão visual dos cards
Os cards de domínio compartilham o mesmo comportamento: `group`, borda `border-border/80`, hover com `-translate-y-1`, `border-brand/50` e sombra suave, e título que fica azul no hover. Mantenha esse padrão em cards novos. Ver [design-system](design-system.md).

## Acessibilidade mínima
- Botão só com ícone precisa de `aria-label` e, de preferência, de `Tooltip`.
- Dialogs usam `DialogTitle` e `DialogDescription`. Ver [accessibility](accessibility.md).
