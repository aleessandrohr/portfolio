# ADR-0006: Motion para entradas e revelação da home

- **Status:** Aceito
- **Data:** 2026-11-05
- **Relacionado a:** Fase 2, revisão guiada do design

## Contexto

O hero passou a combinar quatro momentos, revelação por letras e foto. As demais seções têm entradas durante a rolagem. A implementação anterior distribuía a coordenação entre keyframes CSS e um controlador próprio de IntersectionObserver. A evolução pede uma API única de execução, interrupção e limpeza, preservando dados no servidor, acesso por teclado e o visual aprovado.

## Decisão

Adotar `motion` (versão instalada: 14.9.1), com `useAnimate` de `motion/react-mini` e `inView`. `HomeMotion` delimita o escopo cliente e recebe as seções renderizadas no servidor por `children`. O controlador lê os tokens de tempo, distância e curva de `globals.css`.

A entrada do hero e a revelação das seções passam para o Motion. Removem-se os keyframes anteriores e o controlador `ScrollReveal`. CSS continua responsável por apresentação, geometria, estados estáticos, movimento reduzido, impressão e a preparação limitada de visibilidade durante a hidratação.

## Alternativas consideradas

| Opção | Benefícios | Custos |
|---|---|---|
| Motion compacto (escolhido) | Escopo e limpeza React; animação nativa pelo navegador; atende opacity/transform e delays atuais | Nova dependência e JavaScript adicional; suporte a falhas de hidratação precisa ser explícito |
| CSS + observer próprio | Sem dependência adicional; entradas CSS já existiam | Coordenação e interrupção divididas entre dois mecanismos |
| Componentes `motion` ou `LazyMotion` | API declarativa e recursos de layout/gestos | Mais recursos que os necessários para a home atual |

## Consequências

- `LetterReveal` continua no servidor, preservando grafemas, palavras e o texto completo para leitores de tela.
- Hero mantém entrada em quatro momentos, e cada seção/card aparece uma vez. Não há scroll hijacking.
- Foco e hash podem concluir imediatamente uma entrada. Redução de movimento e impressão cancelam animações pendentes e mostram o conteúdo.
- Animações e estilos temporários são cancelados/removidos ao concluir ou desmontar.
- Sem JavaScript, o conteúdo permanece visível. Com JavaScript habilitado, um estado CSS evita o flash antes da hidratação e expira após 2500 ms. Se expirar, o hero não é escondido novamente. Em navegadores sem suporte a `scripting`, o hero é estático.
- O tamanho deve ser medido no build local; estimativas da documentação do Motion não representam automaticamente o bundle deste Next.js/Webpack.

## Medição local

Build de produção isolado em 05/11/2026, com os valores arredondados exibidos pelo Next.js:

| Medida | Antes da adoção | Com Motion compacto |
|---|---|---|
| Tamanho da rota `/` | 85,8 kB | 90,3 kB |
| First Load JS da home | 194 kB | 198 kB |

O acréscimo observado foi de aproximadamente 4 kB no First Load JS. Isso é uma comparação do build local, não uma medição de Core Web Vitals, rede ou dispositivo real.

## Referências

- [Motion: useAnimate e import compacto](https://motion.dev/docs/react-use-animate)
- [Motion: inView](https://motion.dev/docs/inview)
- [Motion: controle do bundle](https://motion.dev/docs/react-reduce-bundle-size)
- [MDN: scripting media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/scripting)
