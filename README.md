# Repgen — Site institucional

Site institucional multipágina para a **Repgen**, assessoria em seguros, resseguros e benefícios. Construído com HTML, CSS e JavaScript puros (vanilla), sem frameworks, bibliotecas externas ou dependências de build.

## Estrutura do projeto

```
.
├── index.html                                  # Home
├── sobre.html                                   # Sobre / história / missão-visão-valores
├── linhas-negocio.html                          # Portfólio de produtos por linha de negócio
├── servicos.html                                # Hub de Serviços e Consultoria
├── servico-gestao-riscos-patrimoniais.html      # Detalhe de serviço (template reutilizado)
├── servico-gestao-riscos-logisticos.html        # Detalhe de serviço
├── servico-gestao-medica.html                   # Detalhe de serviço
├── servico-gestao-saude.html                    # Detalhe de serviço
├── seguradoras.html                              # Seguradoras parceiras
├── seja-parceiro.html                            # Página de conversão para corretores
├── quem-e-quem.html                              # Diretório de equipe (busca + filtro + modal)
├── faq.html                                      # Perguntas frequentes (accordion)
├── blog.html                                     # Listagem de artigos
├── blog-post.html                                # Template de artigo (com o artigo #1 completo)
├── contato.html                                  # Formulário de contato
├── styles.css                                    # Todos os estilos do site (design tokens + componentes)
├── script.js                                     # Todo o comportamento JS do site
├── assets/
│   ├── logo-repgen.png                           # Logotipo oficial completo, usado como og:image
│   ├── logo-header.png                           # Recorte do logo para cabeçalho/rodapé
│   ├── favicon.png                                # Ícone da marca (favicon)
│   └── img/                                      # Imagens de banner (serviços) e thumbnails (blog)
└── README.md
```

Todas as páginas compartilham o mesmo cabeçalho, menu de navegação em tela cheia, rodapé e botão flutuante do WhatsApp — copiados de forma consistente em cada arquivo `.html`, já que o site não usa nenhum sistema de templates/includes em tempo de execução (por ser HTML puro).

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

Você também pode abrir `index.html` diretamente no navegador, mas servir via HTTP é recomendado — alguns recursos (como o `fetch` de outras páginas ao navegar) funcionam melhor sob `http://` do que sob `file://`.

## Substituindo os dados de placeholder

Alguns dados são fictícios e precisam ser substituídos antes de publicar o site em produção. Todos estão sinalizados com comentários `<!-- SUBSTITUIR: ... -->` no HTML, para facilitar a busca.

### 1. Número do WhatsApp

O botão flutuante, o CTA do menu ("Fale Conosco") e os demais botões que apontam para o WhatsApp usam o link placeholder `https://wa.me/55XXXXXXXXXXX`. Para atualizar:

```bash
grep -rl "55XXXXXXXXXXX" *.html
```

Substitua `55XXXXXXXXXXX` pelo número real no formato internacional, sem espaços ou símbolos (ex.: `5511999998888`), em todos os arquivos listados. Recomenda-se um find-and-replace global no editor de código.

### 2. Dados da equipe (`quem-e-quem.html`)

O diretório de pessoas usa dados de exemplo. **Priscilla Daltro** (Desenvolvimento Comercial) e **Max Lima** (Diretoria) têm nome/cargo/departamento reais informados no briefing original; os demais nomes, cargos, telefones e e-mails são fictícios. Para atualizar:

- Edite o array de pessoas diretamente no HTML de `quem-e-quem.html` (cada card `.person-card` tem atributos `data-name-display`, `data-title-display`, `data-dept-display`, `data-phone` e `data-email`).
- O telefone deve estar no formato `(DD) 90000-0000` — o JavaScript remove a formatação automaticamente para montar o link do WhatsApp.
- Departamentos adicionais podem ser criados duplicando um bloco `.dept-group` e adicionando o filtro correspondente em `.filter-pills`.

### 3. Logos das seguradoras (`seguradoras.html`)

A grade de seguradoras parceiras hoje exibe apenas o nome da empresa em texto estilizado (`.insurer-card`). Para usar logos reais:

