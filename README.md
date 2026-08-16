# Repgen — Site institucional

Site de uma página (one-page) para a **Repgen**, empresa de assessoria em seguros, resseguros e benefícios. Construído com HTML, CSS e JavaScript puros, sem frameworks ou dependências de build.

## Estrutura do projeto

```
.
├── index.html          # Estrutura e conteúdo da página
├── styles.css           # Estilos (paleta, layout, responsividade)
├── script.js             # Menu mobile, contador animado e formulário
├── assets/
│   ├── logo-repgen.png    # Logotipo oficial completo (ícone + nome + tagline), usado como og:image
│   ├── logo-header.png    # Recorte compacto do logo (ícone + nome), usado no cabeçalho e rodapé
│   └── favicon.png        # Ícone da marca (apenas o símbolo), usado como favicon
└── README.md
```

## Como visualizar localmente

Como o site não usa build tools nem dependências, basta servir os arquivos estáticos. Algumas opções:

**Opção 1 — Python (já vem instalado na maioria dos sistemas):**

```bash
python3 -m http.server 8000
```

Depois acesse [http://localhost:8000](http://localhost:8000) no navegador.

**Opção 2 — Node.js (com `npx serve`):**

```bash
npx serve .
```

**Opção 3 — Abrir diretamente**

Você também pode simplesmente abrir o arquivo `index.html` no navegador (duplo clique ou `open index.html` / `start index.html`), mas servir via HTTP é recomendado para evitar eventuais restrições do navegador com `file://`.

## Personalização

- **Textos e dados de contato**: edite diretamente em `index.html` (endereço, telefone, e-mail, horário de atendimento).
- **Números de destaque** (seção de confiança): os valores ficam no atributo `data-target` de cada `<span class="stat-number">` em `index.html` — atualize com os números reais da empresa.
- **Cores**: a paleta está centralizada em variáveis CSS no topo de `styles.css` (`:root`), facilitando ajustes de tons de laranja (cor da marca) e do neutro escuro (charcoal).
- **Logo**: os arquivos em `assets/` já usam a arte oficial da Repgen (fundo transparente, recortada do logotipo enviado). Se receber uma versão vetorial (SVG/AI) da marca, é recomendável substituir os PNGs por ela para melhor nitidez em telas de alta resolução.
- **Imagem de compartilhamento (Open Graph)**: a tag `og:image` aponta para `assets/logo-repgen.png`. Para melhor compatibilidade com redes sociais (Facebook, LinkedIn, WhatsApp), o ideal é uma imagem de **1200×630px**; se quiser uma arte dedicada (com fundo sólido em vez de transparente), crie um novo arquivo e atualize a tag em `index.html`.
- **Formulário de contato**: atualmente o formulário só valida os campos e exibe uma mensagem de confirmação no navegador (não envia e-mails). Para receber as mensagens de verdade, integre com um serviço como Formspree, EmailJS, Netlify Forms, ou um backend próprio, e ajuste o `fetch`/envio em `script.js`.

## Deploy no GitHub Pages

1. Garanta que os arquivos (`index.html`, `styles.css`, `script.js`, `assets/`) estejam commitados na branch que você vai publicar (ex.: `main`).
2. No GitHub, acesse **Settings → Pages** do repositório.
3. Em **Build and deployment**, selecione:
   - **Source**: `Deploy from a branch`
   - **Branch**: escolha a branch (ex.: `main`) e a pasta `/ (root)`
4. Clique em **Save**. O GitHub Pages vai publicar o site em alguns minutos em uma URL no formato:
   ```
   https://<seu-usuario-ou-organizacao>.github.io/<nome-do-repositorio>/
   ```
5. Após o primeiro deploy, qualquer novo `git push` para a branch configurada atualiza o site automaticamente.

### Domínio customizado (opcional)

Se quiser usar um domínio próprio (ex.: `www.repgen.com.br`):

1. Em **Settings → Pages → Custom domain**, informe o domínio desejado.
2. Configure os registros DNS do seu provedor de domínio apontando para o GitHub Pages (registro `CNAME` para `<usuario>.github.io`, ou registros `A` para os IPs do GitHub Pages).
3. Marque a opção **Enforce HTTPS** assim que o certificado for emitido.

## Acessibilidade e SEO

- HTML semântico (`header`, `nav`, `main`, `section`, `footer`) e hierarquia de headings correta (um único `<h1>`, seções em `<h2>`).
- Meta tags de SEO (`title`, `description`) e Open Graph em português.
- Textos alternativos em todas as imagens.
- Navegação por teclado e estados de foco visíveis nos links e campos do formulário.
