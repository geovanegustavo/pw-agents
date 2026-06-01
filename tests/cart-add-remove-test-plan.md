# Plano de Testes de Carrinho — Sauce Demo

URL base: https://www.saucedemo.com/

## Objetivo

Planejar testes de carrinho que adicionem dois produtos e removam um deles, validando a atualização do contador e do conteúdo do carrinho.

## Premissas

- O teste inicia com a página de login limpa e sem sessão autenticada.
- Os dados válidos para login são:
  - Usuário: `standard_user`
  - Senha: `secret_sauce`
- O inventário deve carregar após login com a lista de produtos.
- Cada cenário deve ser independente e pode ser executado isoladamente.

## Critérios gerais

- O botão de `ADD TO CART` deve adicionar itens ao carrinho.
- O badge do carrinho deve refletir o número correto de itens adicionados.
- Remover um item deve atualizar o badge e deixar apenas os produtos restantes.
- O carrinho deve exibir apenas os produtos que foram adicionados e não removidos.

---

## Cenário 1: Adicionar 2 produtos ao carrinho

### Passos
1. Abrir o navegador e acessar `https://www.saucedemo.com/`.
2. Preencher o campo `Username` com `standard_user`.
3. Preencher o campo `Password` com `secret_sauce`.
4. Clicar em `LOGIN`.
5. Verificar que a página de inventário (`inventory.html`) carregou.
6. Identificar dois produtos disponíveis na lista de inventário.
7. Clicar em `ADD TO CART` para o primeiro produto.
8. Clicar em `ADD TO CART` para o segundo produto.

### Resultado esperado
- O badge do carrinho exibe `2` itens.
- Ambos os produtos selecionados aparecem no carrinho quando o ícone do carrinho é acessado.
- O botão de cada produto adicionado muda para `REMOVE` após a inclusão.

---

## Cenário 2: Remover 1 produto do carrinho após adicionar 2 produtos

### Passos
1. Abrir o navegador e acessar `https://www.saucedemo.com/`.
2. Preencher o campo `Username` com `standard_user`.
3. Preencher o campo `Password` com `secret_sauce`.
4. Clicar em `LOGIN`.
5. Verificar que a página de inventário (`inventory.html`) carregou.
6. Clicar em `ADD TO CART` para dois produtos diferentes.
7. Acessar o carrinho clicando no ícone de carrinho.
8. Verificar que o carrinho exibe 2 itens.
9. Remover um dos produtos clicando em `REMOVE` no carrinho.

### Resultado esperado
- O badge do carrinho exibe `1` item.
- O carrinho exibe apenas o produto restante.
- O produto removido não deve mais aparecer na lista do carrinho.
- O botão `ADD TO CART` para o produto removido deve estar disponível novamente na página de inventário, se retornado a essa página.

---

## Observações adicionais

- Os testes devem validar elementos visuais importantes como o badge do carrinho, o rótulo do botão e o conteúdo da lista de produtos.
- Para maior robustez, o cenário pode ser adaptado usando identificadores específicos de produto em vez de posições fixas na lista.
