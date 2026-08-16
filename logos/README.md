# Logos das seguradoras

Esta pasta deve conter os arquivos de logo reais de cada seguradora exibida em `seguradoras.html`. Nenhum arquivo está incluído neste momento — os cards da página exibem o nome da empresa como texto até que o arquivo correspondente seja adicionado aqui.

Adicione um arquivo `.png` (fundo transparente recomendado) para cada nome abaixo, exatamente com este nome de arquivo:

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

## Como funciona o fallback

Cada card em `seguradoras.html` tenta carregar `logos/<arquivo>.png`. Se o arquivo não existir (erro 404), o JavaScript em `script.js` esconde a imagem quebrada e mostra o nome da empresa em texto no lugar — não é necessário editar HTML depois de adicionar os arquivos, basta colocá-los nesta pasta com o nome exato listado acima.

Recomendações para os arquivos:
- Formato PNG com fundo transparente (ou branco, já que os cards têm fundo branco).
- Altura de exibição de até 48px — prefira imagens com pelo menos 96–150px de altura para boa nitidez em telas de alta resolução.
