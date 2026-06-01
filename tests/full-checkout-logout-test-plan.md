# Plano de Testes Completo — Sauce Demo

URL base: https://www.saucedemo.com/

## Objetivo

Planejar o fluxo completo de compra no Sauce Demo, começando pelo login, adicionando um produto ao carrinho, percorrendo o checkout, finalizando o pedido, retornando à página de inventário e encerrando com logout.

## Premissas

- O teste inicia com a página de login limpa e sem sessão autenticada.
- Os dados válidos para login são:
  - Usuário: `standard_user`
  - Senha: `secret_sauce`
- O fluxo de checkout está disponível para o usuário autenticado.
- Cada cenário deve ser independente e pode ser executado isoladamente.

## Critérios gerais

- O login deve levar à página de inventário (`inventory.html`).
- O carrinho deve ser atualizado ao adicionar produtos.
- O checkout deve percorrer as etapas de informações do cliente e confirmação do pedido.
- Após a finalização, o usuário deve poder retornar à página de inventário.
- O logout deve encerrar a sessão e retornar o usuário à tela de login.

---

## Cenário 1: Fluxo completo de compra e logout

### Passos
1. Abrir o navegador e acessar `https://www.saucedemo.com/`.
2. Preencher o campo `Username` com `standard_user`.
3. Preencher o campo `Password` com `secret_sauce`.
4. Clicar em `LOGIN`.
5. Verificar que a página de inventário (`inventory.html`) carregou.
6. Selecionar um produto disponível na lista.
7. Clicar em `ADD TO CART` no produto selecionado.
8. Verificar que o badge do carrinho exibe `1`.
9. Clicar no ícone do carrinho para acessar `cart.html`.
10. Verificar que o produto está listado no carrinho.
11. Clicar em `CHECKOUT`.
12. Na página de informações de checkout (`checkout-step-one.html`), preencher:
    - `First Name`: `Teste`
    - `Last Name`: `Usuario`
    - `Postal Code`: `12345`
13. Clicar em `CONTINUE`.
14. Verificar que a página de revisão do pedido (`checkout-step-two.html`) exibe o produto e o resumo do pedido.
15. Clicar em `FINISH`.
16. Verificar que a página de confirmação (`checkout-complete.html`) exibe a mensagem de sucesso e agradecimento.
17. Clicar em `BACK HOME`.
18. Verificar que a página de inventário (`inventory.html`) foi recarregada.
19. Clicar no botão de menu lateral (`hamburger menu`).
20. Clicar em `Logout`.

### Resultado esperado
- O usuário entra com sucesso e chega ao inventário.
- O produto é adicionado ao carrinho e exibido corretamente.
- O checkout conclui com sucesso e exibe a confirmação do pedido.
- O retorno para a página de inventário funciona corretamente.
- O logout encerra a sessão e retorna à página de login.

---

## Cenário 2: Falha no checkout por dados do cliente incompletos

### Passos
1. Abrir `https://www.saucedemo.com/`.
2. Fazer login com `standard_user` e `secret_sauce`.
3. Adicionar um produto ao carrinho.
4. Ir para o carrinho e clicar em `CHECKOUT`.
5. Deixar um ou mais campos obrigatórios (`First Name`, `Last Name` ou `Postal Code`) vazios.
6. Clicar em `CONTINUE`.

### Resultado esperado
- O sistema exibe mensagem de erro informando que os campos obrigatórios devem ser preenchidos.
- O usuário permanece na página `checkout-step-one.html`.

---

## Cenário 3: Navegação pós-pedido sem logout

### Passos
1. Abrir `https://www.saucedemo.com/`.
2. Fazer login com `standard_user` e `secret_sauce`.
3. Adicionar um produto ao carrinho.
4. Realizar o checkout completo até a confirmação do pedido.
5. Clicar em `BACK HOME`.
6. Verificar que o inventário está visível.
7. Não fazer logout e verificar se o usuário ainda está autenticado ao acessar o carrinho novamente.

### Resultado esperado
- O usuário retorna ao inventário sem perder a sessão.
- O carrinho pode ser acessado novamente sem exigir novo login.

---

## Observações adicionais

- Os testes devem usar seletores confiáveis e verificar URLs conforme as etapas.
- Para melhorar a robustez, use um produto específico pelo identificador ou pelo primeiro item visível.
- Verifique a atualização do badge do carrinho após cada ação de adicionar ou remover itens.
- Garanta que a página de logout esteja acessível apenas após o usuário estar autenticado.
