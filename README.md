# Sales Management

Este projeto é um backend que gerencia compras, vendas e a demanda de produtos. Ele fornece endpoints para criar compras, listar demandas de vendas, e mais, usando Node.js com Express e Prisma como ORM.

# 🚀 Instalação e Setup

Instale as dependencias:

```bash
    npm install
```

Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

```bash
    DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase
    PORT=3000
```

Gere o cliente do Prisma e aplique as migrações:

```bash
   npx prisma generate
   npx prisma migrate dev --name init
```

Execute o projeto

```bash
    npm run dev
```

O servidor estará disponível em http://localhost:3000.

#📡 Endpoints

## 1. Criar Compra

    Rota: POST /purchases
    Body:

````json
    {
      "saleId": 1,
      "products": [
        { "productId": 2, "quantity": 5 },
        { "productId": 3, "quantity": 10 }
      ]
    }
    ```

    Descrição: Cria uma compra associada a uma venda. Valida se os produtos pertencem à venda especificada.

## 2. Listar Demandas de Produtos

    Rota: GET /sales/product-sales
    Descrição: Retorna a quantidade total vendida, comprada e a demanda restante de cada produto.

## 3. Listar Compras

    Rota: GET /purchases
    Descrição: Lista todas as compras realizadas, incluindo os produtos adquiridos.

## 4. Listar Produtos

    Rota: GET /products
    Descrição: Lista todos os produtos cadastrados no sistema.

## 5. Listar vendas
    Rota: GET /sales

## 6. Criar venda
    Rota: POST /sales

    Body : ```json
  {
    "id": 1,
    "createdAt": "2024-12-14T12:34:56Z",
    "products": [
      { "id": 1, "productId": 1, "quantity": 10 },
      { "id": 2, "productId": 2, "quantity": 5 }
    ]
  }
````
