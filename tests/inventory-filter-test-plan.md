# Plano de Testes de Filtro de Inventário — Sauce Demo

URL base: https://www.saucedemo.com/

## Objetivo

Adicionar validações dos filtros de ordenação da página de inventário, confirmando os rótulos do dropdown e o comportamento dos quatro filtros disponíveis.

## Premissas

- O teste inicia com a página de login limpa e sem sessão autenticada.
- O usuário válido é `standard_user` com senha `secret_sauce`.
- A página de inventário deve carregar corretamente após o login.
- O dropdown de ordenação deve conter quatro opções.

## Critérios gerais

- O dropdown deve exibir os rótulos corretos.
- Cada filtro deve ordenar a lista de produtos de acordo com o critério selecionado.
- Os resultados devem ser validados pegando os nomes ou preços exibidos na lista de inventário.
- Os testes devem ser independentes e executáveis isoladamente.

---

## Cenário 1: Verificar rótulos do dropdown de filtro

### Passos
1. Acessar `https://www.saucedemo.com/`.
2. Fazer login com `standard_user` e `secret_sauce`.
3. Verificar que a página de inventário foi carregada.
4. Abrir o dropdown de ordenação de produtos.
5. Verificar os rótulos das opções.

### Resultado esperado
- O dropdown deve conter as opções:
  - `Name (A to Z)`
  - `Name (Z to A)`
  - `Price (low to high)`
  - `Price (high to low)`

---

## Cenário 2: Filtrar produtos por nome (A a Z)

### Passos
1. Acessar `https://www.saucedemo.com/`.
2. Fazer login com `standard_user` e `secret_sauce`.
3. Selecionar o filtro `Name (A to Z)`.
4. Capturar os nomes de todos os produtos exibidos.
5. Comparar a ordem dos nomes com a ordenação alfabética crescente.

### Resultado esperado
- Os nomes dos produtos devem estar em ordem alfabética crescente.

---

## Cenário 3: Filtrar produtos por nome (Z a A)

### Passos
1. Acessar `https://www.saucedemo.com/`.
2. Fazer login com `standard_user` e `secret_sauce`.
3. Selecionar o filtro `Name (Z to A)`.
4. Capturar os nomes de todos os produtos exibidos.
5. Comparar a ordem dos nomes com a ordenação alfabética decrescente.

### Resultado esperado
- Os nomes dos produtos devem estar em ordem alfabética decrescente.

---

## Cenário 4: Filtrar produtos por preço (menor para maior)

### Passos
1. Acessar `https://www.saucedemo.com/`.
2. Fazer login com `standard_user` e `secret_sauce`.
3. Selecionar o filtro `Price (low to high)`.
4. Capturar os preços de todos os produtos exibidos.
5. Comparar a ordem dos preços com a ordenação crescente.

### Resultado esperado
- Os preços dos produtos devem estar ordenados do menor para o maior.

---

## Cenário 5: Filtrar produtos por preço (maior para menor)

### Passos
1. Acessar `https://www.saucedemo.com/`.
2. Fazer login com `standard_user` e `secret_sauce`.
3. Selecionar o filtro `Price (high to low)`.
4. Capturar os preços de todos os produtos exibidos.
5. Comparar a ordem dos preços com a ordenação decrescente.

### Resultado esperado
- Os preços dos produtos devem estar ordenados do maior para o menor.
