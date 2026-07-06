# 💰 Controle de Gastos

Sistema desenvolvido como teste técnico utilizando **ASP.NET Core Web API**, **React**, **Entity Framework Core** e **SQLite** para gerenciamento de pessoas e transações financeiras.

---

## 📋 Sobre o projeto

O objetivo da aplicação é permitir o cadastro de pessoas e de suas respectivas transações financeiras, seguindo regras de negócio definidas no desafio.

Cada transação está vinculada a uma pessoa e pode ser classificada como **Receita** ou **Despesa**.

Além disso, o sistema implementa uma regra de negócio que impede que pessoas menores de idade cadastrem receitas.

---

## 🚀 Tecnologias utilizadas

### Backend

* ASP.NET Core 8 Web API
* C#
* Entity Framework Core
* SQLite
* Swagger (OpenAPI)

### Frontend

* React
* TypeScript
* Axios
* React Icons
* CSS

---

## 🗂 Estrutura do projeto

### Backend

* **Controllers** → Endpoints da API.
* **Models** → Entidades do banco de dados.
* **DTOs** → Objetos utilizados para entrada de dados.
* **Data** → Configuração do Entity Framework Core e do DbContext.

### Frontend

* Componentes React para gerenciamento das telas.
* Comunicação com a API utilizando Axios.
* Interface desenvolvida em CSS.

---

## ⚙ Funcionalidades

### Pessoas

* Cadastro de pessoas.
* Listagem de pessoas cadastradas.
* Exclusão de pessoas.

### Transações

* Cadastro de receitas e despesas.
* Listagem do histórico de transações.
* Associação entre transações e pessoas.

---

## 📌 Regras de negócio

* Pessoas menores de 18 anos **não podem cadastrar receitas**.
* Pessoas menores de idade podem cadastrar apenas despesas.
* Ao excluir uma pessoa, todas as suas transações são removidas automaticamente por meio de **Cascade Delete**.

---

## 🗄 Banco de dados

O projeto utiliza **SQLite** como banco de dados local.

O acesso aos dados é realizado através do **Entity Framework Core**, utilizando Migrations para gerenciamento da estrutura do banco.

---

## 🌐 API

A API segue o padrão REST.

### Pessoas

* `GET /api/pessoas`
* `POST /api/pessoas`
* `DELETE /api/pessoas/{id}`

### Transações

* `GET /api/transacoes`
* `POST /api/transacoes`

---

## ▶ Como executar

### Backend

```bash
dotnet restore
dotnet ef database update
dotnet run
```

A API estará disponível no endereço informado pelo terminal (ex.: `http://localhost:5057`).

### Frontend

```bash
npm install
npm run dev
```

O Vite exibirá a URL da aplicação (geralmente `http://localhost:5173`).

---

## 💡 Boas práticas aplicadas

* Separação em camadas.
* Utilização de DTOs para entrada de dados.
* Injeção de dependência.
* Entity Framework Core.
* Validação de regras de negócio no backend.
* Comunicação entre frontend e backend via API REST.
* Relacionamento entre entidades utilizando chave estrangeira.
* Exclusão em cascata (Cascade Delete).
* Código organizado e comentado para facilitar a manutenção.

---

## 👨‍💻 Desenvolvido por

Felipe Braga

Durante o desenvolvimento, procurei organizar o projeto seguindo boas práticas, separando o backend e o frontend em camadas bem definidas. No backend, utilizei DTOs para entrada de dados, Entity Framework Core para acesso ao banco de dados SQLite e implementei a regra de negócio solicitada, garantindo que pessoas menores de idade não possam cadastrar receitas.

Também foi configurado o relacionamento entre pessoas e transações com exclusão em cascata, de forma que, ao remover uma pessoa, suas transações sejam removidas automaticamente.

No frontend, desenvolvi uma interface em React com TypeScript, realizando validações básicas para melhorar a experiência do usuário e consumindo a API por meio do Axios.

Agradeço pela oportunidade de participar do processo seletivo e fico à disposição para esclarecer qualquer dúvida sobre a implementação ou as decisões técnicas adotadas no projeto.
