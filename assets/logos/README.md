# Logos das seguradoras

Esta pasta deve conter os arquivos de logo reais de cada seguradora exibida em `seguradoras.html`. **Nenhum arquivo está incluído no momento** — os cards da página exibem o nome da empresa em texto até que o arquivo correspondente seja adicionado aqui (fallback automático, veja abaixo).

> Tentei baixar os logos oficiais automaticamente, mas o acesso à internet externa está bloqueado neste ambiente (política de rede do sandbox), então nenhum arquivo pôde ser obtido. A estrutura abaixo já está pronta para receber os arquivos reais assim que você os adicionar.

Adicione um arquivo `.png` (fundo transparente recomendado) para cada nome abaixo, exatamente com este nome de arquivo, dentro de `assets/logos/`:

- axa.png — AXA
- chubb.png — Chubb
- aig.png — AIG
- hdi-global.png — HDI Global
- prudential.png — Prudential
- essor-asas.png — Essor/ASAS
- mapfre.png — Mapfre
- alba-seguradora.png — Alba Seguradora
- aruana-seguradora.png — Aruana Seguradora
- fator.png — Fator
- berkley.png — Berkley
- akad-seguros.png — Akad Seguros
- now-seguros.png — Now Seguros
- bvix-seguradora.png — BVIX Seguradora
- suhai.png — Suhai
- junto-seguros.png — Junto Seguros
- ezze.png — Ezze
- avla.png — Avla
- amil.png — Amil
- icatu.png — Icatu
- allseg.png — Allseg
- darwin-seguros.png — Darwin Seguros
- mitsui-sumitomo.png — Mitsui Sumitomo
- sulamerica.png — SulAmérica
- mag-seguros.png — MAG Seguros
- servdonto.png — Servdonto
- odonto-system.png — Odonto System
- omint.png — Omint

## Usando SVG em vez de PNG

Se preferir usar arquivos `.svg` (geralmente mais nítidos e leves para logos), basta:
1. Salvar o arquivo aqui com a extensão `.svg` (ex.: `axa.svg`).
2. Abrir `seguradoras.html` e trocar a extensão no atributo `src` do `<img>` correspondente (de `assets/logos/axa.png` para `assets/logos/axa.svg`).

## Como funciona o fallback

Cada card em `seguradoras.html` tenta carregar `assets/logos/<arquivo>.png`. Se o arquivo não existir (erro 404) — ou falhar por qualquer outro motivo — o JavaScript em `script.js` esconde a imagem quebrada e mostra o nome da empresa em texto no lugar. Não é necessário editar HTML depois de adicionar os arquivos: basta colocá-los nesta pasta com o nome exato listado acima que o logo passa a aparecer automaticamente no lugar do texto.

Recomendações para os arquivos:
- Formato PNG com fundo transparente (ou branco, já que os cards têm fundo branco) ou SVG.
- O CSS já normaliza o tamanho de exibição para até 48px de altura (largura proporcional, máximo 85% da largura do card) — então qualquer resolução de origem funciona, mas prefira imagens com pelo menos 96–150px de altura (ou vetor/SVG) para boa nitidez em telas de alta resolução.
