# Plano de Testes de Login/Logout — Sauce Demo

URL base: https://www.saucedemo.com/

## Objetivo

Planejar apenas testes relacionados ao fluxo de login/logout e validações da página de login. O foco é o caminho feliz e cenários negativos de autenticação.

## Premissas

- O teste inicia sempre com página limpa e sem sessão autenticada.
- O ambiente deve estar acessível em https://www.saucedemo.com/.
- Os dados válidos são:
  - Usuário: `standard_user`
  - Senha: `secret_sauce`
- O usuário bloqueado é `locked_out_user`.

## Critérios gerais

- Cada cenário deve ser independente e executável isoladamente.
- Após logout com sucesso, a aplicação deve retornar para a página de login.
- Mensagens de erro devem ser exibidas claramente no painel de erro acima do formulário.

---

## Cenário 1: Login e logout com usuário válido (caminho feliz)

### Passos
1. Abrir o navegador e acessar `https://www.saucedemo.com/`.
2. Preencher o campo `Username` com `standard_user`.
3. Preencher o campo `Password` com `secret_sauce`.
4. Clicar em `LOGIN`.
5. Verificar que a URL mudou para `inventory.html`.
6. Verificar que o título da página exibido é `Products`.
7. Abrir o menu lateral clicando no botão de menu (`hamburger menu`).
8. Clicar em `Logout` no menu lateral.

### Resultado esperado
- O usuário entra com sucesso e é redirecionado para a página de inventário.
- Ao efetuar logout, o sistema retorna para a página de login (`https://www.saucedemo.com/`).
- O botão de login está visível novamente.

---

## Cenário 2: Erro de usuário obrigatório

### Passos
1. Abrir `https://www.saucedemo.com/`.
2. Deixar o campo `Username` vazio.
3. Preencher `Password` com `secret_sauce`.
4. Clicar em `LOGIN`.

### Resultado esperado
- Exibir a mensagem de erro: `Epic sadface: Username is required`.
- Permanecer na página de login.

---

## Cenário 3: Erro de senha obrigatória

### Passos
1. Abrir `https://www.saucedemo.com/`.
2. Preencher `Username` com `standard_user`.
3. Deixar o campo `Password` vazio.
4. Clicar em `LOGIN`.

### Resultado esperado
- Exibir a mensagem de erro: `Epic sadface: Password is required`.
- Permanecer na página de login.

---

## Cenário 4: Credenciais inválidas

### Passos
1. Abrir `https://www.saucedemo.com/`.
2. Preencher `Username` com `invalid_user`.
3. Preencher `Password` com `wrong_password`.
4. Clicar em `LOGIN`.

### Resultado esperado
- Exibir a mensagem de erro: `Epic sadface: Username and password do not match any user in this service`.
- Continuar na página de login.

---

## Cenário 5: Usuário bloqueado

### Passos
1. Abrir `https://www.saucedemo.com/`.
2. Preencher `Username` com `locked_out_user`.
3. Preencher `Password` com `secret_sauce`.
4. Clicar em `LOGIN`.

### Resultado esperado
- Exibir a mensagem de erro: `Epic sadface: Sorry, this user has been locked out.`.
- Permanecer na página de login.

---

## Cenário 6: Validação dos elementos da página de login

### Passos
1. Abrir `https://www.saucedemo.com/`.
2. Verificar que o campo `Username` está visível.
3. Verificar que o campo `Password` está visível.
4. Verificar que o botão `LOGIN` está visível.
5. Verificar que o logo e o painel do formulário estão visíveis.

### Resultado esperado
- Todos os elementos essenciais da página de login estão presentes e visíveis.
- A página está pronta para aceitar credenciais.
