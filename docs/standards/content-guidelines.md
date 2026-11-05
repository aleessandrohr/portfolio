# Regras de conteúdo

Valem para **o que pode ser publicado** no site e para o que o assistente com LLM pode responder. Toda mudança em `src/constants/` precisa seguir estas regras.

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

## Dados pessoais
- **Pode aparecer no site e no repositório:** o que já está no currículo público, ou seja, nome, cidade, e-mail profissional, LinkedIn, GitHub e cal.com.
- **Não entra:** telefone, documentos, endereço, dados de processos seletivos, candidaturas, salários e anotações pessoais. Esse material fica fora do repositório.

## Consistência
- **Título, curso e datas iguais em todos os lugares:** home, `/curriculo`, metadados, imagem OG e respostas da LLM. O curso é **Engenharia da Computação**, UFMA, 04/2025–04/2028.
- **O currículo em PDF segue a página `/curriculo`**, e não o contrário.

## Assistente com LLM
- **Responde só com o que está em `src/constants/`.**
- **Diz quando não sabe** e não estima números que não estão nos dados.
