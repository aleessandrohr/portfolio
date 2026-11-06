# Estrutura e ordem do código

Padrão de escrita para todo código do projeto. A formatação (tabs, aspas, linhas de 80 colunas) é do Biome e está em [lint-and-format](lint-and-format.md). Este documento trata do que o formatador não resolve: **em que ordem as coisas aparecem e como separá-las em blocos**. O objetivo é que qualquer arquivo seja lido de cima para baixo, na mesma sequência, sem precisar procurar.

Referência prática: [home-motion.tsx](../../src/app/(home)/_components/home-motion.tsx) e [utils/experience-timeline.ts](../../src/utils/experience-timeline.ts).

## 1. Ordem dentro de um arquivo
1. **Imports.** O Biome organiza; não reordene à mão.
2. **Tipos** (`type Props`, tipos auxiliares).
3. **Constantes do módulo:** seletores, números e dados fixos.
4. **Helpers puros:** funções pequenas que não dependem de React nem de efeito.
5. **Subcomponentes privados** (quando o arquivo for de componente).
6. **Exportação principal:** o componente ou a função pública.

Cada grupo é separado do seguinte por **uma linha em branco**. Dentro de um grupo, declare antes o que é usado depois.

```ts
import { inView } from 'motion'                       // 1. imports

type Entrance = { element: HTMLElement; delay: number }   // 2. tipos

const HERO_SELECTOR = '.hero-letter, .hero-intro'     // 3. constantes
const BELOW_FOLD_RATIO = 0.92

const isBelowFold = (element: HTMLElement) => ...     // 4. helpers puros

export const startHomeMotion = (...) => { ... }       // 6. exportação principal
```

## 2. Ordem dentro de uma função
Em funções com mais de uma etapa, separe **blocos por contexto**, com uma linha em branco entre eles, nesta ordem:

| Bloco | O que entra |
|---|---|
| **Contexto** | leituras que dependem do estado atual (DOM, `window`, props) e precisam acontecer antes do resto |
| **Variáveis** | `const` derivadas do contexto |
| **Guardas** | `if` com retorno antecipado |
| **Laços** | `for...of` com efeitos |
| **Funções internas** | handlers e auxiliares que usam as variáveis acima |
| **Efeitos** | registro de listeners, chamadas externas |
| **Limpeza** | o que desfaz os efeitos, no mesmo bloco do retorno |

Em funções longas, um comentário curto de uma ou duas palavras abre cada bloco (`// Variáveis`, `// Entradas`, `// Escuta`, `// Limpeza`). Função curta, de até uns 10 linhas, não precisa de comentários de bloco.

```ts
export const startHomeMotion = (root: HTMLElement, animate: Animate) => {
	// Contexto
	const canEnterHero = isHeroHidden(root)

	root.dataset.motionReady = 'true'

	// Variáveis
	const tokens = readMotionTokens(root)
	const { enter, settle } = createRevealer(animate, tokens)

	// Entradas
	if (canEnterHero) enterHero(root, heroElements, tokens, enter)

	// Escuta
	window.addEventListener('hashchange', settleHashTarget)

	// Limpeza
	return () => {
		window.removeEventListener('hashchange', settleHashTarget)
	}
}
```

## 3. Tamanho e responsabilidade
- **Uma função faz uma coisa**, e o nome diz qual. Passou de uns 40 linhas, ou de dois níveis de aninhamento, extraia.
- **Um arquivo de componente exporta um componente.** Subcomponentes pequenos e privados ficam acima dele no mesmo arquivo; se crescerem, vão para `components/`.
- **Núcleo sem React.** Lógica de domínio compartilhada vive em `.ts` puro, como `utils/experience-timeline.ts`. Helpers que só existem para controlar uma interface podem ser privados no arquivo do componente. Por decisão do autor, `home-motion.tsx` reúne leitura de tokens, controlador e wrapper em um arquivo, com apenas `HomeMotion` exportado.
- **Prefixos de nome por papel:**

| Prefixo | Significa | Exemplo |
|---|---|---|
| `read` | lê de uma fonte externa (DOM, CSS) | `readMotionTokens` |
| `get` | calcula e devolve, sem efeito | `getHeroEntrance` |
| `build` | monta um valor composto | `buildProjectBlock` |
| `is`, `has`, `should`, `can` | devolve booleano | `isBelowFold`, `canEnterHero` |
| `create` | devolve um objeto com estado interno | `createRevealer` |
| verbo do domínio | executa um efeito | `enter`, `settle` |

