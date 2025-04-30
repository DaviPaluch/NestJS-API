# DevOverflow API

## Sobre o DevOverflow

DevOverflow é uma plataforma de perguntas e respostas voltada para desenvolvedores, similar ao Stack Overflow, mas com foco na comunidade brasileira de tecnologia. Nossa missão é criar um ecossistema onde programadores possam compartilhar conhecimento, resolver problemas técnicos e crescer profissionalmente através da colaboração.

## Visão Geral da API

Esta API fornece todos os endpoints necessários para integrar com a plataforma DevOverflow, permitindo operações completas de criação, edição, exclusão e listagem de perguntas, respostas e comentários, além de suporte a anexos para compartilhamento de código, imagens e outros recursos.

## Autenticação

A API utiliza autenticação via JWT (JSON Web Token). Para obter acesso aos endpoints, é necessário incluir o token no header da requisição:

```
Authorization: Bearer {seu_token_jwt}
```

## Detalhamento das Funcionalidades

### 1. Gestão de Perguntas

#### Criar uma pergunta
Permite que desenvolvedores postem suas dúvidas técnicas com título, corpo da pergunta, tags relacionadas e nível de dificuldade. As perguntas são categorizadas para fácil pesquisa e podem ser filtradas por tecnologia, framework ou conceito.

#### Listagem de perguntas
Recupera perguntas com opções de filtro por popularidade, data, tags ou sem resposta. Útil para encontrar questões relevantes ou populares em determinadas áreas tecnológicas.

#### Editar pergunta
Permite ao autor modificar o conteúdo, corrigir erros ou adicionar informações que auxiliem na compreensão do problema.

#### Deletar pergunta
Remove perguntas que não são mais relevantes ou que foram postadas por engano, mantendo a plataforma organizada.

#### Criar/Editar perguntas com anexo
Facilita a inclusão de exemplos de código, screenshots de erros, diagramas ou outros recursos visuais que ajudem a explicar o problema enfrentado.

### 2. Sistema de Respostas

#### Responder uma pergunta
Permite que membros da comunidade compartilhem soluções, explicações ou alternativas para resolver o problema apresentado.

#### Listar respostas de pergunta
Exibe todas as respostas fornecidas para uma determinada pergunta, ordenadas por relevância ou data.

#### Editar resposta
Possibilita atualizar a resposta com mais informações, corrigir erros ou refinar a solução conforme feedback recebido.

#### Deletar resposta
Remove respostas incorretas ou que não agregam valor à discussão.

#### Melhor resposta
Permite ao autor da pergunta marcar a solução que efetivamente resolveu seu problema, destacando-a para outros desenvolvedores com a mesma dúvida.

### 3. Sistema de Comentários

#### Comentar pergunta/resposta
Facilita esclarecimentos adicionais, pedidos de detalhes ou feedback sobre as perguntas e respostas.

#### Listar comentários
Exibe todas as observações adicionais feitas sobre uma pergunta ou resposta específica.

#### Deletar comentário
Remove comentários obsoletos ou inadequados.

## Considerações Técnicas

- A API foi desenvolvida em Node.js com NestJS
- Utiliza PostgreSQL como banco de dados
- Implementa rate limiting para evitar abuso
- Todos os endpoints são testados com Jest

## Contato

Para dúvidas, sugestões ou problemas, entre em contato com nossa equipe de suporte:

- Email: devpaluch@gmail.com
