# Documentação do Projeto Auto Doc

## Uso

Para utilizar o projeto Auto Doc, siga os passos abaixo:

1. Instale o pacote globalmente executando o comando `npm install -g gen_doc`.
2. Navegue para o diretório do projeto que deseja criar a documentação.
3. Execute o comando `gen_doc create`.

Isso irá gerar automaticamente a documentação do projeto JavaScript no arquivo `README.md`.

Certifique-se de ter configurado corretamente a chave da API OpenAI na variável de ambiente `OPENAI_API_KEY` antes de executar o projeto.

## Visão Geral

O projeto Auto Doc é uma ferramenta desenvolvida para gerar documentação automática de projetos JavaScript. Ele lê arquivos em um diretório especificado, compila seu conteúdo e utiliza a API da OpenAI para criar um arquivo de documentação formatado em Markdown.

## Estrutura do Projeto

```
/
├── doc_gen.js
├── index.js
├── read_files.js
├── output.txt
└── README.md
```

## Principais Arquivos

### 1. `index.js`

Este arquivo é o ponto de entrada do aplicativo. Ele gerencia a execução do fluxo principal, desde a leitura de arquivos até a geração de documentação.

#### Funções

- **`main`**
  - **Descrição**: Função principal que controla o fluxo. Realiza a leitura do diretório atual, chama a função para geração de documentação e exclui o arquivo de saída temporário.
  - **Parâmetros**: Nenhum.

#### Exemplos de Uso

Para executar este arquivo, rode o comando na linha de comando:

```bash
node index.js
```

### 2. `doc_gen.js`

Este arquivo contém a lógica para interagir com a API OpenAI e gerar a documentação em Markdown.

#### Funções

- **`callAi`**
  - **Descrição**: Lê o conteúdo do arquivo `output.txt`, envia para a API da OpenAI, e escreve a resposta em `README.md`.
  - **Parâmetros**: Nenhum.
  - **Processo**:
    - Lê o conteúdo dos arquivos previamente coletados.
    - Cria uma solicitação para a API OpenAI com um prompt específico.
    - Escreve o resultado no arquivo README.md.
  
#### Exemplo de Uso

Essa função é chamada automaticamente dentro do `main`, não necessita de chamada direta.

### 3. `read_files.js`

Esse módulo é responsável por ler todos os arquivos em um diretório, exceto os que devem ser ignorados, e armazena os conteúdos em um arquivo temporário (`output.txt`).

#### Funções

- **`readFilesInDirectory`**
  - **Descrição**: Lê recursivamente arquivos em um diretório e suas subpastas. Ignora diretórios desnecessários como `node_modules` e arquivos que não são de texto (exceto os permitidos).
  - **Parâmetros**:
    - `dir` (string): O caminho do diretório a ser lido.
    - `fileContents` (array): Um array para armazenar conteúdos de arquivos (opcional, padrão é vazio).
  - **Retorno**: Um array com os conteúdos dos arquivos lidos (embora não seja utilizado no restante do fluxo).

#### Exemplo de Uso

Essa função é chamada dentro da função `main` e não é invocada diretamente.

## Fluxo Completo

1. O programa começa em `index.js`, no qual é chamada a função `main`.
2. A função `readFilesInDirectory` é acionada, lendo o diretório atual e armazenando conteúdos no `output.txt`.
3. Em seguida, a função `callAi` é chamada, que lê o `output.txt` e envia os dados para a API OpenAI.
4. A resposta é gravada em `README.md`.
5. Por fim, o arquivo `output.txt` é excluído.

## Dependências

- `OpenAI`: Biblioteca para interação com a API da OpenAI.
- `fs`: Módulo nativo do Node.js para manipulação de arquivos.
- `path`: Módulo nativo do Node.js para manipulação de caminhos de arquivo.
- `chalk`: Biblioteca para estilização de mensagens no terminal.
- `ora`: Biblioteca para exibir spinners de carregamento no terminal.

## Conclusão

O projeto Auto Doc é uma solução prática para automatizar a documentação de projetos JavaScript, tornando o processo mais eficiente ao usar as capacidades da inteligência artificial. Para usar, basta executar o arquivo `index.js` no diretório do seu projeto. A documentação gerada pode ser encontrada no arquivo `README.md`. 

Garanta que sua chave da API OpenAI esteja corretamente configurada na variável de ambiente `OPENAI_API_KEY` antes de executar o projeto.