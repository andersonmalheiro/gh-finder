# Github Finder

Encontre usuários do Github.

## Descrição

Projeto criado utilizando:

- React JS;
- Styled components;
- ESLint + Prettier + Styleguide Airbnb;
- React Leaflet + Mapbox;
- Redux Toolkit;
- Testes com Jest;
- Docker;
- SemaphoreCI - [![Build Status](https://andersonmalheiro.semaphoreci.com/badges/gh-finder/branches/master.svg)](https://andersonmalheiro.semaphoreci.com/projects/gh-finder)

## Instruções
Instruções de como executar o projeto:


Instale as dependências:
```bash
npm install
# ou
yarn
```

Antes de executar o projeto, crie na raiz dele um arquivo `.env.local` e adicione as seguintes variáveis de ambiente:

```
REACT_APP_GITHUB_KEY=<chave do Github>
REACT_APP_MAPS_KEY=<chave do Mapbox>
```

Para o mapa foi utilizado o [Mapbox](https://www.mapbox.com/). Então para testar localmente será necessário criar uma conta nele e obter a chave necessária para preencher o arquivo `.env.local`

---
Para executar o projeto em modo de desenvolvimento, execute o seguinte comando:

```bash
npm start
# ou
yarn start
```

O projeto será ficará disponível no endereço [http://localhost:3000](http://localhost:3000).

Para executar uma build de produção, utilize os seguintes comandos:

```bash
npm run build
# ou
yarn build
```

## Testes

Para executar os testes unitários, utilize os seguintes comandos:

```bash
npm run test
# ou
yarn test
```
## Testes E2E

Para executar os testes E2E é necessário que a aplicação esteja sendo executada. Tendo isso em mente, utilize os seguintes comandos para executar os testes:

```bash
npm run cypress:run
# ou
yarn cypress:run
```

## Docker

Para executar o projeto utilizando o Docker, execute o seguinte comando:

```bash
docker-compose up
```
