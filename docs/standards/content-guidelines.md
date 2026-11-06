# Regras de conteúdo

Valem para **o que pode ser publicado** no site. Toda mudança em `src/constants/` precisa seguir estas regras.

## Veracidade
1. **Só números verificáveis:** cada número precisa ter uma fonte, como uma data, um histórico de git, uma colocação ou uma métrica do próprio sistema. Estimativa só quando declarada como estimativa.
2. **Projeção não é resultado:** um impacto projetado num pitch ou numa proposta não aparece como impacto alcançado.
3. **Sem "em produção" sem prova:** só diga que algo está em uso por terceiros se estiver de fato.
4. **Contribuição individual clara:** em trabalho de equipe, descreva a sua parte ("implementei", "fui o principal desenvolvedor"), sem se apropriar do resultado do time.
5. **Tecnologias:** só liste as que foram usadas de verdade no projeto ou na experiência citada.

## Trabalhos com terceiros
Empresas, clientes, eventos e colegas de equipe:
- **Pode:** participação, colocação pública, problema em termos gerais, a sua contribuição, arquitetura em termos gerais, stack e prazo.
- **Não pode sem autorização:**
  - logo ou marca de terceiros, incluindo prints e demonstrações que as exibam;
  - dados internos ou não públicos;
  - prints de sistemas de empresas;
  - código feito em coautoria sem o acordo do time.
- **Não afirmar** integração, adoção ou uso por uma empresa sem que isso tenha acontecido.

Casos atuais:
- **Workspace (Anuntech):** só texto, sem prints.
- **Digitaliza Aí (hackathon):** sem a marca da organizadora e sem link da demonstração enquanto ela exibir essa marca.

## Experiências
- **Um item por empresa ou instituição**, com o cargo atual no título e o período completo. Promoções não viram itens separados nem blocos aninhados.
- **A promoção entra como atividade com data**, no início da lista (ex.: "Fui promovido de Júnior para Pleno em 01/2025"). O destaque vem do texto, e a cronologia fica correta.
- **Só crie item próprio para um cargo anterior** se ele tiver escopo diferente e entregas substanciais.
- **Ordem e duração saem de `utils/experience-timeline.ts`:** use `MM/YYYY` nas datas e `end: null` para vínculo em andamento; `formatPeriod` exibe “Atual”. A ordem no arquivo de constantes não importa. `displayOrder` define a precedência editorial (padrão `0`); datas ordenam os itens com a mesma precedência. Tutor usa `1` e subsíndico `2`, para ficarem depois das experiências de tecnologia, nessa ordem.
- **Atuações fora de tecnologia** (docência, gestão) entram na mesma linha do tempo, com `category`. Não cite o nome de condomínios, moradores ou outros terceiros sem divulgação pública.

## Dados pessoais
- **Pode aparecer no site e no repositório:** o que já está no currículo público, ou seja, nome, cidade, e-mail profissional, LinkedIn e GitHub.
- **Não entra:** telefone, documentos, endereço, dados de processos seletivos, candidaturas, salários e anotações pessoais. Esse material fica fora do repositório.

## Consistência
- **Título, curso e datas iguais em todos os lugares:** home, `/curriculo`, metadados, imagem OG e terminal. O curso é **Engenharia da Computação**, UFMA, 04/2025–04/2028.
- **O currículo em PDF deve acompanhar a página `/curriculo`.** O download entrega o arquivo existente em `public`; alterações nas constantes não regeneram esse arquivo automaticamente.