1. Adicione os arquivos de logo em `assets/img/seguradoras/`.
2. Substitua o texto dentro de cada `.insurer-card` por uma tag `<img>` com o `alt` correspondente ao nome da seguradora.
3. Ajuste o CSS de `.insurer-card img` em `styles.css` se for necessário controlar altura/proporção dos logos.

### 4. Imagens de banner (serviços e blog)

As imagens em `assets/img/` (banners de serviço e thumbnails do blog) são placeholders abstratos gerados para preencher o layout. Substitua pelos arquivos finais mantendo os mesmos nomes (ou atualize os caminhos `src` nos arquivos HTML correspondentes) — banners de serviço funcionam bem em proporção larga (ex. 1600×700) e thumbnails do blog em formato mais quadrado (ex. 900×600).

### 5. Artigos do blog

Apenas o artigo "5 formas de aumentar a rentabilidade da sua corretora" tem conteúdo completo, em `blog-post.html`. Os outros 5 cards em `blog.html` apontam para esse mesmo arquivo como demonstração do template. Para publicar um novo artigo, duplique `blog-post.html` com um novo nome de arquivo (ex. `blog-post-2.html`), atualize o conteúdo e aponte o card correspondente em `blog.html` para o novo arquivo.

### 6. Formulário de contato

O formulário em `contato.html` hoje só valida os campos no navegador e exibe uma mensagem de confirmação — não envia e-mails de verdade. Para receber as mensagens, integre com um serviço como Formspree, EmailJS, Netlify Forms, ou um backend próprio, e ajuste o envio em `script.js` (bloco do `contactForm`).

## Personalização geral

- **Cores**: a paleta está centralizada em variáveis CSS no topo de `styles.css` (`:root`) — tons de laranja (`--color-orange-*`), azul-marinho (`--color-navy-*`) e verde do WhatsApp (`--color-green-*`).
- **Ícones**: todos os ícones do site são SVGs inline (sem dependência de bibliotecas de ícones externas), definidos junto ao conteúdo de cada página.
- **Navegação**: os itens do menu principal (tela cheia) e do rodapé estão duplicados em cada arquivo HTML dentro das tags `<nav class="full-nav">` e `<nav class="footer-nav">`. Ao adicionar uma nova página, lembre-se de incluir o link nessas duas navegações em todos os arquivos.

## Deploy no GitHub Pages

1. Garanta que todos os arquivos (`*.html`, `styles.css`, `script.js`, `assets/`) estejam commitados na branch que você vai publicar (ex.: `main`).
2. No GitHub, acesse **Settings → Pages** do repositório.
3. Em **Build and deployment**, selecione:
   - **Source**: `Deploy from a branch`
   - **Branch**: escolha a branch (ex.: `main`) e a pasta `/ (root)`
4. Clique em **Save**. O GitHub Pages vai publicar o site em alguns minutos em uma URL no formato:
   ```
   https://<seu-usuario-ou-organizacao>.github.io/<nome-do-repositorio>/
   ```
5. Após o primeiro deploy, qualquer novo `git push` para a branch configurada atualiza o site automaticamente.

Como o site usa apenas links relativos entre as páginas, ele funciona tanto na raiz de um domínio quanto em um subdiretório (como o padrão `usuario.github.io/repositorio/` do GitHub Pages) sem nenhuma configuração adicional.

### Domínio customizado (opcional)

Se quiser usar um domínio próprio (ex.: `www.repgen.com.br`):

1. Em **Settings → Pages → Custom domain**, informe o domínio desejado.
2. Configure os registros DNS do seu provedor de domínio apontando para o GitHub Pages (registro `CNAME` para `<usuario>.github.io`, ou registros `A` para os IPs do GitHub Pages).
3. Marque a opção **Enforce HTTPS** assim que o certificado for emitido.

## Acessibilidade e SEO

- HTML semântico (`header`, `nav`, `main`, `section`, `footer`, `article`) em todas as páginas.
- Hierarquia de headings correta: um único `<h1>` por página, seções em `<h2>`.
- Meta tags de SEO (`title`, `description`) únicas por página e tags Open Graph em português.
- Texto alternativo em todas as imagens.
- Menu de navegação acessível por teclado (fecha com `Esc`), cards do diretório de equipe navegáveis via teclado (`Tab` + `Enter`/`Espaço`).
- Animações de entrada (`fade-up`) respeitam `prefers-reduced-motion`.