## 4. Condicionais
- **Guardas no topo:** trate o caso inválido primeiro e retorne, em vez de aninhar o caso feliz dentro de um `if`.
- **`if` de uma linha, sem chaves**, só para `return`, `continue` ou `break`. Com mais de uma instrução, use chaves.
- **Linha em branco depois do bloco de guardas.**
- **Condição composta ganha nome:** em vez de `a && b && c` no meio do código, extraia `const shouldStagger = ...` ou uma função `is...`.

```ts
const hero = root.querySelector('#home')

if (!hero || hero.getBoundingClientRect().bottom <= 0) return

for (const element of heroElements) { ... }
```

## 5. Laços e coleções
- **`for...of` para executar efeitos**; `.map`, `.filter` e `.find` para transformar dados.
- **Nada de efeito colateral dentro de `.map`**, como alterar um contador de fora. Se precisa de um contador, use um laço comum. Antes, `LetterReveal` incrementava `order++` dentro do `.map`; agora `splitIntoChunks` faz isso num `for...of`.
- **Iterável que não é array** (resultado de `Intl.Segmenter`, `NodeList`, `Map`) passa por `Array.from(...)` antes do `for...of`, porque o `tsconfig` não define `target` e o TypeScript recusa iterar.
- **Dois `.filter` com o mesmo JSX** viram uma lista ordenada e um único `.map`. Ver `home/projects.tsx`.

## 6. Constantes e nomes
- **Constante de módulo de configuração** (seletor, razão, limite): `UPPER_SNAKE_CASE`, no topo do arquivo.
- **Objeto de dados:** `camelCase`. Ver [naming-conventions](naming-conventions.md).
- **Nada de número ou texto mágico no meio do código.** Dê nome: `MS_PER_SECOND`, `BELOW_FOLD_RATIO`.
- **Identificadores em inglês**, **textos visíveis ao usuário em português**.

## 7. Componentes React
- **Ordem do corpo:** hooks → valores derivados → funções internas → `return`.
- **Sem lógica pesada dentro do JSX.** Calcule antes, em uma variável com nome.
- **Renderização condicional com booleano real:** `items.length > 0 && ...`, nunca `items.length && ...`, que renderiza `0`.
- **Props:** `type Props = { ... }` no arquivo; no mesmo arquivo, subcomponentes têm seu próprio tipo (`ListProps`, `MenuProps`).
- **Valor padrão no parâmetro** (`links = []`, `offset = 0`), não `?? []` espalhado pelo corpo.
- **`'use client'` só no menor componente que precisa.** `Project` é servidor; só `DemoDialog` é cliente, porque só ele guarda estado.
- **Estado sincronizado com a URL, listeners e timers** limpam no retorno do `useEffect`.

## 8. DOM e navegador
- **Remover atributo:** `element.removeAttribute('data-x')`, não `delete element.dataset.x`.
- **Código que usa `window` e `document` não roda no servidor:** mantenha-o em `useEffect`/`useLayoutEffect` ou em funções chamadas por eles.
- **Ícone fixo:** importe direto do `lucide-react`. Ver [component-guidelines](../frontend/component-guidelines.md).

## 9. Comentários
- **Em português**, e só quando explicam o **porquê**. O que o código já diz não se repete.
- **`/** ... */`** (JSDoc de uma linha) em funções exportadas ou cujo propósito não é óbvio pelo nome.
- **Comentário de bloco** (`// Variáveis`) segue a seção 2.
- **Nada de código comentado.** O git guarda o histórico.

## 10. Checklist de revisão
- [ ] Os blocos do arquivo seguem a ordem da seção 1.
- [ ] Funções longas têm blocos separados por linha em branco, na ordem da seção 2.
- [ ] Nenhuma função passa de uns 40 linhas nem de dois níveis de aninhamento.
- [ ] Guardas no topo; nenhum `else` desnecessário depois de `return`.
- [ ] Sem efeito dentro de `.map`; sem número ou texto mágico.
- [ ] Nomes seguem os prefixos da seção 3.
- [ ] O Biome passa nos arquivos alterados e o `type-check` também. Ver [definition-of-done](../development/definition-of-done.md).
