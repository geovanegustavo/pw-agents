# pw-agents
Playwright com agentes de IA

## 1. Instalação do Playwright:
- Fonte: https://playwright.dev/docs/intro#installing-playwright
```bash
npm init playwright@latest
```

## 2. Instalação dos agentes do Playwright:
- Fonte: https://playwright.dev/docs/test-agents
```bash
npx playwright init-agents --loop=vscode
```

## 2. Executar todos os testes
```bash
npm test
```

## 3. Executar em modo headed (com browser visível)
```bash
npm run test:headed
```

## 4. Abrir a UI interativa do Playwright
```bash
npm run test:ui
```

## 5. Executar em modo debug
```bash
npm run test:debug
```

## 6. Visualizar relatório HTML
```bash
npm run test:report
```

---
